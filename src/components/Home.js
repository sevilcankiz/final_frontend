import React from 'react';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="container">
      <nav className="sidebar">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/register">Registrierung</a></li>
          <li><a href="/products">Produkte</a></li>
        </ul>
      </nav>
      <main className="content">
        <h1>Willkommen bei yourJournal!</h1>
        <p>Entdecken Sie unsere Journals, Notizbücher und Planer.</p>
      </main>
    </div>
  );
};

export default HomePage;
