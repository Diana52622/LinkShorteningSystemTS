import supabase from '../config/supabase';
import { DB } from './constants/db';
import {UserInfo, ClickData} from '../types/types'

export const getClickStats = async (linkId: string): Promise<ClickData[]> => {
  const { data, error } = await supabase
    .from(DB.TABLES.CLICKS)
    .select('*')
    .eq(DB.FIELDS.LINK_ID, linkId)
    .order(DB.FIELDS.CREATED_AT);

  if (error) throw error;
  return data as ClickData[];
};

export const logClick = async (linkId: string, userInfo: UserInfo): Promise<void> => {
  const { error } = await supabase
    .from(DB.TABLES.CLICKS)
    .insert([{
      [DB.FIELDS.LINK_ID]: linkId,
      [DB.FIELDS.USER_IP]: userInfo.ip,
      [DB.FIELDS.REGION]: userInfo.region,
      [DB.FIELDS.BROWSER]: userInfo.browser,
      [DB.FIELDS.OS]: userInfo.os,
      [DB.FIELDS.CREATED_AT]: new Date(),
    }]);

  if (error) throw error;
};