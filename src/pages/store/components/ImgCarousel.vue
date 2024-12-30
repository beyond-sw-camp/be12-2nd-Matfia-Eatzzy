<script setup>
import { Carousel, Navigation, Slide } from "vue3-carousel";

const props = defineProps({
  images: {
    type: Object,
    required: true,
  },
});

const config = {
  itemsToShow: 1.5,
  gap: 5,
  wrapAround: true,
};
</script>

<template>
  <Carousel v-bind="config" class="image_box">
    <Slide v-for="image in props.images" :key="image">
      <img :src="image" alt="식당 대표 사진" class="store_image" />
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<style scoped>
.image_box {
  width: 100%;
  margin-bottom: 1.75rem;
}
.store_image {
  width: 100%;
  height: 30rem;
  object-fit: cover;
}

@media (max-width: 960px) {
  .store_image {
    height: 20rem;
  }
}
</style>

<style>
.carousel__icon {
  fill: #ffffff;
}
</style>
