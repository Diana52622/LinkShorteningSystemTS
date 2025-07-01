import {BrowserInfo, UserAgentInfo} from '../types/types'

export const parseUserAgent = (userAgent: string): UserAgentInfo => {
  const browser: BrowserInfo = { name: 'Неизвестно', version: '' };

  if (userAgent.includes('Chrome')) {
    browser.name = 'Chrome';
    const match = userAgent.match(/Chrome\/(\d+\.\d+)/);
    if (match) browser.version = match[1];
  } 
  else if (userAgent.includes('Firefox')) {
    browser.name = 'Firefox';
    const match = userAgent.match(/Firefox\/(\d+\.\d+)/);
    if (match) browser.version = match[1];
  }
  else if (userAgent.includes('Safari')) {
    browser.name = 'Safari';
    const match = userAgent.match(/Version\/(\d+\.\d+)/);
    if (match) browser.version = match[1];
  }

  const os = userAgent.includes('Windows') ? 'Windows' :
    userAgent.includes('Mac OS') ? 'Mac OS' :
    userAgent.includes('Linux') ? 'Linux' :
    userAgent.includes('Android') ? 'Android' :
    userAgent.includes('iOS') ? 'iOS' : 'Неизвестно';

  return { browser, os };
};