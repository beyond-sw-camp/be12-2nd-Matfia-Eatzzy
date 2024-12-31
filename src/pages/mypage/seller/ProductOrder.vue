<script setup>
import { ref } from "vue";
import { useProductsStore } from "../../../stores/useProductsStore";
import { formatPrice } from "../../../utils/formatPrice";

const orderList = ref([]);

const productsStore = useProductsStore();
const getOrderProduct = async () => {
  const result = await productsStore.getOrderProduct();
  orderList.value = result.orders;
};

getOrderProduct();
</script>

<template>
  <div class="order_container">
    <h1>주문 내역</h1>
    <div class="grid header">
      <div>주문번호/날짜</div>
      <div>상품명/사진</div>
      <div>수량</div>
      <div>상품 금액</div>
      <div>주문 상태</div>
    </div>

    <router-link
      :to="`/mypage/seller/order/${order.idx}`"
      v-for="order in orderList"
      class="grid order_item"
    >
      <div class="order_info">
        <p>{{ order.idx }}</p>
        <p>{{ order.createdAt }}</p>
      </div>

      <div class="product">
        <img :src="order.image" alt="상품 이미지" />
        <p>
          {{ order.name }} <span>외 {{ order.productCnt - 1 }}개</span>
        </p>
      </div>

      <p>{{ order.quantity }}개</p>
      <p>{{ formatPrice(order.price) }}원</p>
      <p class="status">{{ order.status }}</p>
    </router-link>
  </div>
</template>

<style scoped>
.order_container {
  width: 100%;
}

.order_container > h1 {
  font-size: 1.4rem;
  margin-bottom: 2rem;
}

.header {
  background-color: rgba(0, 0, 0, 0.05);
  font-weight: bold;
  padding: 0.5rem 0;
  text-align: center;
  border-bottom: 2px solid #bbbbbb;
}

.grid {
  display: grid;
  grid-template-columns: 1.5fr 3fr 1fr 1fr 1fr;
  gap: 0.5rem;
  width: 100%;
}

.order_item {
  padding: 0.7rem 0;
  border-bottom: 1px solid #e6e6e6;
}

.order_item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.order_info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1rem;
}

.order_info > p:first-child {
  font-weight: 700;
  font-size: 1rem;
}

.order_info > p:last-child {
  color: #aaaaaa;
  font-size: 0.8rem;
}

.product {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 0 1rem;
}

.product > img {
  width: 4.5rem;
  aspect-ratio: 1 / 1;
  border-radius: 0.5rem;
  object-fit: cover;
}

.product > p {
  font-weight: 700;
}

.order_item > p {
  display: flex;
  align-items: center;
  justify-content: center;
}

.status {
  font-weight: 700;
  color: #ff7400;
}
</style>
