import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './App.css';
import './NavBar.css'; // 스타일을 별도로 관리하기 위해 NavBar.css로 분리

function NavBar() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  // 화면 크기를 체크하여 모바일 여부 판단
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // 초기 로딩 시 크기 체크
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <nav id="nav">
      <div className="nav-container">
        {isMobile ? (
          <button className="menu-icon" onClick={toggleDropdown}>
            ☰
          </button>
        ) : null}
        <ul className={dropdownVisible || !isMobile ? "nav-links show" : "nav-links"}>
          <li><Link to="/" style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Main</Link></li>
          <li>
            <Link to="/about-us" style={{ fontSize: '1.2em', fontWeight: 'bold' }}>About Us</Link>
          </li>
          <li>
            <Link to="/project" style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Project</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
