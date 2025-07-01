import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShortenUrl from './components/ShortenUrl';
import StatsView from './components/StatsView';
import { store } from './redux/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<ShortenUrl />} />
          <Route path="/stats/:shortUrl" element={<StatsView />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;