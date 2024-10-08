import React from 'react';
import { useDispatch } from 'react-redux';
import './Home.css';
import { logoutUser } from '../services/operations/authApi';

function Home() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="company-name">AbilitaEdge</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <main className="home-content">
        <h2 className="home-text">Home Page</h2>
      </main>
    </div>
  );
}

export default Home;
