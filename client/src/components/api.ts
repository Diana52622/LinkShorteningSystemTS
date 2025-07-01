import axios, { AxiosError } from 'axios';
import type { ErrorResponse, ShortenResponse } from '../types/types';

export const shortenUrlRequest = async (originalUrl: string): Promise<ShortenResponse> => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const instance = axios.create({
    baseURL: API_URL, 
    headers: {
      'Content-Type': 'application/json',
    }
  });

  try {
    const response = await instance.post<ShortenResponse>('/api/shorten', { originalUrl });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response) {
      throw new Error(axiosError.response.data?.error || 'Ошибка при сокращении ссылки');
    } else if (axiosError.request) {
      throw new Error('Сервер не отвечает. Проверьте подключение к интернету');
    }
    throw new Error('Ошибка при отправке запроса');
  }
};