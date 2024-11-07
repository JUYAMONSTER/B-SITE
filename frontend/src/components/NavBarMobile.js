// NavBarMobile.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBarMobile.css';

function NavBarMobile() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="mobile-nav">
      <button className="menu-icon" onClick={toggleMenu}>
        ☰
      </button>
      {/* isOpen 상태에 따라 클래스가 추가되도록 수정 */}
      <ul className={`mobile-nav-links ${isOpen ? 'show' : ''}`}>
        <li><Link to="/" onClick={toggleMenu}>Main</Link></li>
        <li><Link to="/about-us" onClick={toggleMenu}>About Us</Link></li>
        <li><Link to="/project" onClick={toggleMenu}>Project</Link></li>
      </ul>
    </nav>
  );
}

export default NavBarMobile;
