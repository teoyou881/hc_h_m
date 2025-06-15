import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_USER_URL,
  withCredentials: true, // 쿠키 자동 전송
});

// 요청 인터셉터: Content-Type 자동 설정
apiClient.interceptors.request.use(
    (config) => {
      // FormData인 경우 Content-Type을 설정하지 않음 (브라우저가 자동 설정)
      if (config.data instanceof FormData) {
        // multipart/form-data는 브라우저가 boundary를 자동으로 설정해야 함
        delete config.headers['Content-Type'];
      } else {
        // 일반 데이터는 JSON으로 설정
        config.headers['Content-Type'] = 'application/json';
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

// 응답 인터셉터: 에러 처리
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // 인증 실패 시 로그인 페이지로 리다이렉트
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
);

export default apiClient;
