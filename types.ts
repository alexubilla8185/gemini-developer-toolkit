
export enum Tool {
  Component = 'component',
  Regex = 'regex',
  Json = 'json',
  Cron = 'cron',
  Favorites = 'favorites',
}

export type Framework = 'react' | 'vue' | 'svelte' | 'html';

export interface RegexResponse {
  pattern: string;
  explanation: string;
}

export interface CronResponse {
  cronString: string;
  explanation: string;
}

export interface FavoriteComponent {
  id: string;
  prompt: string;
  code: string;
  createdAt: string;
}

export interface FavoriteRegex {
  id: string;
  prompt: string;
  pattern: string;
  explanation: string;
  createdAt: string;
}