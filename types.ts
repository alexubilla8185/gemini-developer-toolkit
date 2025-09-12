
export enum Tool {
  Component = 'component',
  Regex = 'regex',
  SiteAuditor = 'siteAuditor',
  Waitlist = 'waitlist',
}

export interface RegexResponse {
  pattern: string;
  explanation: string;
}