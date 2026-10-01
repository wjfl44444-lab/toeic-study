import { fitsCloudPayload, nextRevision, parseCloudRecord, remoteDecision } from "./sync-core.js?v=20261001-sync2";

const SDK_URL = "https://www.gstatic.com/firebasejs/12.19.0/";
let sdkPromise;

async function loadFirebase() {
  if (!sdkPromise) {
    sdkPromise = (async () => {
      const { firebaseConfig } = await import("./firebase-config.js?v=20261001-sync1");
      if (!firebaseConfig?.apiKey || !firebaseConfig?.projectId || !firebaseConfig?.authDomain) {
        const error = new Error("Firebase configuration is unavailable.");
        error.code = "sync/not-configured";
        throw error;
      }
      const [appSdk, authSdk, storeSdk] = await Promise.all([
        import(SDK_URL + "firebase-app.js"),
        import(SDK_URL + "firebase-auth.js"),
        import(SDK_URL + "firebase-firestore.js"),
      ]);
      const app = appSdk.getApps().find((item) => item.name === "toeic-study") || appSdk.initializeApp(firebaseConfig, "toeic-study");
      return { authSdk, storeSdk, auth: authSdk.getAuth(app), db: storeSdk.getFirestore(app) };
    })().catch((error) => { sdkPromise = null; throw error; });
  }
  return sdkPromise;
}

function errorText(error) {
  const code = String(error?.code || "");
  if (code.includes("popup-blocked")) return "로그인 창이 차단됐어요. 팝업을 허용하고 다시 눌러 주세요.";
  if (code.includes("popup-closed") || code.includes("cancelled-popup")) return "로그인이 취소됐어요. 기기 기록은 그대로 보관됩니다.";
  if (code.includes("unauthorized-domain")) return "이 사이트의 Google 로그인이 아직 연결되지 않았어요. 기기 기록은 계속 저장됩니다.";
  if (code.includes("permission-denied")) return "계정 기록에 접근하지 못했어요. 이 기기의 기록은 보관 중입니다.";
  if (code.includes("resource-exhausted")) return "오늘의 무료 동기화 한도에 도달했어요. 기기 기록을 보관하며 나중에 다시 저장할 수 있어요.";
  if (code.includes("invalid-record")) return "계정 기록의 형식을 확인하지 못했어요. 기기 기록을 보관했으며 자동으로 바꾸지 않습니다.";
  if (code.includes("not-configured")) return "기기 저장 사용 중 · 계정 연결 준비 중";
  return "계정에 연결하지 못했어요. 기기 기록을 보관하며 연결되면 다시 시도합니다.";
}

/**
 * Return immediately; local saves are safe while the optional SDK starts.
 * applyPayload must replace state without invoking the application's save path.
 */
export function connectStudySync(options = {}) {
  const appId = ["vocabulary", "quiz"].includes(options.appId) ? options.appId : null;
  const prefix = appId ? `toeic-sync:v1:${appId}:` : null;
  let sdk = null;
  let user = null;
  let account = null;
  let remote = null;
  let epoch = 0;
  let unsubscribeAuth = null;
  let unsubscribeDoc = null;
  let timer = null;
  let inflight = null;
  let disposed = false;
  let applying = false;
  let initializing = false;
  let authBusy = false;
  let authInitialized = false;
  let phase = "starting";
  let message = "계정 연결 확인 중 · 기기 저장 사용 가능";
  let storageFailed = false;
  let guestBackupReady = true;
  let guestBackupRaw = null;
  let accountCacheIssue = null;
  let accountCacheBlocked = false;
  const memoryAccounts = new Map();
  let guestMemoryDirty = false;
  let bar, identity, status, actions, detail, toolsActions;

  const valid = (raw) => {
    try { return typeof raw === "string" && Boolean(options.validatePayload?.(raw)); }
    catch { return false; }
  };
  const semantic = (raw) => {
    if (raw == null) return null;
    try { return options.semanticPayload ? String(options.semanticPayload(raw)) : raw; }
    catch { return raw; }
  };
  const meaningful = (raw) => {
    try { return valid(raw) && (options.hasLocalData ? Boolean(options.hasLocalData(raw)) : true); }
    catch { return true; }
  };
  const uploadAllowed = () => {
    try { return options.canUploadPayload ? Boolean(options.canUploadPayload()) : true; }
    catch { return false; }
  };
  const getRaw = () => {
    try { const raw = options.getPayload?.(); return valid(raw) ? raw : null; }
    catch { return null; }
  };
  const read = (key) => {
    try { return key ? window.localStorage.getItem(key) : null; }
    catch { return null; }
  };
  const write = (key, raw) => {
    try { if (!key) return false; window.localStorage.setItem(key, raw); return true; }
    catch { return false; }
  };
  let guestRaw = read(options.legacyKey);
  if (!valid(guestRaw)) guestRaw = getRaw();
  const initialGuestRaw = guestRaw;

  function setStatus(nextPhase, text) {
    phase = nextPhase;
    message = text;
    if (user && !guestBackupReady) message += " · 로그인 전 원본의 추가 백업을 저장하지 못했어요. 원래 기기 기록은 그대로 보관됩니다.";
    if (storageFailed && !message.includes("공간")) message += " · 기기 저장 공간 부족, 기록 백업 필요";
    render();
  }

  function cacheKey(uid) { return `${prefix}account:${encodeURIComponent(uid)}`; }

  function persistAccount() {
    if (!account || !prefix) return true;
    // Keep an in-memory recovery copy even when browser storage is full.
    memoryAccounts.set(account.uid, { account: { ...account }, issue: accountCacheIssue, blocked: accountCacheBlocked });
    if (accountCacheBlocked) { storageFailed = true; return false; }
    const ok = write(cacheKey(account.uid), JSON.stringify({
      version: 1, payload: account.payload, basePayload: account.basePayload,
      baseRevision: account.baseRevision, linked: account.linked, pending: account.pending,
    }));
    storageFailed = !ok;
    return ok;
  }

  function loadAccount(uid) {
    const live = memoryAccounts.get(uid);
    if (live) {
      accountCacheIssue = live.issue;
      accountCacheBlocked = live.blocked;
      return { ...live.account };
    }
    const original = read(cacheKey(uid));
    if (original === null) return null;
    try {
      const saved = JSON.parse(original);
      if (saved?.version !== 1 || !valid(saved.payload) || typeof saved.linked !== "boolean" || typeof saved.pending !== "boolean" || !(saved.baseRevision === null || Number.isSafeInteger(saved.baseRevision) && saved.baseRevision >= 0) || !(saved.basePayload === null || valid(saved.basePayload)) || saved.linked && (saved.baseRevision === null || (saved.baseRevision === 0) !== (saved.basePayload === null))) throw new Error("Unreadable account cache.");
      const pending = saved.linked ? semantic(saved.payload) !== semantic(saved.basePayload) : saved.pending;
      return { uid, payload: saved.payload, basePayload: saved.basePayload, baseRevision: saved.baseRevision, linked: saved.linked, pending };
    } catch {
      accountCacheIssue = { raw: original, backedUp: backup(original, "unreadable-account-cache", uid) };
      accountCacheBlocked = !accountCacheIssue.backedUp;
      return null;
    }
  }

  function backup(raw, label, uid = user?.uid || "guest") {
    if (typeof raw !== "string" || !prefix) return true;
    const key = `${prefix}backup:${encodeURIComponent(uid)}:${label}:${Date.now()}`;
    return write(key, raw);
  }

  function recoveryKey(uid = user?.uid) { return `${prefix}recovery:${encodeURIComponent(uid)}`; }

  function recoveryRecord() {
    if (!user || !prefix) return null;
    try {
      const saved = JSON.parse(read(recoveryKey()));
      return saved?.version === 1 && valid(saved.payload) ? saved : null;
    } catch { return null; }
  }

  function protectReplacedDraft() {
    if (!ensureRecoveryBackups()) return false;
    if (!account || !valid(account.payload)) return false;
    const previous = recoveryRecord();
    if (previous && semantic(previous.payload) === semantic(account.payload)) return true;
    if (!backup(account.payload, "before-automatic-account-load")) return false;
    // Only displaced local drafts use this slot, never routine clean refreshes.
    return write(recoveryKey(), JSON.stringify({ version: 1, payload: account.payload, savedAt: new Date().toISOString() }));
  }

  function preserveGuest() {
    const original = read(options.legacyKey);
    guestBackupRaw = original;
    const live = getRaw();
    if (valid(live)) guestRaw = live;
    else if (valid(original) && !guestMemoryDirty) guestRaw = original;
    guestMemoryDirty = valid(guestRaw) && semantic(guestRaw) !== semantic(original);
    // Capture the untouched legacy string before any account state is applied.
    if (original !== null && read(`${prefix}legacy-before-first-login`) === null) {
      return write(`${prefix}legacy-before-first-login`, original);
    }
    return true;
  }

  function ensureRecoveryBackups() {
    if (!guestBackupReady && guestBackupRaw !== null) {
      guestBackupReady = write(`${prefix}legacy-before-first-login`, guestBackupRaw);
    }
    if (accountCacheIssue && !accountCacheIssue.backedUp) {
      accountCacheIssue.backedUp = backup(accountCacheIssue.raw, "unreadable-account-cache");
      accountCacheBlocked = !accountCacheIssue.backedUp;
    }
    return guestBackupReady && !accountCacheBlocked;
  }

  function apply(raw) {
    if (!appId || !valid(raw)) return false;
    applying = true;
    try { options.applyPayload?.(raw); return true; }
    catch { setStatus("error", "기록을 불러오지 못했어요. 현재 기록을 백업한 뒤 다시 시도해 주세요."); return false; }
    finally { applying = false; }
  }

  function restoreGuest() {
    const stored = read(options.legacyKey);
    let raw = guestMemoryDirty && valid(guestRaw) ? guestRaw : valid(stored) ? stored : guestRaw;
    if (!valid(raw)) {
      try { raw = options.createEmptyPayload?.() || initialGuestRaw; } catch { raw = initialGuestRaw; }
    }
    if (valid(raw)) { guestRaw = raw; apply(raw); }
  }

  function current(ticket, uid) { return !disposed && epoch === ticket && user?.uid === uid && account?.uid === uid; }

  function stopDocument() {
    clearTimeout(timer);
    timer = null;
    if (unsubscribeDoc) { try { unsubscribeDoc(); } catch { /* Already closed. */ } }
    unsubscribeDoc = null;
    inflight = null;
  }

  function acceptedCloud(record) {
    if (!account || record.payload === null) return false;
    // Persist before applying so an interrupted render cannot lose the snapshot.
    const previous = { ...account };
    account.payload = record.payload;
    account.basePayload = record.payload;
    account.baseRevision = record.revision;
    account.linked = true;
    account.pending = false;
    persistAccount();
    if (!apply(record.payload)) { account = previous; persistAccount(); return false; }
    setStatus("linked", storageFailed ? "계정 기록을 불러왔어요 · 기기 저장 공간 부족, 백업 필요" : "계정 기록 불러옴 · 변경 내용 자동 저장");
    return true;
  }

  function automaticCloud(record) {
    if (!account || record.payload === null) return;
    if (!uploadAllowed()) {
      setStatus("error", "원래 기기 기록을 확인하지 못해 자동 연결을 멈췄어요. 기록 관리에서 원본을 백업하고 복구해 주세요.");
      return;
    }
    const differs = semantic(account.payload) !== semantic(record.payload);
    const displaced = differs && (account.pending || !account.linked && meaningful(account.payload));
    if (!ensureRecoveryBackups() || displaced && !protectReplacedDraft()) {
      setStatus("error", "자동 연결 전 기기 기록을 안전하게 보관하지 못했어요. 기록 관리에서 백업한 뒤 저장 공간을 확보해 주세요.");
      return;
    }
    accountCacheBlocked = false;
    if (acceptedCloud(record) && displaced) setStatus("linked", "최근 계정 기록으로 자동 연결됨 · 이전 기기 기록은 기록 관리에 보관");
  }

  function automaticSeed() {
    if (!account || !remote || remote.revision !== 0) return;
    if (accountCacheIssue || !ensureRecoveryBackups() || !uploadAllowed()) {
      setStatus("error", "원래 기기 기록을 확인하지 못해 자동 연결을 멈췄어요. 기록 관리에서 원본을 백업하고 복구해 주세요.");
      return;
    }
    account.baseRevision = 0;
    account.basePayload = null;
    account.linked = true;
    account.pending = true;
    persistAccount();
    setStatus("linked", "이 기기 기록을 계정에 자동 연결 중…");
    scheduleUpload();
  }

  function receiveRemote(record, ticket, uid) {
    if (!current(ticket, uid)) return;
    // A slower explicit read must never roll back a newer listener result.
    if (remote && record.revision > 0 && record.revision < remote.revision) return;
    remote = record;
    if (inflight && record.revision === inflight.expected + 1 && semantic(record.payload) === inflight.semantic) return;
    // Finish the revision-checked write before applying another device's record.
    // Its result/catch will process the queued remote record without overwriting it.
    if (inflight) return;
    if (!account.linked) {
      if (record.payload !== null) automaticCloud(record);
      else automaticSeed();
      return;
    }
    const decision = remoteDecision({
      baseRevision: account.baseRevision, pending: account.pending,
      localSemantic: semantic(account.payload), remoteRevision: record.revision,
      remoteSemantic: semantic(record.payload),
    });
    if (decision === "ignore") return;
    if (decision === "conflict") {
      clearTimeout(timer);
      if (record.payload !== null) automaticCloud(record);
      else setStatus("error", "이전에 연결된 계정 기록을 찾지 못했어요. 기기 기록은 보관 중이며 기록 관리에서 복구할 수 있어요.");
    } else if (decision === "upload") {
      setStatus("linked", "이 기기 기록 저장됨 · 계정에 저장 대기 중");
      scheduleUpload();
    } else if (decision === "acknowledge") {
      account.baseRevision = record.revision;
      account.basePayload = record.payload;
      account.pending = false;
      persistAccount();
      setStatus("linked", storageFailed ? "계정 저장 확인됨 · 기기 저장 공간 부족, 백업 필요" : "계정 저장 확인됨 · 변경 내용 자동 저장");
    } else if (record.payload !== null) {
      automaticCloud(record);
    } else {
      automaticSeed();
    }
  }

  function parseSnapshot(snapshot) {
    return parseCloudRecord(snapshot.exists() ? snapshot.data() : null, valid);
  }

  function subscribe() {
    if (!sdk || !account || !appId) return;
    if (unsubscribeDoc) { try { unsubscribeDoc(); } catch { /* Already closed. */ } }
    const ticket = epoch, uid = account.uid;
    const ref = sdk.storeSdk.doc(sdk.db, "users", uid, "study", appId);
    unsubscribeDoc = sdk.storeSdk.onSnapshot(ref, { includeMetadataChanges: true }, (snapshot) => {
      if (!current(ticket, uid) || snapshot.metadata.fromCache || snapshot.metadata.hasPendingWrites) return;
      try { receiveRemote(parseSnapshot(snapshot), ticket, uid); }
      catch (error) { if (current(ticket, uid)) setStatus("error", errorText(error)); }
    }, (error) => {
      if (!current(ticket, uid)) return;
      unsubscribeDoc = null;
      setStatus("error", errorText(error));
    });
  }

  function scheduleUpload() {
    clearTimeout(timer);
    timer = null;
    if (!account?.linked || !account.pending || account.baseRevision === null || ["choice", "conflict", "error"].includes(phase)) return;
    if (!uploadAllowed()) { setStatus("error", "원래 기기 기록을 확인하지 못해 계정 저장을 멈췄어요. 기록을 백업하고 복구해 주세요."); return; }
    if (!fitsCloudPayload(account.payload)) { setStatus("linked", "기기 기록 저장됨 · 기록이 커서 계정 저장 불가, JSON 백업을 내려받아 주세요."); return; }
    if (!navigator.onLine) { setStatus("linked", "오프라인 · 기기 기록 저장됨, 연결되면 계정 저장을 다시 시도합니다."); return; }
    timer = setTimeout(() => { timer = null; void upload(); }, 1600);
  }

  async function upload() {
    if (!sdk || !account?.linked || !account.pending || account.baseRevision === null || inflight || ["choice", "conflict", "error"].includes(phase)) return;
    if (!uploadAllowed()) { setStatus("error", "원래 기기 기록을 확인하지 못해 계정 저장을 멈췄어요. 기록을 백업하고 복구해 주세요."); return; }
    if (!fitsCloudPayload(account.payload)) { setStatus("linked", "기기 기록 보관 중 · 기록이 커서 계정 저장 불가, JSON 백업을 내려받아 주세요."); return; }
    if (!navigator.onLine) { scheduleUpload(); return; }
    const ticket = epoch, uid = account.uid;
    const sent = { payload: account.payload, semantic: semantic(account.payload), expected: account.baseRevision };
    const ref = sdk.storeSdk.doc(sdk.db, "users", uid, "study", appId);
    inflight = sent;
    setStatus("saving", "이 기기 기록 저장됨 · 계정에 저장 중…");
    try {
      const result = await sdk.storeSdk.runTransaction(sdk.db, async (transaction) => {
        if (!current(ticket, uid)) throw Object.assign(new Error("Account changed."), { code: "sync/stale" });
        const record = parseSnapshot(await transaction.get(ref));
        if (!current(ticket, uid)) throw Object.assign(new Error("Account changed."), { code: "sync/stale" });
        // This comparison is repeated on every SDK transaction retry.
        const revision = nextRevision(sent.expected, record.revision);
        transaction.set(ref, { schemaVersion: 1, revision, updatedAt: sdk.storeSdk.serverTimestamp(), payload: sent.payload });
        return { revision, payload: sent.payload };
      });
      if (!current(ticket, uid)) return;
      account.baseRevision = result.revision;
      account.basePayload = sent.payload;
      account.pending = semantic(account.payload) !== sent.semantic;
      persistAccount();
      inflight = null;
      // The transaction promise resolves only after the backend commit.
      if (remote && remote.revision > result.revision) receiveRemote(remote, ticket, uid);
      else {
        remote = result;
        setStatus("linked", storageFailed ? "계정 저장 확인됨 · 기기 저장 공간 부족, 백업 필요" : account.pending ? "기기 기록 저장됨 · 추가 변경 내용 저장 대기 중" : "계정 저장 확인됨 · 변경 내용 자동 저장");
        if (account.pending) scheduleUpload();
      }
    } catch (error) {
      if (!current(ticket, uid)) return;
      inflight = null;
      persistAccount();
      if (error?.code === "sync/conflict") {
        setStatus("loading", "다른 기기의 최근 계정 기록에 자동 연결 중…");
        void refreshRemote(false);
      } else setStatus(error?.code?.includes("permission") || error?.code?.includes("invalid-record") ? "error" : "linked", errorText(error));
    }
  }

  async function refreshRemote(restart = true) {
    if (!sdk || !account) return;
    const ticket = epoch, uid = account.uid;
    try {
      const snapshot = await sdk.storeSdk.getDocFromServer(sdk.storeSdk.doc(sdk.db, "users", uid, "study", appId));
      if (!current(ticket, uid)) return;
      receiveRemote(parseSnapshot(snapshot), ticket, uid);
      if (restart && !unsubscribeDoc) subscribe();
    } catch (error) { if (current(ticket, uid)) setStatus("error", errorText(error)); }
  }

  async function chooseCloud() {
    if (!account || !remote?.payload || inflight) return;
    const ticket = epoch, uid = account.uid;
    const revision = remote.revision;
    const selectedLocal = semantic(account.payload);
    if (!window.confirm("계정 기록으로 계속할까요? 현재 기기 기록은 별도 백업으로 보관하고 계정 기록을 불러옵니다.")) return;
    if (!ensureRecoveryBackups()) { setStatus("error", "원래 기기 기록의 안전한 백업을 저장하지 못했어요. 원본 백업을 내려받고 저장 공간을 확보해 주세요."); return; }
    if (!backup(account.payload, "before-account-load")) { setStatus("error", "기기 기록의 안전한 백업을 저장하지 못했어요. JSON 백업을 내려받고 기기 저장 공간을 확보해 주세요."); return; }
    try {
      const snapshot = await sdk.storeSdk.getDocFromServer(sdk.storeSdk.doc(sdk.db, "users", uid, "study", appId));
      if (!current(ticket, uid)) return;
      const latest = parseSnapshot(snapshot);
      if (latest.revision !== revision) { receiveRemote(latest, ticket, uid); setStatus("conflict", "선택하는 동안 계정 기록이 다시 바뀌었어요. 최신 요약을 확인하고 다시 선택해 주세요."); return; }
      if (semantic(account.payload) !== selectedLocal) { setStatus("conflict", "선택하는 동안 이 기기 기록도 바뀌었어요. 최신 기록을 확인하고 다시 선택해 주세요."); return; }
      remote = latest;
      accountCacheIssue = null;
      acceptedCloud(latest);
    } catch (error) { if (current(ticket, uid)) setStatus("error", errorText(error)); }
  }

  function chooseLocal() {
    if (!account || !remote || inflight) return;
    if (!uploadAllowed()) { setStatus("error", "원래 기기 기록을 확인하지 못해 계정에 연결할 수 없어요. 기기 기록을 먼저 복구해 주세요."); return; }
    if (!fitsCloudPayload(account.payload)) { setStatus("choice", "기록이 커서 계정에 저장할 수 없어요. 기기 저장은 유지되며 JSON 백업을 내려받을 수 있어요."); return; }
    const replacing = remote.revision > 0;
    if (!window.confirm(replacing ? "계정 기록을 이 기기의 기록으로 바꿀까요? 두 기록을 기기에 백업합니다. 선택한 계정 기록이 다시 바뀌면 덮어쓰지 않습니다." : "이 기기의 기록을 현재 Google 계정에 연결할까요? 이후 변경 내용이 이 계정에 자동 저장됩니다.")) return;
    if (!ensureRecoveryBackups()) { setStatus("error", "원래 기기 기록의 안전한 백업을 저장하지 못했어요. 원본 백업을 내려받고 저장 공간을 확보해 주세요."); return; }
    if (!backup(account.payload, "before-account-upload") || replacing && !backup(remote.payload, "replaced-account")) { setStatus("error", "기록의 안전한 백업을 저장하지 못했어요. JSON 백업을 내려받고 기기 저장 공간을 확보해 주세요."); return; }
    account.baseRevision = remote.revision;
    account.basePayload = remote.payload;
    account.linked = true;
    account.pending = semantic(account.payload) !== semantic(remote.payload);
    accountCacheIssue = null;
    persistAccount();
    setStatus("linked", "이 기기 기록 저장됨 · 계정에 저장 대기 중");
    void upload();
  }

  async function restoreRecovery() {
    const saved = recoveryRecord();
    if (!account || !saved || inflight) return;
    if (!window.confirm("보관된 기기 기록으로 현재 계정 기록을 바꿀까요? 현재 기록도 별도 백업으로 보관합니다.")) return;
    const ticket = epoch, uid = account.uid, localBefore = semantic(account.payload);
    try {
      const snapshot = await sdk.storeSdk.getDocFromServer(sdk.storeSdk.doc(sdk.db, "users", uid, "study", appId));
      if (!current(ticket, uid)) return;
      if (semantic(account.payload) !== localBefore || inflight) { setStatus("linked", "복구 중 기록이 바뀌었어요. 최신 기록을 확인한 뒤 다시 복구해 주세요."); return; }
      const latest = parseSnapshot(snapshot);
      if (!ensureRecoveryBackups() || !uploadAllowed() || !fitsCloudPayload(saved.payload) || !backup(account.payload, "before-recovery") || latest.payload !== null && !backup(latest.payload, "account-before-recovery")) {
        setStatus("error", "현재 기록을 안전하게 보관하지 못해 복구를 멈췄어요. 기록을 백업하고 저장 공간을 확인해 주세요.");
        return;
      }
      clearTimeout(timer);
      const previous = { ...account };
      account.payload = saved.payload;
      account.baseRevision = latest.revision;
      account.basePayload = latest.payload;
      account.linked = true;
      account.pending = semantic(saved.payload) !== semantic(latest.payload);
      remote = latest;
      persistAccount();
      if (!apply(saved.payload)) { account = previous; persistAccount(); return; }
      setStatus("linked", account.pending ? "보관된 기록 복구됨 · 계정에 자동 저장 중…" : "계정 기록과 같은 보관 기록을 복구했어요 · 변경 내용 자동 저장");
      void upload();
    } catch (error) { if (current(ticket, uid)) setStatus("error", errorText(error)); }
  }

  function saveLocal(raw) {
    try {
      if (disposed || !appId || !valid(raw)) return false;
      if (applying) return true;
      if (user && !account) return false;
      if (!user) {
        // Account snapshots never flow through the legacy guest key.
        const ok = write(options.legacyKey, raw);
        guestRaw = raw;
        guestMemoryDirty = !ok;
        storageFailed = !ok;
        if (!user) setStatus(sdk ? "guest" : phase, ok ? "이 기기에 기록 저장됨 · 로그인하면 계정 기록을 연결할 수 있어요." : "기기 저장 공간이 부족해요. 기록 백업을 내려받아 주세요.");
        return ok;
      }
      const changed = semantic(raw) !== semantic(account.payload);
      if (!changed) return !storageFailed;
      account.payload = raw;
      account.pending = account.linked ? semantic(raw) !== semantic(account.basePayload) : true;
      const ok = persistAccount();
      if (!ok) setStatus(phase, "기기 저장 공간이 부족해요. 화면의 기록은 유지되지만 JSON 백업이 필요합니다.");
      else if (["linked", "saving"].includes(phase)) {
        setStatus("linked", account.pending ? "이 기기 기록 저장됨 · 계정에 저장 대기 중" : "기기 기록 저장됨 · 계정 기록과 같음");
        scheduleUpload();
      } else render();
      return ok;
    } catch { return false; }
  }

  function authChanged(nextUser) {
    if (disposed) return;
    if (authInitialized && user?.uid === nextUser?.uid) return;
    authInitialized = true;
    const previousUser = user;
    ++epoch;
    stopDocument();
    if (!previousUser && nextUser && appId) guestBackupReady = preserveGuest();
    user = nextUser;
    account = null;
    remote = null;
    storageFailed = false;
    accountCacheIssue = null;
    accountCacheBlocked = false;
    if (previousUser && appId) restoreGuest();
    if (!nextUser) { setStatus("guest", "이 기기에 기록 저장 · Google 로그인으로 기기 간 기록 연결"); return; }
    if (!appId) { setStatus("linked", "로그인됨 · 단어장과 문제집에서 기록이 자동으로 연결돼요."); return; }
    account = loadAccount(nextUser.uid) || { uid: nextUser.uid, payload: guestRaw || getRaw(), basePayload: null, baseRevision: null, linked: false, pending: false };
    if (!valid(account.payload)) {
      try { account.payload = options.createEmptyPayload?.(); } catch { /* Handled below. */ }
    }
    if (!valid(account.payload)) { setStatus("error", "기기 기록의 형식을 확인하지 못했어요. 기록을 백업하고 복구한 뒤 다시 연결해 주세요."); return; }
    persistAccount();
    apply(account.payload);
    setStatus("loading", account.pending ? "이 계정의 기기 임시 기록을 복원했어요 · 계정 기록 확인 중…" : "로그인됨 · 계정 기록 확인 중…");
    subscribe();
  }

  function download(raw, label = "record") {
    if (typeof raw !== "string") return;
    const url = URL.createObjectURL(new Blob([raw], { type: "application/json;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `toeic-${appId}-${label}-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function button(label, handler, primary = false, disabled = false, target = actions) {
    const node = document.createElement("button");
    node.type = "button";
    node.textContent = label;
    if (primary) node.className = "study-sync__primary";
    node.disabled = disabled;
    node.addEventListener("click", () => {
      try { Promise.resolve(handler()).catch((error) => setStatus("error", errorText(error))); }
      catch (error) { setStatus("error", errorText(error)); }
    });
    target.append(node);
  }

  function summary(raw) {
    if (raw == null) return "연결된 기록 없음";
    try { return options.summarizePayload?.(raw) || "학습 기록"; }
    catch { return "학습 기록"; }
  }

  function render() {
    if (!bar || disposed) return;
    bar.dataset.state = phase;
    identity.textContent = user ? `${user.displayName || "Google 계정"}${user.email ? ` · ${user.email}` : ""}` : "학습 기록 연결";
    status.textContent = message;
    actions.replaceChildren();
    toolsActions.replaceChildren();
    detail.textContent = "";
    if (!user) {
      button("Google 로그인", async () => {
        if (!sdk || authBusy) return;
        authBusy = true; render();
        try {
          const provider = new sdk.authSdk.GoogleAuthProvider();
          provider.setCustomParameters({ prompt: "select_account" });
          await sdk.authSdk.signInWithPopup(sdk.auth, provider);
        } finally { authBusy = false; render(); }
      }, true, !sdk || authBusy);
      if (!sdk && !initializing) button("연결 다시 시도", initialize);
    } else {
      button("로그아웃", async () => {
        if (authBusy) return;
        authBusy = true; render();
        try { await sdk.authSdk.signOut(sdk.auth); }
        finally { authBusy = false; render(); }
      }, false, authBusy);
    }
    if (appId && user && account) {
      if (phase === "error" || !navigator.onLine) button("다시 연결", () => refreshRemote());
    }
    if (appId) {
      button("기록 백업", () => download(account?.payload || getRaw() || guestRaw), false, false, toolsActions);
      if (user && valid(guestRaw) && meaningful(guestRaw)) button("로그인 전 기기 기록 백업", () => download(guestRaw, "guest"), false, false, toolsActions);
      if (user && guestBackupRaw !== null && (!guestBackupReady || !valid(guestBackupRaw))) button("로그인 전 원본 백업", () => download(guestBackupRaw, "guest-original"), false, false, toolsActions);
      if (user && accountCacheIssue) button("이 계정의 기기 원본 백업", () => download(accountCacheIssue.raw, "account-original"), false, false, toolsActions);
      const saved = recoveryRecord();
      if (saved) {
        button("보관된 기기 기록 백업", () => download(saved.payload, "preserved-device"), false, false, toolsActions);
        button("보관된 기기 기록으로 복구", restoreRecovery, false, Boolean(inflight), toolsActions);
      }
    }
  }

  function mount() {
    if (disposed || bar) return;
    bar = document.createElement("section");
    bar.className = "study-sync";
    bar.setAttribute("aria-label", "Google 계정과 학습 기록 연결");
    const top = document.createElement("div"); top.className = "study-sync__top";
    identity = document.createElement("span"); identity.className = "study-sync__identity";
    status = document.createElement("span"); status.className = "study-sync__status";
    status.setAttribute("role", "status"); status.setAttribute("aria-live", "polite");
    top.append(identity, status);
    actions = document.createElement("div"); actions.className = "study-sync__actions";
    detail = document.createElement("p"); detail.className = "study-sync__detail";
    const tools = document.createElement("details"); tools.className = "study-sync__tools";
    const toolsHeading = document.createElement("summary"); toolsHeading.textContent = "기록 관리";
    toolsActions = document.createElement("div"); toolsActions.className = "study-sync__actions";
    const toolsNote = document.createElement("p"); toolsNote.textContent = "평소에는 로그인만 하면 자동 연결됩니다. 백업과 복구는 필요한 경우에만 사용하세요.";
    tools.append(toolsHeading, toolsActions, toolsNote);
    tools.hidden = !appId;
    const privacy = document.createElement("details"); privacy.className = "study-sync__privacy";
    const heading = document.createElement("summary"); heading.textContent = "기록 저장 안내";
    const explanation = document.createElement("p");
    explanation.textContent = "같은 Google 계정으로 로그인하면 계정 기록을 자동으로 불러오고 변경 내용도 자동 저장합니다. 계정에 기록이 없으면 이 기기 기록을 자동 연결합니다. 서로 다른 기록은 최근 계정 저장본을 사용하고, 바뀌기 전 기기 기록은 기록 관리에서 백업하거나 복구할 수 있습니다. 오프라인 기록은 다른 기기에 즉시 반영되지 않으므로 이동 전 계정 저장 확인을 살펴보세요. 공용 기기에서는 사용 후 로그아웃하세요.";
    privacy.append(heading, explanation);
    bar.append(top, actions, detail, tools, privacy);
    (options.mount || document.body).prepend(bar);
    render();
  }

  async function initialize() {
    if (initializing || disposed || sdk) return;
    initializing = true; render();
    const waiting = setTimeout(() => { if (!sdk && !disposed) setStatus("starting", "계정 연결이 지연되고 있어요 · 기기 저장은 계속 사용할 수 있습니다."); }, 10000);
    try {
      sdk = await loadFirebase();
      if (disposed) return;
      unsubscribeAuth = sdk.authSdk.onAuthStateChanged(sdk.auth, authChanged, (error) => setStatus("error", errorText(error)));
    } catch (error) { if (!disposed) setStatus("error", errorText(error)); }
    finally { clearTimeout(waiting); initializing = false; render(); }
  }

  function reconnected() {
    if (account && sdk) { void refreshRemote(); }
    else render();
  }
  function offline() { if (account?.pending) setStatus(phase, "오프라인 · 기기 기록 보관 중, 연결되면 계정 저장을 다시 시도합니다."); else render(); }
  window.addEventListener("online", reconnected);
  window.addEventListener("offline", offline);
  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount, { once: true });
  void initialize();

  return {
    saveLocal,
    isAccountActive: () => !disposed && Boolean(user),
    destroy() {
      disposed = true; ++epoch; stopDocument();
      if (unsubscribeAuth) unsubscribeAuth();
      window.removeEventListener("online", reconnected);
      window.removeEventListener("offline", offline);
      document.removeEventListener("DOMContentLoaded", mount);
      bar?.remove();
    },
  };
}
