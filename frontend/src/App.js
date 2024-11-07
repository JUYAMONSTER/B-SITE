// App.js
import React, { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import NavBarMobile from './components/NavBarMobile';
import './App.css';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="App">
      {isMobile ? <NavBarMobile /> : <NavBar />}
      <header className="hero">
        <h2>[The Branches]</h2>
        <p>Branches는 순천대학교 인공지능공학부 전공 동아리로...</p>
        <button className="start-button">Start</button>
      </header>
    </div>
  );
}

export default App;
