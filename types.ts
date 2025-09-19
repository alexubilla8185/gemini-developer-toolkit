
export enum Tool {
  Component = 'component',
  Regex = 'regex',
  Favorites = 'favorites',
}

export interface RegexResponse {
  pattern: string;
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
