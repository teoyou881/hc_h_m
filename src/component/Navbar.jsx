



import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo_black.png';
import { AnimatePresence } from 'framer-motion'; // AnimatePresence는 Navbar에 유지

import SearchModal from './SearchModal'; // 새 컴포넌트 import

const Navbar = () => {
  const menuList = [
    "WOMEN", "MEN", "JEWELRY", "GIFT", "COLLECTION"
  ];

  const [isSearchOpen, setIsSearchOpen] = useState(false); // 검색창 열림/닫힘 상태

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
      <div>
        <div className={'button-list'}>
          <FontAwesomeIcon icon={faUser} />
          <div>로그인</div>
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

export default Navbar;