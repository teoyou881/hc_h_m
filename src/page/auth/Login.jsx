import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../util/api.js'; // 생성한 apiClient 임포트
import { useUserStore } from '../../store/useUserStore.js'; // Zustand UserStore 임포트

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  // Zustand Store의 login 액션 가져오기
  const loginUser = useUserStore((state) => state.login);
  // 현재 로그인 상태 (Zustand에서도 가져올 수 있으나, props로 전달되는 auth도 활용)
  const isAuthenticated = useUserStore((state) => state.user !== null); // Zustand의 user 상태로 로그인 여부 판단

  // handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // 로그인 API 호출
      // 백엔드의 로그인 엔드포인트에 따라 URL과 데이터 구조를 조정하세요.
      const response = await apiClient.post('/login', { // 예시 URL
        email: email,
        password: password,
      });

      // 백엔드에서 응답으로 사용자 정보와 역할(role)을 JSON 본문에 담아준다고 가정
      // JWT 토큰은 HttpOnly 쿠키에 담겨 자동으로 클라이언트에게 전달된다고 가정


      //todo user 정보 받아오기.
      console.log("Login.jsx: 30", response);
      const { user } = response.data; // 백엔드 응답 예시: { user: { id, username, ... }, role: 'ADMIN' }

      // Zustand Store에 사용자 정보 및 역할 저장
      loginUser(user);

      // App.js의 auth 상태도 업데이트 (필요하다면)
      nav('//'); // 로그인 성공 후 홈 페이지로 이동

    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      // 로그인 실패 시 사용자에게 메시지 표시 등의 에러 처리 로직 추가
      alert('로그인 실패: ' + (error.response?.data?.message || '서버 오류'));
    }
  };

  useEffect(() => {
    // 이미 로그인되어 있다면 (Zustand의 user 상태 확인) 바로 홈으로 리다이렉트
    console.log("Login.jsx: 53", isAuthenticated);
    if (isAuthenticated) {
      nav('//');
    }
    console.log('Login component mounted/auth changed, isAuthenticated:', isAuthenticated);
  }, [isAuthenticated, nav]); // isAuthenticated를 의존성으로 추가

  return (
      <div
          className="flex items-center justify-center min-h-screen" // flexbox for centering, full height, light gray background
      >
        <div
            className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md box-border" // white background, generous padding, rounded corners, shadow, max width
        >
          <h2 className="text-center text-3xl font-bold mb-8 text-gray-800">Login</h2> {/* Centered, large bold text, dark gray */}
          <form className="flex flex-col" onSubmit={handleSubmit}> {/* flex column layout for form */}
            <div className="mb-4"> {/* Margin bottom for spacing */}
              <p className="mb-1 text-gray-700 text-sm">Email address</p> {/* Small text, gray color */}
              <input
                  type="text"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base" // full width, padding, border, rounded, focus styles, base font size
              />
            </div>
            <div className="mb-6"> {/* Larger margin bottom for password field */}
              <p className="mb-1 text-gray-700 text-sm">Password</p>
              <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base" // full width, padding, border, rounded, focus styles, base font size
              />
            </div>
            <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200 text-lg cursor-pointer" // blue button, white text, bold, rounded, hover effect, larger font size
            >
              Login
            </button>
          </form>

          <div className="flex justify-between items-center mt-6 text-sm"> {/* Flexbox for links, margin top, small font size */}
            <div className="flex space-x-4"> {/* space-x-4 for horizontal spacing between links */}
              <a href="#" className="text-blue-600 hover:underline">Forgot ID?</a> {/* Blue links, underline on hover */}
              <a href="#" className="text-blue-600 hover:underline">Forgot Password?</a>
            </div>
            <button
                onClick={() => nav('/register')}
                className="text-blue-600 hover:underline px-0 py-0 text-sm" // Blue text, underline on hover, no padding, small font size
            >
              Register
            </button>
          </div>
        </div>
      </div>
  );
};
export default Login;