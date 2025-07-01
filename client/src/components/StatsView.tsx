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
    <div className="stats-container">
      <div className="loading-message">Загрузка статистики...</div>
    </div>
  );

  if (statsError) return (
    <div className="stats-container">
      <div className="error-message">Ошибка: {statsError}</div>
    </div>
  );

  return (
    <div className="stats-container">
      <div className="header-section">
        <div className="back-button-container">
          <Link to="/" state={{ preservedUrl: originalUrl }} className="back-button">
            ← Вернуться назад
          </Link>
        </div>
        <h2 className="stats-title">Статистика для ссылки: {shortUrl}</h2>
      </div>
      
      {stats.length > 0 ? (
        <div className="table-wrapper">
          <table className="stats-table">
            <thead>
              <tr>
                <th>Дата</th>
                <th>IP-адрес</th>
                <th>Регион</th>
                <th>Браузер</th>
                <th>ОС</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((stat: StatItem) => (
                <tr key={stat.id}>
                  <td>{new Date(stat.created_at).toLocaleString()}</td>
                  <td>{stat.user_ip}</td>
                  <td>{stat.region}</td>
                  <td>{stat.browser}</td>
                  <td>{stat.os}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-stats-message">Нет данных о переходах</p>
      )}
    </div>
  );
};

export default StatsView;