// NavBarMobile.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBarMobile.css';

function NavBarMobile() {
  const [isOpen, setIsOpen] = useState(false);

  // 메뉴 상태를 토글하는 함수
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    console.log("Menu toggled:", !isOpen); // 상태 변경 확인
  };

  return (
    <nav className="mobile-nav">
      <button className="menu-icon" onClick={toggleMenu}>
        ☰
      </button>
      <ul className={`mobile-nav-links ${isOpen ? 'show' : ''}`}>
        <li><Link to="/" onClick={toggleMenu}>Main</Link></li>
        <li><Link to="/about-us" onClick={toggleMenu}>About Us</Link></li>
        <li><Link to="/project" onClick={toggleMenu}>Project</Link></li>
      </ul>
    </nav>
  );
}

export default NavBarMobile;
