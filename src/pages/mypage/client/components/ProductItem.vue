<script setup>
defineProps({
  product: Object,
});
</script>

<template>
  <li class="product_item">
    <img :src="product.productImage" alt="주문상품" />
    <div class="product_info">
      <p>{{ product.name }}</p>
      <div class="price_cnt_box">
        <span v-if="product.quantity">{{ product.quantity }}개</span>
      </div>
    </div>
  </li>
</template>

<style scoped>
.product_item {
  display: flex;
  gap: 1rem;
}

.product_item img {
  width: 5rem;
  height: 5rem;
  border-radius: 0.5rem;
  object-fit: cover;
}

.product_info {
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;
}

.product_info > p {
  font-size: 1rem;
  font-weight: 500;
}

.price_cnt_box > span::after {
  content: "";
  width: 1px;
  height: 100%;
  color: #ccc;
}

.price_cnt_box {
  display: flex;
  gap: 0.4rem;
}
</style>
