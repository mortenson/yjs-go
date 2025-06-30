// Original file: ../proto/yjs.proto


export interface SyncResponse {
  'docMessage'?: (Buffer | Uint8Array | string);
  'awarenessMessage'?: (Buffer | Uint8Array | string);
}

export interface SyncResponse__Output {
  'docMessage': (Buffer);
  'awarenessMessage': (Buffer);
}
