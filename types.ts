
export enum Tool {
  Component = 'component',
  Regex = 'regex',
  Waitlist = 'waitlist',
}

export interface RegexResponse {
  pattern: string;
  explanation: string;
}