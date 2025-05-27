import React, { useState } from 'react'; // useState 훅을 임포트합니다.

const Login = () => {
  // 폼 필드의 상태를 관리하기 위한 useState 훅을 사용합니다.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 폼 제출(submit) 이벤트 핸들러
  const handleSubmit = (event) => {
    event.preventDefault(); // 기본 폼 제출 동작(페이지 새로고침)을 막습니다.

    // 여기에 로그인 로직을 구현합니다.
    // 예를 들어, API 호출을 통해 이메일과 비밀번호를 서버로 전송합니다.
    console.log('로그인 시도:', { email, password });
  };

  return (
      <div className="login-page">
        {/* ⭐⭐⭐ form 태그를 추가하고 onSubmit 핸들러를 연결합니다 ⭐⭐⭐ */}
        <form className="login-section" onSubmit={handleSubmit}>
          <div>
            <p>Email address</p>
            <input
                type="text"
                placeholder="Enter email"
                value={email} // 입력 필드 값을 상태와 연결 (controlled component)
                onChange={(e) => setEmail(e.target.value)} // 입력 값 변경 시 상태 업데이트
                required // HTML5 유효성 검사: 필수 필드
            />
          </div>
          <div>
            <p>Password</p>
            <input
                type="password"
                placeholder="Enter password"
                value={password} // 입력 필드 값을 상태와 연결
                onChange={(e) => setPassword(e.target.value)} // 입력 값 변경 시 상태 업데이트
                required // HTML5 유효성 검사: 필수 필드
            />
          </div>
          {/* ⭐⭐⭐ type="submit"으로 설정하여 폼 제출 버튼임을 명시합니다 ⭐⭐⭐ */}
          <button type="submit">Login</button>
        </form>
      </div>
  );
};

export default Login;