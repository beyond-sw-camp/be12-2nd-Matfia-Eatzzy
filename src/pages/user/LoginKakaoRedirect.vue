<script setup>
import { ref, onMounted } from "vue";
import { useMemberStore } from "../../stores/useMemberStore";
import { useRoute } from "vue-router";

const memberStore = useMemberStore();
const route = useRoute();

const loginData = ref({
  userId: "",
  password: "",
});

// 로그인 함수
const login = async () => {
  try {
    if (loginData.value.userId && loginData.value.password) {
      await memberStore.login(loginData.value);
    } else {
      alert("로그인 데이터가 불완전합니다");
      window.location.href = "/";
    }
  } catch (error) {
    alert("로그인 실패 " + error);
    window.location.href = "/";
  }
};

onMounted(() => {
  const kakaoId = route.params.id;
  if (kakaoId) {
    loginData.value.userId = "kakao" + kakaoId;
    loginData.value.password = "kakao@" + kakaoId;

    login();
  } else {
    alert("kakaoId를 찾을 수 없습니다");
    window.location.href = "/";
  }
});
</script>

<template>
</template>

<style scoped>
</style>
