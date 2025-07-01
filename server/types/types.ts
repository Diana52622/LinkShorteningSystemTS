export interface ShortenResponse {
  shortUrl: string;
  statsUrl: string;
}

export interface ClickData {
  link_id: string;
  user_ip: string;
  region: string;
  browser: string;
  os: string;
  created_at: Date;
}

export interface UserInfo {
  ip: string;
  region: string;
  browser: string;
  os: string;
}

export interface LinkData {
  id: string;
  original_url: string;
  short_url?: string;
}

export type SupabaseLinkResponse = {
  id: string;
  original_url: string;
  short_url?: string;
};

export interface GeoInfo {
  region: string;
  city: string;
}

export interface BrowserInfo {
  name: string;
  version: string;
}

export interface UserAgentInfo {
  browser: BrowserInfo;
  os: string;
}