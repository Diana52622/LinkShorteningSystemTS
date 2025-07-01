export const DB = {
  TABLES: {
    LINKS: 'links',
    CLICKS: 'clicks'
  },
  FIELDS: {
    ID: 'id',
    CREATED_AT: 'created_at',
    ORIGINAL_URL: 'original_url',
    SHORT_URL: 'short_url',
    LINK_ID: 'link_id',
    USER_IP: 'user_ip',
    REGION: 'region',
    BROWSER: 'browser',
    OS: 'os'
  }
} as const;