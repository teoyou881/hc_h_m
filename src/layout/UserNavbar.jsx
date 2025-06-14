



import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo_black.png';
import { AnimatePresence } from 'framer-motion'; // AnimatePresence는 Navbar에 유지

import SearchModal from '../component/SearchModal.jsx';
import {useNavigate} from 'react-router-dom'; // 새 컴포넌트 import

const UserNavbar = () => {
  const menuList = [
    "WOMEN", "MEN", "JEWELRY", "GIFT", "COLLECTION"
  ];

  const [isSearchOpen, setIsSearchOpen] = useState(false); // 검색창 열림/닫힘 상태

const nav = useNavigate();
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };
  const Login = () => {
    nav('/login');
    console.log('Login');
  }

  return (
      <div>
        <div className={'button-list'}>
          <div className="login-button" onClick={Login}>
          <FontAwesomeIcon icon={faUser} />Login
          </div>
          <button onClick={toggleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <div className="nav-section">
          <img src={logo} alt="logo" />
        </div>
        <div className="menu-area">
          <ul className="menu-list">
            {menuList.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
          </ul>
          <div>

          </div>
        </div>

        <AnimatePresence>
          <SearchModal isSearchOpen={isSearchOpen} onClose={toggleSearch} />
        </AnimatePresence>
      </div>
  );
};

export default UserNavbar;