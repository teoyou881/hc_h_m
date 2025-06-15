import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useUserStore = create(
    persist(
        (set, get) => ({
          user: null, // 초기 사용자 정보 (로그아웃 상태)

          login: (userData, jwtToken, userRole) => {
            set({ user: userData, role: userRole });
          },
          logout: () => {
            set({ user: null, role: null });
          },
          // 필요하다면 사용자 정보 업데이트 함수 등 추가
          updateUser: (newUserData) => {
            set((state) => ({ user: { ...state.user, ...newUserData } }));
          },
        }),
        {
          name: 'user-storage', // localStorage에 저장될 키 이름
          storage: createJSONStorage(() => localStorage), // 사용할 저장소 (localStorage 사용)
        }
    )
);