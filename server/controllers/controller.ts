import { Request, Response } from 'express';
import { createShortLink } from '../services/link';
import { getOriginalUrl } from '../models/link';
import { trackClick } from '../services/click';
import { getClientIp } from '../services/geo';
import {ShortenResponse} from '../types/types'

const parseShortenInput = (body: any): string => {
  if (!body?.originalUrl) throw new Error("URL обязателен");
  return body.originalUrl;
};

const buildShortenResponse = (shortCode: string): ShortenResponse => ({
  shortUrl: `${process.env.API_URL}/api/${shortCode}`,
  statsUrl: `${process.env.PUBLIC_URL}/stats/${shortCode}`
});

const parseRedirectInput = (params: any, headers: any) => ({
  shortUrl: params.shortUrl,
  userAgent: headers['user-agent'] || '',
});

export const shortenLink = async (req: Request, res: Response): Promise<void> => {
  try {
    const originalUrl = parseShortenInput(req.body);
    const shortCode = await createShortLink(originalUrl);
    res.json(buildShortenResponse(shortCode));
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const redirectToOriginalUrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const { shortUrl, userAgent } = parseRedirectInput(req.params, req.headers);
    const linkData = await getOriginalUrl(shortUrl);
    
    if (!linkData) {
      res.status(404).send('Ссылка не найдена');
      return;
    }

    const ip = await getClientIp();
    await trackClick(linkData.id, userAgent, ip);
    res.redirect(linkData.original_url);
  } catch (error: any) {
    console.error('Ошибка:', error);
    res.status(500).send(error.message);
  }
};