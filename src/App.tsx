import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserDetailPage from './pages/UserDetailPage';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Home Page Route */}
        <Route path="/" element={<HomePage />} />
        
        {/* User Detail Page Route */}
        <Route path="/users/:id" element={<UserDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
