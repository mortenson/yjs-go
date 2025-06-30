// Original file: ../proto/plugin.proto


// Original file: ../proto/plugin.proto

export const _plugin_StdioData_Channel = {
  INVALID: 'INVALID',
  STDOUT: 'STDOUT',
  STDERR: 'STDERR',
} as const;

export type _plugin_StdioData_Channel =
  | 'INVALID'
  | 0
  | 'STDOUT'
  | 1
  | 'STDERR'
  | 2

export type _plugin_StdioData_Channel__Output = typeof _plugin_StdioData_Channel[keyof typeof _plugin_StdioData_Channel]

export interface StdioData {
  'channel'?: (_plugin_StdioData_Channel);
  'data'?: (Buffer | Uint8Array | string);
}

export interface StdioData__Output {
  'channel': (_plugin_StdioData_Channel__Output);
  'data': (Buffer);
}
