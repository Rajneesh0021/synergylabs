import React from 'react';
import UserList from '../components/UserList';

const HomePage: React.FC = () => {
  return (
    <div className="container">
      <h1 className='appName'>User Management</h1>
      <UserList />
    </div>
  );
};

export default HomePage;
