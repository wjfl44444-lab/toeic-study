// Read-only summary of what this site keeps in this browser's storage.
// Used by storage-check.html and by the 기록 관리 panel (a home-screen app
// has its own storage, so the report has to be visible inside the app too).
// Only localStorage.length/key/getItem are used: nothing is changed.

const APPS = { vocabulary: "단어장", quiz: "문제집", "power-voca": "표현·구조", "power-grammar": "표현·구조(문법)" };
const KINDS = {
  account: "계정 기록 (이 기기 사본)",
  recovery: "보관된 기기 기록",
  "legacy-before-first-login": "로그인 전 원본 기록",
};

// Browsers keep text as 2 bytes per character.
const kb = (chars) => `${Math.round((chars * 2) / 1024).toLocaleString("ko-KR")} KB`;

function describe(key) {
  const sync = key.match(/^toeic-sync:v1:([^:]+):(.*)$/);
  if (sync) {
    const app = APPS[sync[1]] || sync[1];
    const rest = sync[2];
    const backup = rest.match(/^backup:[^:]+:([^:]+):/);
    if (backup) return { group: app, label: `자동 백업 · ${backup[1]}` };
    const kind = Object.keys(KINDS).find((name) => rest === name || rest.startsWith(`${name}:`));
    return { group: app, label: kind ? KINDS[kind] : rest.replace(/:[A-Za-z0-9%_-]{12,}/g, ":…") };
  }
  if (key === "toeic-pocket-state-v1") return { group: "단어장", label: "로그인 안 했을 때 기록" };
  if (key.startsWith("toeic-random-cards")) return { group: "문제집", label: "로그인 안 했을 때 기록" };
  if (key.startsWith("power-voca-full")) return { group: "표현·구조", label: key.includes("backup") ? "자동 백업" : "로그인 안 했을 때 기록" };
  if (key.startsWith("toeic-power-grammar") || key.startsWith("toeic-grammar")) return { group: "표현·구조(문법)", label: key.includes("backup") ? "자동 백업" : "기록" };
  if (key.startsWith("toeic-unified")) return { group: "표현·구조", label: "합치기 전 백업" };
  return { group: "기타", label: key.length > 40 ? `${key.slice(0, 40)}…` : key };
}

export function readStorageReport() {
  const rows = [];
  let total = 0;
  for (let i = 0; i < window.localStorage.length; i += 1) {
    const key = window.localStorage.key(i);
    const value = window.localStorage.getItem(key) || "";
    const size = key.length + value.length;
    total += size;
    let detail = "";
    if (/^toeic-sync:v1:[^:]+:account:/.test(key)) {
      try {
        const saved = JSON.parse(value);
        detail = saved?.version === 3 && Array.isArray(saved.texts)
          ? `안에 기록 ${saved.texts.length}벌 (${saved.texts.map((text) => kb(String(text).length)).join(", ")})`
          : `예전 방식 저장 (버전 ${saved?.version})`;
      } catch { detail = "읽을 수 없는 형식"; }
    }
    rows.push({ ...describe(key), size, detail });
  }
  const groups = new Map();
  for (const row of rows) {
    if (!groups.has(row.group)) groups.set(row.group, { name: row.group, size: 0, rows: [] });
    const group = groups.get(row.group);
    group.size += row.size;
    group.rows.push(row);
  }
  const sorted = [...groups.values()].sort((a, b) => b.size - a.size);
  sorted.forEach((group) => group.rows.sort((a, b) => b.size - a.size));
  return { total, count: rows.length, groups: sorted };
}

function el(tag, style, text) {
  const node = document.createElement(tag);
  if (style) node.style.cssText = style;
  if (text !== undefined) node.textContent = text;
  return node;
}

export function renderStorageReport(container) {
  container.replaceChildren();
  let report;
  try { report = readStorageReport(); }
  catch {
    container.append(el("p", "", "이 브라우저에서는 저장 공간을 읽을 수 없어요."));
    return;
  }
  const head = el("p", "margin:8px 0 4px;font-size:15px;");
  head.append("전체 사용량 ", el("strong", "font-size:20px;", kb(report.total)));
  container.append(head, el("p", "margin:0 0 8px;font-size:12px;opacity:.75;",
    `항목 ${report.count}개 · 보통 폰 브라우저는 약 5,000 KB까지 저장할 수 있어요. 보기만 하고 아무것도 바꾸지 않아요.`));
  for (const group of report.groups) {
    container.append(el("p", "margin:14px 0 4px;font-weight:700;font-size:15px;", `${group.name} · ${kb(group.size)}`));
    for (const row of group.rows) {
      const line = el("div", "display:flex;justify-content:space-between;gap:10px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.12);font-size:14px;");
      const left = el("span", "flex:1;min-width:0;overflow-wrap:anywhere;", row.label);
      if (row.detail) left.append(el("small", "display:block;font-size:12px;opacity:.7;", row.detail));
      const bar = el("span", "display:block;height:5px;margin-top:4px;border-radius:3px;background:rgba(255,255,255,.12);overflow:hidden;");
      bar.append(el("span", `display:block;height:100%;width:${Math.max(1, Math.round((row.size / Math.max(report.total, 1)) * 100))}%;background:#9fd8bf;`));
      left.append(bar);
      line.append(left, el("span", "white-space:nowrap;font-weight:700;font-variant-numeric:tabular-nums;", kb(row.size)));
      container.append(line);
    }
  }
}
