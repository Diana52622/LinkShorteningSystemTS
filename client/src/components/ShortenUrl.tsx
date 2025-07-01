import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUrl, setError } from '../redux/reducer';
import { shortenUrlRequest } from './api';
import type { RootState } from '../redux/store';

const ShortenUrl: React.FC = () => {
  const dispatch = useDispatch();
  const { originalUrl, shortUrl, error } = useSelector((state: RootState) => state.url);

  const handleShorten = async () => {
    if (!originalUrl) {
      dispatch(setError('Пожалуйста, введите URL.'));
      return;
    }

    try {
      const data = await shortenUrlRequest(originalUrl);
      dispatch(setUrl({ 
        originalUrl, 
        shortUrl: data.shortUrl,
        statsUrl: data.statsUrl 
      }));
      dispatch(setError(''));
    } catch (error) {
      const err = error as Error;
      dispatch(setError(err.message));
    }
  };

  const PUBLIC_URL = import.meta.env.PUBLIC_URL || 'http://localhost:5173';
  const shortCode = shortUrl?.split('/').pop();

  return (
    <div className="App">
      <h1>Сокращение ссылок</h1>
      <input
        type="text"
        value={originalUrl}
        onChange={(e) => dispatch(setUrl({ 
          originalUrl: e.target.value, 
          shortUrl: '',
          statsUrl: '' 
        }))}
        placeholder="Введите URL"
      />
      <button onClick={handleShorten}>Сократить</button>
      
      {error && <div style={{ color: 'red' }}>{error}</div>}
      
      {shortUrl && (
        <div>
          <p>Сокращенная ссылка: <a href={shortUrl}>{shortUrl}</a></p>
          <p>Статистика: <a href={`${PUBLIC_URL}/stats/${shortCode}`}>
            {PUBLIC_URL}/stats/{shortCode}
          </a></p>
        </div>
      )}
    </div>
  );
};

export default ShortenUrl;