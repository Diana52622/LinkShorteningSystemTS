import { logClick } from '../models/clicks';
import { getIpInfo } from './geo';
import { parseUserAgent } from './userAgent';

export const trackClick = async (linkId: string, userAgent: string, ip: string): Promise<void> => {
  const { region, city } = await getIpInfo(ip);
  const { browser, os } = parseUserAgent(userAgent);

  await logClick(linkId, {
    ip,
    region: `${region},${city}`,
    browser: `${browser.name} ${browser.version}`,
    os
  });
};