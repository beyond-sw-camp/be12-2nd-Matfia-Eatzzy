<script setup>
import { onMounted } from "vue";
import ProductItem from "./ProductItem.vue";

defineProps({
  order: Object,
});

onMounted(() => {});
</script>

<template>
  <li class="order_card">
    <div class="order_header">
      <div class="text_box">
        <p>{{ order.orderDate }}</p>
        <p>주문번호: {{ order.idx }}</p>
      </div>
      <router-link :to="`/mypage/client/orders/${order.idx}`" class="detail_btn">
        <span>주문 상세보기</span>
        <img src="/src/assets/icons/angle_right.svg" alt="상세보기" />
      </router-link>
    </div>
    <div class="line"></div>
    <div class="order_body">
      <p>{{ order.status }}</p>
      <ul class="product_list">
        <ProductItem v-for="product in order.myOrderList" :product="product" />
      </ul>
    </div>
  </li>
</template>

<style scoped>
.order_card {
  border-radius: 1rem;
  border: 1px solid #ccc;
  padding: 1.5rem;
  margin: 1rem 0;
}
.order_card > .line {
  width: 100%;
  height: 1px;
  background-color: #eceff3;
  margin: 1rem 0 1.5rem;
}

.order_header {
  display: flex;
  justify-content: space-between;
}

.order_header > .text_box > p:first-child {
  font-size: 1.125rem;
  font-weight: 600;
}

.order_header > .text_box > p:last-child {
  color: #848f9a;
}

.detail_btn {
  display: flex;
  justify-content: center;
  height: 1.2rem;
}

.detail_btn > span {
  line-height: 150%;
}

.detail_btn > img {
  width: 1.2rem;
  height: 1.2rem;
}

.order_body > p {
  font-size: 1.25rem;
  color: #ff7400;
  font-weight: 600;
  margin-bottom: 1rem;
}

.product_list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
