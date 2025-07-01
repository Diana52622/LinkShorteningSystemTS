import axios from 'axios';
import {GeoInfo} from '../types/types'

export const getIpInfo = async (ip: string): Promise<GeoInfo> => {
  try {
    const [regionResponse, cityResponse] = await Promise.all([
      axios.get(`https://ipapi.co/${ip}/region/`),
      axios.get(`https://ipapi.co/${ip}/city/`)
    ]);
    
    return {
      region: regionResponse.data,
      city: cityResponse.data
    };
  } catch (error) {
    console.error('Ошибка получения геоданных:', error);
    return {
      region: 'Не определен',
      city: 'Не определен'
    };
  }
};

export const getClientIp = async (): Promise<string> => {
  const response = await axios.get('https://api.ipify.org?format=json');
  return response.data.ip;
};