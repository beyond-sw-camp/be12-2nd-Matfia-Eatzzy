<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useOrderStore } from "../../../stores/useOrderStore";
import ProductItem from "./components/ProductItem.vue";
import { formatPrice } from "../../../utils/formatPrice.js";

const route = useRoute();
const router = useRouter();
const orderStore = useOrderStore();

const orderData = ref({
  idx: 0,
  createdAt: "",
  status: "",
  message: "",
  username: "",
  address: "",
  callNumber: "",
  courierCompany: "",
  trackingNumber: "",
  deliveryStatus: "",
  payStatus: "",
  payPrice: 0,
  paymentName: "",
  products: [],
});

const cancelOrder = () => {
  const result = confirm("주문을 취소하시겠습니까?");
  if (result) {
    alert("주문이 취소되었습니다.");
    router.push("/mypage/client/orders");
  }
};

onMounted(async () => {
  const id = Number(route.params.id);
  const result = await orderStore.getClientOrderDetail(id);
  console.log(result);
  orderData.value = result.order;
});
</script>

<template>
  <div class="detail">
    <div class="section">
      <h1>주문 내역 상세</h1>
      <div class="box" id="detail_info">
        <p>{{ orderData.createdAt }}</p>
        <p>주문번호: {{ orderData.idx }}</p>
        <div class="line"></div>
        <p>주문 상태 : {{ orderData.status }}</p>
      </div>
    </div>
    <div class="section">
      <h1>주문 상품</h1>
      <div class="box">
        <ul class="product_list">
          <ProductItem
            v-for="product in orderData.products"
            :product="product"
          />
        </ul>
      </div>
    </div>
    <div class="section">
      <h1>결제 정보</h1>
      <div id="pay" class="box">
        <div class="pay_item">
          <p>상품 금액</p>
          <div class="dots"></div>
          <p class="price">{{ formatPrice(orderData.payPrice) }}원</p>
        </div>
        <div class="pay_item">
          <p>결제 금액</p>
          <div class="dots"></div>
          <p class="price">{{ formatPrice(orderData.payPrice) }}원</p>
        </div>
        <div class="pay_item">
          <p>결제 방법</p>
          <div class="dots"></div>
          <p class="price">{{ orderData.paymentName }}</p>
        </div>
      </div>
    </div>
    <div class="section">
      <h1>배송 정보</h1>
      <div id="delivery" class="box">
        <div class="deliver_item">
          <p>이름</p>
          <p>{{ orderData.username }}</p>
        </div>
        <div class="deliver_item">
          <p>전화번호</p>
          <p>{{ orderData.callNumber }}</p>
        </div>
        <div class="deliver_item">
          <p>주소</p>
          <p>{{ orderData.address }}</p>
        </div>
        <div class="deliver_item">
          <p>요청사항</p>
          <p>{{ orderData.message }}</p>
        </div>
        <div
          v-if="orderData.deliveryStatus !== '배송 준비 중'"
          class="deliver_item"
        >
          <p>택배사</p>
          <p>{{ orderData.courierCompany }}</p>
        </div>
        <div
          v-if="orderData.deliveryStatus !== '배송 준비 중'"
          class="deliver_item"
        >
          <p>운송장 번호</p>
          <p>{{ orderData.trackingNumber }}</p>
        </div>
      </div>
    </div>
    <div id="cancel" class="box">
      <p>주문 취소는 [결제 완료] 상태일 때만 가능합니다.</p>
      <button
        class="cancel_btn"
        :class="{ disabled: orderData.status !== '결제 완료' }"
        :disabled="orderData.status !== '결제 완료'"
        @click="cancelOrder"
      >
        전체 상품 주문 취소
      </button>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 1.3rem;
}

.line {
  width: 100%;
  height: 1px;
  background-color: #eceff3;
  margin: 1rem 0 1.5rem;
}

.section {
  margin-top: 2rem;
}

.box {
  border-radius: 0.625rem;
  border: 1px solid #ccc;
  padding: 1.5rem;
  margin: 0.8rem 0 1.9rem;
}

/* 주문 정보 */
#detail_info > p:first-child {
  color: #848f9a;
}

#detail_info > p:nth-child(2) {
  font-size: 1.125rem;
  font-weight: 600;
}

#detail_info > p:nth-child(4) {
  font-size: 1rem;
}

/* 상품 목록 */
.product_list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* 결제정보 */
#pay {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.pay_item {
  display: flex;
  justify-content: space-between;
}

.pay_item > p {
  font-size: 1rem;
}

.dots {
  flex-grow: 1;
  height: 1px;
  margin: auto 1rem;
  border-top: 1px dashed #ccc;
}

/* 배송정보 */
#delivery {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.deliver_item {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.deliver_item > p {
  font-size: 1rem;
}

.deliver_item > p:first-child {
  color: #848f9a;
}

.deliver_item > p:nth-child(2) {
  grid-column: 2/7;
}

/* 주문 취소 */
#cancel > p {
  color: #848f9a;
  margin-bottom: 0.7rem;
}

.cancel_btn {
  width: 100%;
  border: 1px solid #1a1a1a;
  border-radius: 0.5rem;
  padding: 0.7rem;
  font-size: 1rem;
  font-weight: 700;
}

.cancel_btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.cancel_btn.disabled {
  color: #ccc;
  border-color: #ccc;
}

.cancel_btn.disabled:hover {
  background-color: white;
}
</style>
