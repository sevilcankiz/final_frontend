import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const Nav = ({ isLoggedIn, user, onLogout }) => {
  return (
    <div className="container">
      <nav className="sidebar">
        <ul>
          <li><a href="/">Home</a></li>
          {!isLoggedIn ? (
            <>
              <li><a href="/register">Registrierung</a></li>
              <li><a href="/login">Login/Anmelden</a></li>
            </>
          ) : (
            <>
              <li><a href="/products">Produkte</a></li>
              <li>
                <span>Willkommen, {user?.first_name}!</span>
              </li>
              <li>
                <button onClick={onLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
