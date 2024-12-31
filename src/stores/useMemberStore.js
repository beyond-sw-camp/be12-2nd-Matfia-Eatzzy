import { defineStore } from "pinia";
import axios from "axios";

export const useMemberStore = defineStore("member", {
  state: () => ({}),
  persist: {
    storage: sessionStorage,
  },
  actions: {
    async login(userData) {
      try {
        // POST 요청: 로그인 처리
        const response = await axios.post("/api/login", userData, {
          withCredentials: true, // 쿠키 전달 허용
        });

        if (response.status === 200) {
          const userTypeValue = response.data.userType;

          const cookieValue = document.cookie
            .split("; ")
            .find((row) => row.startsWith("LOGIN="))
            ?.split("=")[1];

          if (cookieValue) {
            sessionStorage.setItem("LOGIN", cookieValue);
            sessionStorage.setItem("UserType", userTypeValue);
            alert("로그인 되었습니다.");
            window.location.href = "/";
          }
        }
        return response;
      } catch (error) {
        // 서버 오류 처리
        if (error.response && error.response.status === 401) {
          alert("아이디나 비밀번호가 맞지 않습니다.");
        } else {
          alert(error);
        }
      }
    },

    logout() {
      sessionStorage.removeItem("LOGIN");
      sessionStorage.removeItem("UserType");
      document.cookie =
        "LOGIN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      alert("로그아웃 되었습니다.");
      window.location.href = "/";
    },
  },
});
