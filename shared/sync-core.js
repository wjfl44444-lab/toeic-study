// Pure rules shared by the browser controller and its regression checks.
export const MAX_PAYLOAD_BYTES = 800 * 1024;

export class SyncConflictError extends Error {
  constructor(expectedRevision, actualRevision) {
    super("Account record changed on another device.");
    this.name = "SyncConflictError";
    this.code = "sync/conflict";
    this.expectedRevision = expectedRevision;
    this.actualRevision = actualRevision;
  }
}

export function utf8ByteLength(value) {
  if (typeof value !== "string") return Infinity;
  if (typeof TextEncoder !== "undefined") return new TextEncoder().encode(value).length;
  let bytes = 0;
  for (let i = 0; i < value.length; i += 1) {
    const code = value.charCodeAt(i);
    if (code < 0x80) bytes += 1;
    else if (code < 0x800) bytes += 2;
    else if (code >= 0xd800 && code <= 0xdbff && i + 1 < value.length && value.charCodeAt(i + 1) >= 0xdc00 && value.charCodeAt(i + 1) <= 0xdfff) {
      bytes += 4;
      i += 1;
    } else bytes += 3;
  }
  return bytes;
}

export function fitsCloudPayload(payload) {
  return typeof payload === "string" && utf8ByteLength(payload) <= MAX_PAYLOAD_BYTES;
}

export function nextRevision(expectedRevision, actualRevision) {
  if (!Number.isSafeInteger(expectedRevision) || expectedRevision < 0 || !Number.isSafeInteger(actualRevision) || actualRevision < 0 || actualRevision >= Number.MAX_SAFE_INTEGER) {
    throw new TypeError("Invalid snapshot revision.");
  }
  if (expectedRevision !== actualRevision) throw new SyncConflictError(expectedRevision, actualRevision);
  return actualRevision + 1;
}

export function parseCloudRecord(data, validatePayload = () => true) {
  if (data == null) return { revision: 0, payload: null };
  const keys = Object.keys(data);
  if (data.schemaVersion !== 1 || !Number.isSafeInteger(data.revision) || data.revision < 1 || !fitsCloudPayload(data.payload) || keys.some((key) => !["schemaVersion", "revision", "updatedAt", "payload"].includes(key)) || !keys.includes("updatedAt") || !validatePayload(data.payload)) {
    const error = new Error("Invalid account snapshot.");
    error.code = "sync/invalid-record";
    throw error;
  }
  return { revision: data.revision, payload: data.payload };
}

// A draft must keep the revision it was based on until an explicit decision.
export function remoteDecision({ baseRevision, pending, localSemantic, remoteRevision, remoteSemantic }) {
  if (remoteRevision > 0 && baseRevision !== null && remoteRevision < baseRevision) return "ignore";
  if (remoteRevision > 0 && localSemantic === remoteSemantic) return "acknowledge";
  if (pending) return baseRevision === remoteRevision ? "upload" : "conflict";
  if (remoteRevision === 0 && baseRevision > 0) return "conflict";
  return "load";
}
