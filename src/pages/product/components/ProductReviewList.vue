<template>
  <div id="review_box" class="content_box">
    <div class="review_header">
      <img src="/src/assets/icons/star_fill.svg" alt="star" />
      <div>
        <p>{{ product.starPoint }}</p>
        <span>{{ product.reviewCnt }} 개의 리뷰</span>
      </div>
    </div>

    <ul class="review_list">
      <li v-for="(review, index) in reviews" :key="index" class="review_item">
        <div class="star_box">
          <template v-for="star in 5" :key="star">
            <img
              :src="
                star <= review.starPoint
                  ? '/src/assets/icons/star_fill.svg'
                  : '/src/assets/icons/star_empty.svg'
              "
              alt="star"
            />
          </template>
        </div>
        <div class="review_user">
          <span id="userName">익명</span>
          <span id="createdAt">{{ formatDate(review.createdAt) }}</span>
        </div>
        <div v-if="review.imageUrls.length" class="review_image_box">
          <img
            v-for="(image, idx) in review.imageUrls"
            :key="idx"
            :src="image"
            alt="review image"
          />
        </div>
        <p>{{ review.content }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  reviews: {
    type: Object,
    required: true,
  },
});
</script>

<style>
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

/* 리뷰 아이템 */
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
  font-size: 0.8rem;
  margin-bottom: 1rem;
}

.review_user > #userName::after {
  content: "•";
  margin-left: 0.3rem;
  color: #ccc;
}

.review_image_box {
  width: 30rem;
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  margin: 1rem 0;
}

.review_image_box > img {
  width: 10rem;
  border-radius: 1rem;
}
</style>
