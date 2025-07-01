import { generateShortCode } from '../services/generator';
import { createLink } from '../models/link';

export const createShortLink = async (originalUrl: string): Promise<string> => {
  const shortCode = generateShortCode();
  await createLink(originalUrl, shortCode);
  return shortCode;
};