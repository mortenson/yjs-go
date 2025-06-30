// Original file: ../proto/yjs.proto


export interface WebsocketMessageRequest {
  'docname'?: (string);
  'message'?: (Buffer | Uint8Array | string);
  'origin'?: (string);
}

export interface WebsocketMessageRequest__Output {
  'docname': (string);
  'message': (Buffer);
  'origin': (string);
}
