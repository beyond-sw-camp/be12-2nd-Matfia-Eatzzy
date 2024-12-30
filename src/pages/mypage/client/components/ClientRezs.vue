<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const userId = 1;
const apiUrl = `https://abc5b35f-117e-49a2-9442-364017e60701.mock.pstmn.io/my/reservation/stores/?userId=${userId}`;
const rezs = ref([]);
const fetchRezs = async () => {
  try {
    const response = await axios.get(apiUrl);
    rezs.value = response.data.stores;
  } catch (error) {
    console.error("리뷰 데이터를 가져오는 중 오류 발생:", error);
  }
};
const handleCancelClick = (reviewId) => {
  // JavaScript 기본 confirm 대화상자 표시
  const isConfirmed = confirm("정말로 예약을 취소하시겠습니까?");
  if (isConfirmed) {
    alert("예약이 취소되었습니다."); // 확인 시 동작
    // 실제 취소 로직을 여기에 추가 가능
    // 예: API 호출 후 목록 갱신
  }
};

onMounted(fetchRezs);
</script>

<template>
  <div class="storeRez_item" v-for="(review, index) in rezs" :key="index">
    <a class="storeRez_left" href="/stores/1">
      <div class="store_name">{{ review.store_name }}</div>
      <div class="rez_category store_address">{{ review.store_address }}</div>
      <img src="https://thenaum.cdn-nhncommerce.com/data/goods/15/01/26/1000000463/1000000463_magnify_07.jpg" alt="Review Image" class="review_image" />
    </a>
    <div class="storeRez_right notYet_right">
      <div>
        <div class="rez_date">{{ review.reservation }}</div>
        <div class="rez_time">{{ review.rez_time }}</div>
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
  font-size: 1.25rem;
}
.rez_time {
  font-size: 0.9375rem;
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
