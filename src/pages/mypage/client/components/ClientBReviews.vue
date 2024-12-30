<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const userId = 1;
const apiUrl = `https://abc5b35f-117e-49a2-9442-364017e60701.mock.pstmn.io/my/breview/stores/?userId=${userId}`;
const Breviews = ref([]);
const fetchBReviews = async () => {
  try {
    const response = await axios.get(apiUrl);
    Breviews.value = response.data.stores;
  } catch (error) {
    console.error("리뷰 데이터를 가져오는 중 오류 발생:", error);
  }
};
onMounted(fetchBReviews);
</script>

<template>
  <div class="review_item" v-for="(Breview, index) in Breviews" :key="index">
    <a href="/stores/1" class="review_left">
      <div class="review_itemName">{{ Breview.store_name }}</div>
      <img src="https://thenaum.cdn-nhncommerce.com/data/goods/15/01/26/1000000463/1000000463_magnify_07.jpg" alt="Review Image" class="review_image" />
    </a>
    <div class="review_right notYet_right">
      <div class="review_date">{{ Breview.reservation }}</div>
      <button class="review_button">리뷰 쓰러 가기</button>
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
