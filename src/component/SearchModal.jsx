import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

// props로 isSearchOpen과 toggleSearch 함수를 받습니다.
const SearchModal = ({ isSearchOpen, onClose }) => {
  if (!isSearchOpen) {
    return null; // isSearchOpen이 false이면 아무것도 렌더링하지 않습니다.
  }

  return (
      <>
        {/* 오버레이: 화면을 어둡게 하고 클릭 방지 */}
        <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose} // 오버레이 클릭 시 검색창 닫기
        />

        {/* 검색창: 오른쪽에서 나타나는 div */}
        <motion.div
            className="search-box"
            initial={{ x: '100%' }} // Starts from outside the right edge of the screen
            animate={{ x: 0 }} // Moves into the screen
            exit={{ x: '100%' }} // Disappears to outside the right edge of the screen
            transition={{ type: 'tween', duration: 0.3 }} // Smooth animation
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '30%',
              height: '100vh',
              backgroundColor: 'white',
              zIndex: 1000,
              padding: '20px',
              boxShadow: '-5px 0 15px rgba(0,0,0,0.2)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <input
                type="text"
                placeholder="Search"
                style={{
                  border: 'none',
                  borderBottom: '1px solid gray',
                  width: '100%',
                  padding: '10px 0',
                  fontSize: '1.2em',
                }}
            />
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <FontAwesomeIcon icon={faTimes} size="lg" /> {/* 닫기 버튼 */}
            </button>
          </div>
          <div>
            <h4>인기 검색어</h4>
            <ul>
              <li>Women's Dresses</li>
              <li>Men's T-shirts</li>
              <li>Men's Outers</li>
            </ul>
          </div>
        </motion.div>
      </>
  );
};

export default SearchModal;