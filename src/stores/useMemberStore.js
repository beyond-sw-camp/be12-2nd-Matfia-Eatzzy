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
          sessionStorage.setItem("LOGIN", userTypeValue);
          alert("로그인 되었습니다.");
          window.location.href = "/";
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

    async loginWithKakao() {
      try {
        // 카카오 로그인 API 호출
        const kakaoToken = await Kakao.Auth.login({
          scope: "profile, account_email", // 필요한 스코프 지정
        });
    
        if (kakaoToken.access_token) {
          // 액세스 토큰을 백엔드로 전송
          const response = await axios.post("/api/app/users/kakao/code", {
            accessToken: kakaoToken.access_token,
          });
    
          if (response.status === 200) {
            const userTypeValue = response.data.userType;
            sessionStorage.setItem("LOGIN", userTypeValue);
            alert("로그인 되었습니다.");
            window.location.href = "/";
          }
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert("아이디나 비밀번호가 맞지 않습니다.");
        } else {
          alert("로그인 중 문제가 발생했습니다. 다시 시도해주세요.");
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

    async signUp(formData) {
      try {
        // POST 요청: 로그인 처리
        const response = await axios.post("/api/app/users/signup", formData, {
          withCredentials: true, // 쿠키 전달 허용
        });

        if (response.status === 200) {
          alert("회원가입 되었습니다.");
          window.location.href = "/login";
        }
        return response;
      } catch (error) {
        // 서버 오류 처리
        if (error.response && error.response.status === 401) {
          alert("회원가입에 실패하였습니다.");
        } else {
          alert(error);
        }
      }
    },

    async getValidate() {
      try {
        const response = await axios.get("/api/app/users/validate", { withCredentials: true });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized access:", error.response.data);
        } else {
          console.error("Error:", error);
        }
      }
    }
  },
});
