import supabase from '../config/supabase';
import { DB } from './constants/db';
import {LinkData, SupabaseLinkResponse} from '../types/types'

function isLinkData(data: any): data is SupabaseLinkResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.id === 'string' &&
    typeof data.original_url === 'string'
  );
}

export const createLink = async (originalUrl: string, shortUrl: string): Promise<LinkData> => {
  const { data, error } = await supabase
    .from(DB.TABLES.LINKS)
    .insert({ 
      [DB.FIELDS.ORIGINAL_URL]: originalUrl, 
      [DB.FIELDS.SHORT_URL]: shortUrl 
    })
    .select()
    .single();

  if (error) throw error;
  
  if (!isLinkData(data)) {
    throw new Error('Invalid data structure received from Supabase');
  }

  return data;
};

export const getOriginalUrl = async (shortUrl: string): Promise<LinkData | null> => {
  const { data, error } = await supabase
    .from(DB.TABLES.LINKS)
    .select(`${DB.FIELDS.ID}, ${DB.FIELDS.ORIGINAL_URL}`) 
    .eq(DB.FIELDS.SHORT_URL, shortUrl)
    .single();

  if (error) return null;
  
  if (!data) return null;
  
  if (!isLinkData(data)) {
    throw new Error('Invalid data structure received from Supabase');
  }

  return data;
};