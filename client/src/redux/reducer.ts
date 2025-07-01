import { createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchStats, type StatItem } from './api'
import type { UrlState, UrlPayload } from '../types/types';

const loadState = (): Partial<UrlState> | undefined => {
  try {
    const serializedState = localStorage.getItem('urlState');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch {
    return undefined;
  }
};

const initialState: UrlState = {
  originalUrl: '',
  shortUrl: '',
  statsUrl: '',
  error: '',
  stats: [],
  statsLoading: false,
  statsError: null,
  ...loadState()
};

const urlSlice = createSlice({
  name: 'url',
  initialState,
  reducers: {
    setUrl: (state, action: PayloadAction<UrlPayload>) => {
      state.originalUrl = action.payload.originalUrl || '';
      state.shortUrl = action.payload.shortUrl || '';
      state.statsUrl = action.payload.statsUrl || '';
      state.error = '';
      saveState(state);
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      saveState(state);
    },
    resetUrlState: (state) => {
      state.originalUrl = '';
      state.shortUrl = '';
      state.statsUrl = '';
      state.error = '';
      state.stats = [];
      saveState(state);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStats.pending, (state) => {
        state.statsLoading = true;
        state.statsError = null;
      })
      .addCase(fetchStats.fulfilled, (state, action: PayloadAction<StatItem[]>) => {
        state.statsLoading = false;
        state.stats = action.payload;
        saveState(state);
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.statsLoading = false;
        state.statsError = action.payload as string;
        saveState(state);
      });
  }
});

const saveState = (state: UrlState) => {
  try {
    const serializedState = JSON.stringify({
      originalUrl: state.originalUrl,
      shortUrl: state.shortUrl,
      statsUrl: state.statsUrl,
      stats: state.stats
    });
    localStorage.setItem('urlState', serializedState);
  } catch { /* empty */ }
};

export const { setUrl, setError, resetUrlState } = urlSlice.actions;
export default urlSlice.reducer;