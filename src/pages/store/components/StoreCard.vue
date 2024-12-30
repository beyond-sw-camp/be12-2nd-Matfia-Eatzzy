<script setup>
const props = defineProps({
  store: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <router-link :to="`/stores/${store.idx}`" id="store_item">
    <img class="store_img" :src="store.storeImg" />
    <div class="info_box">
      <span class="subtitle">{{ store.category }}</span>
      <span class="store_name">{{ store.name }}</span>
      <div class="review_box">
        <img src="/src/assets/icons/star_fill.svg" alt="star" class="icon" />
        <div class="review_content_box">
          <span>{{ store.starPoint }}</span>
          <span class="subtitle">({{ store.reviewCnt }})</span>
        </div>
      </div>
      <span class="subtitle">{{ store.shortAddress }}</span>
    </div>
  </router-link>
</template>

<style scoped>
.store_item {
  width: 100%;
}

.store_img {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 0.375rem;
}

.info_box {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin: 0.5rem 0;
}

.store_name {
  font-weight: 700;
  font-size: 1rem;
}

.review_box {
  font-family: "Open Sans", "Noto Sans KR", sans-serif;
  display: flex;
  align-items: center;
  gap: 0.125rem;
  letter-spacing: -0.01em;
  font-size: 0.75rem;
}

.subtitle {
  font-size: 0.75rem;
  color: gray;
}

.icon {
  width: 1rem;
  height: 1rem;
}

.review_content_box span:first-child {
  font-weight: 500;
  margin-right: 0.2rem;
}

</style>
