<script>
  export default {
    data() {
      return {
        tokenResult: '',
      };
    },
    mounted() {
      // Kakao SDK 초기화
      const script = document.createElement('script');
      script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js';
      script.integrity = 'sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka';
      script.crossOrigin = 'anonymous';
      script.onload = () => {
        Kakao.init('98e4641859cc03067b49c6ba3660bc36'); // 사용하려는 앱의 JavaScript 키 입력
      };
      document.head.appendChild(script);
    },
    methods: {
      loginWithKakao() {
        Kakao.Auth.authorize({
          redirectUri: 'http://localhost:8080/app/users/kakao/code',
        });
      },      
    },
  };
  </script>

<template>
    <div>
      <a id="kakao-login-btn" href="javascript:void(0)" @click="loginWithKakao">
        <img src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg" width="222"
             alt="카카오 로그인 버튼" />
      </a>
    </div>
  </template>
  
  <style scoped>
  #kakao-login-btn {
    display: inline-block;
    cursor: pointer;
  }
  </style>
  