<script setup>
import { onMounted, ref } from "vue";
import { useReviewStore } from "../../../stores/useReviewStore";
import { useLoadingStore } from "../../../stores/useLoadingStore";

const props = defineProps({
  storeId: {
    type: Number,
    required: true,
  },
});

const reviewList = ref([]);

const loadingStore = useLoadingStore();
const reviewStore = useReviewStore();

onMounted(async () => {
  loadingStore.startLoading("storeReview");
  const result = await reviewStore.getStoreReview(props.storeId);
  reviewList.value = result.reviews;
  setTimeout(() => {
    loadingStore.stopLoading();
  }, 500);
});
</script>

<template>
      <div v-if="loadingStore.getIsLoading('storeReview')" class="spinner_box">
      <VueSpinner size="30" color="#ff7400"/>
    </div>
  <div v-else>
    <div class="review_header">
      <img src="/src/assets/icons/star_fill.svg" alt="star" />
      <div>
        <p>4.7</p>
        <span>53개의 리뷰</span>
      </div>
    </div>
    <ul class="review_list">
      <li v-for="review in reviewList" class="review_item">
        <div class="star_box">
          <img
            v-for="n in review.starPoint"
            src="/src/assets/icons/star_fill.svg"
            alt="star"
          />
          <img
            v-for="n in 5 - review.starPoint"
            src="/src/assets/icons/star_empty.svg"
            alt="star"
          />
        </div>
        <div class="review_user">
          <span id="userName">{{ review.username[0] + "**" }}</span>
          <span id="createdAt">{{ review.createdAt }}</span>
        </div>
        <div class="review_image_box" v-if="review.img">
          <img :src="review.img" alt="review image" />
        </div>
        <p>
          {{ review.content }}
        </p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.spinner_box {
  width: 4rem;
  height: 20rem;
  margin: 10rem auto;
}

.review_header {
  display: flex;
  justify-content: center;
  gap: 1rem;
  border: 1px solid #ccc;
  padding: 1.5rem 0;
}

.review_header > img {
  width: 3rem;
  height: 3rem;
}

.review_header > div > p {
  font-size: 1.2rem;
  font-weight: 700;
}

.review_item {
  padding: 1.5rem 1rem;
  border-bottom: 1px solid #d8dde5;
}

.star_box {
  display: flex;
  margin: 0 0 0.2rem -0.2rem;
}

.review_user {
  color: #7e7e7e;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.review_user > #userName::after {
  content: "•";
  margin: 0 0.3rem;
  color: #ccc;
}

.review_image_box {
  width: 100%;
  height: 10rem;
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  margin: 1rem 0;
}

.review_image_box > img {
  width: 10rem;
  border-radius: 1rem;
  object-fit: cover;
}

.review_item p {
  font-size: 1rem;
}
</style>
