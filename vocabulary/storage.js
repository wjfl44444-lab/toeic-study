import { STORAGE_KEY, createInitialState, upgradeState } from "./core.js?v=20261001-2";

export const BACKUP_KEY = `${STORAGE_KEY}-backup`;
export const RECOVERY_KEY = `${STORAGE_KEY}-recovery`;

// Storage is injected so quota failures and corrupt data can be checked without a browser.
export function readStoredState(storage) {
  let saved;
  try {
    saved = storage.getItem(STORAGE_KEY);
    if (!saved) {
      const state = createInitialState();
      try { storage.setItem(STORAGE_KEY, JSON.stringify(state)); }
      catch { return { state, notice: "저장 공간을 사용할 수 없어요. 공부를 마치면 JSON 백업을 내려받아 주세요.", blocked: false, error: true }; }
      return { state, notice: "", blocked: false };
    }
    const result = upgradeState(JSON.parse(saved));
    if (!result) throw new Error("저장 데이터 형식을 확인할 수 없습니다.");
    if (result.migrated) {
      try {
        storage.setItem(BACKUP_KEY, saved);
        storage.setItem(STORAGE_KEY, JSON.stringify(result.state));
      } catch {
        return { state: result.state, notice: "업데이트를 저장하지 못했어요. 현재 단어장을 JSON으로 백업해 주세요.", blocked: false, error: true };
      }
    }
    const notice = result.migrated ? `단어장 업데이트 · 새 단어 ${result.addedCount}개 · 중복 ${result.duplicateCount}개 통합` : "";
    return { state: result.state, notice, blocked: false };
  } catch {
    try {
      if (saved) storage.setItem(RECOVERY_KEY, saved);
      const backup = storage.getItem(BACKUP_KEY);
      const recovered = backup && upgradeState(JSON.parse(backup));
      if (recovered) return { state: recovered.state, notice: "직전 백업으로 복구했어요. 원래 데이터도 별도로 보관했습니다.", blocked: false, error: true };
    } catch { /* Do not overwrite unreadable data. */ }
    return { state: createInitialState(), notice: "기존 저장 데이터를 읽지 못해 임시 단어장을 열었어요. 원본을 보존하려고 자동 저장을 멈췄습니다. 백업 파일을 가져와 복구해 주세요.", blocked: true, error: true };
  }
}

export function writeStoredState(storage, state) {
  try { storage.setItem(STORAGE_KEY, JSON.stringify(state)); return true; }
  catch { return false; }
}
