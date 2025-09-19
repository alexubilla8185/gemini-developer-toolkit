
export enum Tool {
  Component = 'component',
  Regex = 'regex',
}

export interface RegexResponse {
  pattern: string;
  explanation: string;
}