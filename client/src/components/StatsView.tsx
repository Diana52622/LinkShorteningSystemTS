import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStats } from '../redux/api';
import type { RootState, AppDispatch } from '../redux/store';
import './StatsView.css';
import type { StatItem } from '../types/types';

const StatsView: React.FC = () => {
  const { shortUrl } = useParams<{ shortUrl: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { stats, statsLoading, statsError, originalUrl } = useSelector((state: RootState) => state.url);

  useEffect(() => {
    if (shortUrl) dispatch(fetchStats(shortUrl));
  }, [dispatch, shortUrl]);

  if (statsLoading) return (
    <div className="stats">
      <div className="stats__message stats__message--loading">Загрузка статистики...</div>
    </div>
  );

  if (statsError) return (
    <div className="stats">
      <div className="stats__message stats__message--error">Ошибка: {statsError}</div>
    </div>
  );

  return (
    <div className="stats">
      <div className="stats__header">
        <div className="stats__controls">
          <Link to="/" state={{ preservedUrl: originalUrl }} className="button">
            ← Вернуться назад
          </Link>
        </div>
        <h2 className="stats__title">Статистика для ссылки: {shortUrl}</h2>
      </div>
      
      {stats.length > 0 ? (
        <div className="stats__content">
          <table className="stats__table">
            <thead className="stats__header">
              <tr className="stats__row">
                <th className="stats__cell stats__cell--header">Дата</th>
                <th className="stats__cell stats__cell--header">IP-адрес</th>
                <th className="stats__cell stats__cell--header">Регион</th>
                <th className="stats__cell stats__cell--header">Браузер</th>
                <th className="stats__cell stats__cell--header">ОС</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((stat: StatItem) => (
                <tr key={stat.id} className="stats__row">
                  <td className="stats__cell">{new Date(stat.created_at).toLocaleString()}</td>
                  <td className="stats__cell">{stat.user_ip}</td>
                  <td className="stats__cell">{stat.region}</td>
                  <td className="stats__cell">{stat.browser}</td>
                  <td className="stats__cell">{stat.os}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="stats__empty-message">Нет данных о переходах</p>
      )}
    </div>
  );
};

export default StatsView;