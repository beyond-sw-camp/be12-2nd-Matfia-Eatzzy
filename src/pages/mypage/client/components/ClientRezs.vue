<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useLoveStore } from "../../../../stores/useLoveStore";

//const loveStore = useLoveStore();
const rez = ref([]);

const handleCancelClick = async (idx) => {
  // JavaScript 기본 confirm 대화상자 표시
  const isConfirmed = confirm("정말로 예약을 취소하시겠습니까?");
  if (isConfirmed) {
    alert("예약이 취소되었습니다."); // 확인 시 동작
    try {
      // await axios.get(`/api/app/likes/mypage/deletestore/${idx}`);
      // window.location.reload(); // 삭제 후 데이터 새로 불러오기
    } catch (error) {
      console.error("삭제 실패:", error);
    }
    // 실제 취소 로직을 여기에 추가 가능
    // 예: API 호출 후 목록 갱신
  }
};

const fetchRez = async () => {
  try {
    const response = await axios.get("/api/app/resv/mypage");
    console.log(response);
    rez.value = response.data.result; // 받아온 데이터를 ref에 저장
    console.log("ㅇㅇ:", rez.value);
  } catch (error) {
    console.error("데이터 가져오기 실패:", error);
  }
};

onMounted(() => {
  //loveStore.getloveStores();
  fetchRez();
});
</script>

<template>
  <div class="storeRez_item" v-for="(review, index) in rez" :key="index">
    <a class="storeRez_left" href="/stores/1">
      <div class="store_name">{{ review.store_name }}</div>
      <div class="rez_category store_address">{{ review.store_address }}</div>
      <img :src="review.store_image" alt="Review Image" class="review_image" />
    </a>
    <div class="storeRez_right notYet_right">
      <div>
        <div class="rez_date">{{ review.reservation }}</div>
        <div class="rez_time">{{ review.rez_time }}</div>
        <div class="rez_count">2명</div>
      </div>
      <button class="rez_button" @click="handleCancelClick(review.id)">예약 취소하기</button>
    </div>
  </div>
</template>

<style scoped>
.storeRez_item {
  display: flex;
  border-bottom: 0.0625rem solid #ddd;
  padding: 20px;
}
.storeRez_left {
  flex: 7;
}
.store_name {
  font-weight: bold;
  font-size: 1.25rem;
  margin-bottom: 0.3125rem;
}
.rez_category {
  font-size: 1.125rem;
}
.store_address {
  font-size: 0.9375rem;
  color: rgba(var(--gray50), 1);
}
.review_image {
  width: 6.25rem;
  height: 6.25rem;
  max-width: 6.25rem;
  max-height: 6.25rem;
  margin-top: 0.625rem;
  margin-bottom: 0.625rem;
  border-radius: 0.25rem;
}
.storeRez_right {
  flex: 3;
  border-left: 0.0625rem solid #cecece;
  padding-left: 1.25rem;
  padding-top: 1.25rem;
}
.notYet_right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
.rez_date {
  font-size: 1rem;
  font-weight: 500;
}
.rez_time {
  font-size: 0.9rem;
  margin-bottom: 0.9375rem;
}
.rez_button {
  padding: 0.625rem;
  background-color: #ff7400;
  border-radius: 0.25rem;
  color: white;
  cursor: pointer;
}
</style>
