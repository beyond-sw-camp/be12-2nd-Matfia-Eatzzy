<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { formatPrice } from "../../../utils/formatPrice";
import ProductItem from "../client/components/ProductItem.vue";

const route = useRoute();
const router = useRouter();
const orderDetails = ref({
  orderMypageList: {},
});
import axios from "axios";

const fetchOrderDetails = async (idx) => {
  try {
    const response = await axios.get(`/api/app/orders/mypage/orderdetails?orderIdx=${idx}`);
    orderDetails.value = response.data.result; // 받아온 데이터를 ref에 저장
    console.log("oo");
    console.log("작성한 목록 :", orderDetails.value);
  } catch (error) {
    console.error("데이터 가져오기 실패:", error);
  }
};

const userType = computed(() => {
  const pathSegments = route.path.split("/");
  return pathSegments[2]; // 경로의 두 번째 부분 (client 또는 seller)
});

const cancelOrder = () => {
  const result = confirm("주문을 취소하시겠습니까?");
  if (result) {
    alert("주문이 취소되었습니다.");
    router.push("/mypage/client/orders");
  }
};

const registerDelivery = (orderId) => {
  router.push(`/mypage/seller/orders/${orderId}/delivery/register`);
};

onMounted(async () => {
  const id = Number(route.params.id);
  fetchOrderDetails(id);
});
</script>

<template>
  <div class="detail">
    <div class="section">
      <h1>주문 내역 상세</h1>
      <div class="box" id="detail_info">
        <p>{{ orderDetails.orderDate }}</p>
        <p>주문번호: {{ orderDetails.orderMypageList.idx }}</p>
        <div class="line"></div>
        <p>주문 상태 : {{ orderDetails.orderMypageList.status }}</p>
      </div>
    </div>
    <div class="section">
      <h1>주문 상품</h1>
      <div class="box">
        <ul class="product_list">
          <ProductItem v-for="product in orderDetails.orderMypageList.myOrderList" :product="product" />
        </ul>
      </div>
    </div>
    <div class="section">
      <h1>결제 정보</h1>
      <div id="pay" class="box">
        <div class="pay_item">
          <p>상품 금액</p>
          <div class="dots"></div>
          <p class="price">{{ formatPrice(orderDetails.orderPrice) }}원</p>
        </div>
        <div class="pay_item">
          <p>결제 금액</p>
          <div class="dots"></div>
          <p class="price">{{ formatPrice(orderDetails.paymentPrice) }}원</p>
        </div>
        <div class="pay_item">
          <p>결제 방법</p>
          <div class="dots"></div>
          <p class="price">{{ orderDetails.paymentMethod }}</p>
        </div>
      </div>
    </div>
    <div class="section">
      <h1>배송 정보</h1>
      <div id="delivery" class="box">
        <div class="deliver_item">
          <p>이름</p>
          <p>{{ orderDetails.name }}</p>
        </div>
        <div class="deliver_item">
          <p>전화번호</p>
          <p>{{ orderDetails.phone }}</p>
        </div>
        <div class="deliver_item">
          <p>주소</p>
          <p>{{ orderDetails.address }}</p>
        </div>
        <div class="deliver_item">
          <p>요청사항</p>
          <p>{{ orderDetails.message }}</p>
        </div>
        <!--<div v-if="orderDetails.deliveryStatus !== '배송 준비 중'" class="deliver_item">-->
        <div v-if="orderDetails.deliveryStatus !== '배송 준비 중'" class="deliver_item">
          <p>택배사</p>
          <p>{{ orderDetails.courier_company }}</p>
        </div>
        <!--<div v-if="orderDetails.deliveryStatus !== '배송 준비 중'" class="deliver_item">-->
        <div v-if="orderDetails.deliveryStatus !== '배송 준비 중'" class="deliver_item">
          <p>운송장 번호</p>
          <p>{{ orderDetails.tracking_number }}</p>
        </div>
      </div>
    </div>
    <div v-if="userType === 'client'" id="btn" class="box">
      <p>주문 취소는 [결제 완료] 상태일 때만 가능합니다.</p>
      <button class="btn" :class="{ disabled: orderDetails.status !== '결제 완료' }" :disabled="orderDetails.status !== '결제 완료'" @click="cancelOrder">
        전체 상품 주문 취소
      </button>
    </div>
    <div v-if="userType === 'seller'" id="btn" class="box">
      <p>배송 등록은 [결제 완료] 상태일 때만 가능합니다.</p>
      <button
        class="btn"
        :class="{ disabled: orderData.status !== '결제 완료' }"
        :disabled="orderDetails.status !== '결제 완료'"
        @click="registerDelivery(orderData.idx)"
      >
        배송 등록하기
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
#btn > p {
  color: #848f9a;
  margin-bottom: 0.7rem;
}

.btn {
  width: 100%;
  border: 1px solid #1a1a1a;
  border-radius: 0.5rem;
  padding: 0.7rem;
  font-size: 1rem;
  font-weight: 700;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.btn.disabled {
  color: #ccc;
  border-color: #ccc;
}

.btn.disabled:hover {
  background-color: white;
}
</style>
