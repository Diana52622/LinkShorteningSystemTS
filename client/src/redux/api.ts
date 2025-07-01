import { createAsyncThunk } from '@reduxjs/toolkit';
import type { StatItem } from '../types/types';

export const fetchStats = createAsyncThunk(
  'url/fetchStats',
  async (shortUrl: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3000/api/stats/${shortUrl}`);
      if (!response.ok) throw new Error('Ошибка сервера');
      return (await response.json()) as StatItem[];
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Неизвестная ошибка');
    }
  }
);