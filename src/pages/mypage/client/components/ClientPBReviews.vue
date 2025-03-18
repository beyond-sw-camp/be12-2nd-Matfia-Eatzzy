<script setup>
import { ref, onMounted } from "vue";
import { useReviewableStore } from "../../../../stores/useReviewableStore";
import { useReviewStore } from "../../../../stores/useReviewStore";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const reviewStore = useReviewStore();
const reviewableStore = useReviewableStore();

const pBReviewed = ref([]);

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

const fetchBReview = async () => {
  try {
    const response = await axios.get("/api/app/products/reviews/reviewable");
    pBReviewed.value = response.data.result; // 받아온 데이터를 ref에 저장
    console.log("작성할 목록 :", pBReviewed.value);
  } catch (error) {
    console.error("데이터 가져오기 실패:", error);
  }
};

const createReview = (product) => {
  reviewStore.setProduct(product);
  router.push("/mypage/client/product/review/create");
};

onMounted(() => {
  //reviewableStore.getreviewableStores();
  fetchBReview();
});
</script>

<template>
  <div class="review_item" v-for="(PBreview, index) in pBReviewed" :key="index">
    <a href="/products/1" class="review_left">
      <div class="review_itemName">{{ PBreview.product_name }}</div>
      <img :src="PBreview.review_images" alt="Review Image" class="review_image" />
    </a>
    <div class="review_right notYet_right">
      <div class="review_date">{{ PBreview.purchase }}</div>
      <button class="review_button" @click="createReview(PBreview)">리뷰 쓰러 가기</button>
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
.review_image {
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
  padding-top: 0.5rem;
  font-weight: bold;
}
.review_date {
  font-size: 1.25rem;
  margin-bottom: 0.9375rem;
}
.review_button {
  padding: 0.625rem;
  background-color: #ff7400;
  border-radius: 0.25rem;
  color: white;
  margin-top: 3rem;
}
</style>
