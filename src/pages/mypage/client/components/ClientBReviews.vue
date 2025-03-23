<script setup>
import { ref, onMounted } from "vue";
import { useReviewStore } from "../../../../stores/useReviewStore";
import { useRouter } from "vue-router";
import axios from "axios";

const reviewStore = useReviewStore();
const router = useRouter();

const createReview = (store) => {
  reviewStore.setStore(store);
  router.push("/mypage/client/store/review/create");
};

const Reviewable = ref([]);

const fetchBReviewed = async () => {
  try {
    const response = await axios.get("/api/app/resv/mypage/store/canreview");
    Reviewable.value = response.data.result; // 받아온 데이터를 ref에 저장
    console.log("작성한 목록 :", Reviewable.value);
  } catch (error) {
    console.error("데이터 가져오기 실패:", error);
  }
};

onMounted(async () => {
  fetchBReviewed();
});
</script>

<template>
  <div class="review_item" v-for="(Breview, index) in Reviewable" :key="index">
    <a href="/stores/1" class="review_left">
      <div class="review_itemName">{{ Breview.storeName }}</div>
      <img :src="Breview.ImageUrl" alt="Review Image" class="review_image" />
    </a>
    <div class="review_right notYet_right">
      <div class="review_date">{{ Breview.resvDate }}</div>
      <button class="review_button" @click="createReview(Breview)">리뷰 쓰러 가기</button>
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
