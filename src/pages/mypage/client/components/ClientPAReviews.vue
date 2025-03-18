<script setup>
import { ref, onMounted } from "vue";
import { useReviewedStore } from "../../../../stores/useReviewedStore";
import axios from "axios";

//const reviewedStore = useReviewedStore();
const pReviewed = ref([]);

const handleCancelClick = async (reviewIdx) => {
  const isConfirmed = confirm("정말로 이 상품의 리뷰를 삭제할까요?");
  if (isConfirmed) {
    alert("삭제되었습니다.");
    try {
      console.log(reviewIdx);
      await axios.delete(`/api/app/products/reviews/mypage/productdelete/${reviewIdx}`);
      window.location.reload(); // 삭제 후 데이터 새로 불러오기
    } catch (error) {
      console.error("삭제 실패:", error);
    }
  }
};

const fetchAReviewed = async () => {
  try {
    const response = await axios.get("/api/app/products/reviews/mypage/store");
    pReviewed.value = response.data.result; // 받아온 데이터를 ref에 저장
    console.log("작성한 목록 :", pReviewed.value);
  } catch (error) {
    console.error("데이터 가져오기 실패:", error);
  }
};

onMounted(() => {
  //reviewedStore.getreviewedStores();
  fetchAReviewed();
});
</script>

<template>
  <div class="review_item" v-for="(PAreview, index) in pReviewed" :key="index">
    <div class="review_left">
      <div class="review_itemName">{{ PAreview.title }}</div>
      <div class="star_box">
        <img v-for="n in PAreview.starPoint" src="/src/assets/icons/star_fill.svg" alt="star" />
        <img v-for="n in 5 - PAreview.starPoint" src="/src/assets/icons/star_empty.svg" alt="star" />
      </div>
      <p class="review_text">{{ PAreview.contents }}</p>
      <div class="img_box">
        <img v-for="(image, index) in PAreview.reviewImage" :src="image" :alt="'Review Image ' + (index + 1)" class="review_image" :key="index" />
      </div>
    </div>
    <div class="review_right after_right">
      <div class="review_date">{{ PAreview.purchase }}</div>
      <button class="review_button" @click="handleCancelClick(PAreview.idx)">리뷰 삭제하기</button>
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
.img_box {
  display: flex;
  gap: 0.625rem;
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
