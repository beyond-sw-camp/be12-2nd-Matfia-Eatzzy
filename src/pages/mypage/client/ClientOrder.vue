<script setup>
import { onMounted, ref } from "vue";
import { useOrderStore } from "../../../stores/useOrderStore";
import ClientOrderCard from "./components/ClientOrderCard.vue";

const orderList = ref([]);

const orderStore = useOrderStore();

onMounted(async () => {
  const result = await orderStore.getClientOrderList();
  console.log(result);
  orderList.value = result.orders;
});
</script>

<template>
  <div class="order_container">
    <h1>주문 내역</h1>
    <ul class="order_list">
      <ClientOrderCard v-for="order in orderList" :order="order" />
    </ul>
  </div>
</template>

<style scoped>
.order_container > h1 {
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
}

.order_list {
  width: 100%;
}

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
  margin: 1rem 0 1.2rem;
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

.order_body > p {
  font-size: 1.125rem;
  color: #ff7400;
  font-weight: 600;
  margin-bottom: 1rem;
}

.product_list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.product_item {
  display: flex;
  gap: 1rem;
}

.product_item img {
  width: 5rem;
  height: 5rem;
  border-radius: 0.5rem;
}

.product_info {
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.product_info > p {
  font-weight: 600;
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
