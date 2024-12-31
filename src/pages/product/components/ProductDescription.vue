<template>
  <div class="intro_item">
    <h2>매장 소개</h2>
    <p>
      {{ description }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  description: {
    type: String,
    required: true,
  },
});
</script>

<style>
/* 매장 소개 */
#intro_box {
  display: none;
  padding: 0 1.5rem;
}

.intro_item {
  margin-bottom: 2rem;
}

.intro_item > h2 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}
</style>
