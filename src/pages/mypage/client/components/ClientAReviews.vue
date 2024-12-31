<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const userId = 1;
const apiUrl = `https://abc5b35f-117e-49a2-9442-364017e60701.mock.pstmn.io/my/areview/stores/?userId=${userId}`;
const Areviews = ref([]);
const fetchAReviews = async () => {
  try {
    const response = await axios.get(apiUrl);
    Areviews.value = response.data.stores;
  } catch (error) {
    console.error("리뷰 데이터를 가져오는 중 오류 발생:", error);
  }
};
const handleCancelClick = (likeId) => {
  // JavaScript 기본 confirm 대화상자 표시
  const isConfirmed = confirm("정말로 이 식당의 리뷰를 삭제할까요?");
  if (isConfirmed) {
    alert("삭제되었습니다."); // 확인 시 동작
    // 실제 취소 로직을 여기에 추가 가능
    // 예: API 호출 후 목록 갱신
  }
};
onMounted(fetchAReviews);
</script>

<template>
  <div class="review_item" v-for="(Areview, index) in Areviews" :key="index">
    <div class="review_left">
      <div class="review_itemName">{{ Areview.store_name }}</div>
      <div class="star_box">
        <img v-for="n in Areview.score" src="/src/assets/icons/star_fill.svg" alt="star" />
        <img v-for="n in 5 - Areview.score" src="/src/assets/icons/star_empty.svg" alt="star" />
      </div>
      <p class="review_text">{{ Areview.content }}</p>
      <img :src="Areview.review_image" alt="Review Image" class="review_image" />
    </div>
    <div class="review_right after_right">
      <div class="review_date">{{ Areview.reservation }}</div>
      <button class="review_button" @click="handleCancelClick(Areview.id)">리뷰 삭제하기</button>
    </div>
  </div>
</template>

<style scoped>
.review_item {
  display: flex;
  border-bottom: 0.0625rem solid #ddd;
  padding: 1.25rem;
}
.review_left {
  flex: 7;
}
.review_itemName {
  font-weight: bold;
  font-size: 1.25rem;
  margin-bottom: 0.3125rem;
}
.review_category {
  font-size: 1.125rem;
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
.review_right {
  flex: 3;
  border-left: 0.0625rem solid #cecece;
  padding-left: 1.25rem;
}
.review_date {
  font-size: 1.25rem;
  margin-bottom: 0.9375rem;
  font-weight: bold;
}
.star_box {
  color: #f5c518;
  margin-top: 0.625rem;
  margin-bottom: 0.625rem;
  font-size: 1.5625rem;
}
.review_text {
  margin: 0;
  font-size: 0.9375rem;
}
.review_button {
  padding: 0.625rem;
  background-color: #ff7400;
  border-radius: 0.25rem;
  color: white;
  margin-bottom: 0.625rem;
}
.after_right {
  padding-top: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
</style>
