<script setup>
import { ref, onMounted } from "vue";
import { useReviewableStore } from "../../../../stores/useReviewableStore";
import { useReviewStore } from "../../../../stores/useReviewStore";
import { useRouter } from "vue-router";

const reviewStore = useReviewStore();
const reviewableStore = useReviewableStore();
const router = useRouter();

const createReview = (store) => {
  reviewStore.setStore(store);
  router.push("/mypage/client/store/review/create");
};

onMounted(async () => {
  await reviewableStore.getreviewableStores();
  console.log(reviewableStore.reviewableStores);
});
</script>

<template>
  <div
    class="review_item"
    v-for="(Breview, index) in reviewableStore.reviewableStores"
    :key="index"
  >
    <a href="/stores/1" class="review_left">
      <div class="review_itemName">{{ Breview.store_name }}</div>
      <img
        :src="Breview.review_image"
        alt="Review Image"
        class="review_image"
      />
    </a>
    <div class="review_right notYet_right">
      <div class="review_date">{{ Breview.reservation }}</div>
      <button class="review_button" @click="createReview(Breview)">
        리뷰 쓰러 가기
      </button>
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
