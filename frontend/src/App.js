import React, { useState } from 'react';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <h1 className="logo">The Branches</h1>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <li><a href="#main">Main</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#project">Project</a></li>
        </ul>
      </nav>
      <header className="hero">
        <h2>[The Branches]</h2>
        <p>Branches는 순천대학교 인공지능공학부 전공 동아리로...</p>
        <button className="start-button">Start</button>
      </header>
    </div>
  );
}

export default App;
