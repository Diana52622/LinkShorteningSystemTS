export interface StatItem {
  id: string;
  created_at: string;
  user_ip: string;
  region: string;
  browser: string;
  os: string;
}

export interface UrlState {
  originalUrl: string;
  shortUrl: string;
  statsUrl: string;
  error: string;
  stats: StatItem[];
  statsLoading: boolean;
  statsError: string | null;
}

export interface UrlPayload {
  originalUrl?: string;
  shortUrl?: string;
  statsUrl?: string;
}

export interface ShortenResponse {
  shortUrl: string;
  statsUrl: string;
  error?: string;
}

export interface ErrorResponse {
  error?: string;
}
