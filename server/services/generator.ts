import { v4 as uuidv4 } from 'uuid';
import { Buffer } from 'buffer';

export const generateShortCode = (): string => {
  const uuid = uuidv4();
  const buffer = Buffer.from(uuid.replace(/-/g, ''), 'hex');

  return buffer.toString('base64')
    .replace(/=/g, '')
    .replace(/\//g, '_')
    .replace(/\+/g, '-')
    .substring(0, 8);
};