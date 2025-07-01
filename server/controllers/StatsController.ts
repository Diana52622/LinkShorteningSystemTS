import { Request, Response } from 'express';
import { getOriginalUrl } from '../models/link';
import { getClickStats } from '../models/clicks';
import {LinkData} from '../types/types'

export const getFullClickStats = async (req: Request, res: Response): Promise<void> => {
  const { shortUrl } = req.params;

  try {
    const linkData: LinkData | null = await getOriginalUrl(shortUrl);
    if (!linkData) {
      res.status(404).json({ error: 'Ссылка не найдена' });
      return;
    }

    const clickStats = await getClickStats(linkData.id);
    res.json(clickStats);
    
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};