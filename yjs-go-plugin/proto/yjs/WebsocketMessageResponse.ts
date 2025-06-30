// Original file: ../proto/yjs.proto


export interface WebsocketMessageResponse {
  'message'?: (Buffer | Uint8Array | string);
  '_message'?: "message";
}

export interface WebsocketMessageResponse__Output {
  'message'?: (Buffer);
  '_message'?: "message";
}
