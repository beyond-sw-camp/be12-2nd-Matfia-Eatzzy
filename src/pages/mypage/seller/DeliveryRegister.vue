<script setup>
import { ref } from "vue";
import { useProductsStore } from "../../../stores/useProductsStore";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const productsStore = useProductsStore();

const deliveryData = ref({
  courier_company: "",
  tracking_number: "",
  order_id: null,
});

const registerDelivery = async (event) => {
  event.preventDefault();
  const result = confirm("배송등록을 하시겠습니까?");
  console.log(result);
  if (result) {
    await productsStore.RegisterDelivery();
    alert("배송 등록되었습니다.");
    router.push(`/mypage/seller/orders/${route.params.id}`);
  }
};
</script>

<template>
  <div class="delireg_wrap">
    <h1>배송 등록</h1>
    <div class="line"></div>
    <div class="form_box">
      <div class="form_group">
        <label for="courier">택배사</label>
        <div id="select" class="input_box">
          <select
            v-model="deliveryData.courier_company"
            id="courier"
            name="courier"
            required
            class="select_company"
          >
            <option value="" selected disabled>-- 택배사 선택 --</option>
            <option value="CJ대한통운">CJ 대한통운</option>
            <option value="한진택배">한진택배</option>
            <option value="롯데택배">롯데택배</option>
            <option value="우체국">우체국</option>
            <option value="편의점택배">편의점 택배</option>
          </select>
        </div>
      </div>
      <div class="form_group">
        <label for="trackingNumber">운송장 번호</label>
        <div class="input_box">
          <input
            v-model="deliveryData.tracking_number"
            type="number"
            id="trackingNumber"
            name="trackingNumber"
            placeholder="운송장 번호를 입력해주세요"
            required
          />
        </div>
      </div>

      <div id="order_number" class="form_group">
        <label for="orderNumber">주문 번호</label>
        <div class="input_box">
          <input
            v-model="deliveryData.order_id"
            type="number"
            id="orderNumber"
            name="orderNumber"
            placeholder="주문 번호를 입력해주세요"
            required
          />
        </div>
      </div>
    </div>

    <button @click="registerDelivery" class="btn">등록하기</button>
  </div>
</template>

<style scoped>
.delireg_wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.delireg_wrap > h1 {
  font-size: 1.4rem;
  margin-bottom: 1rem;
}
.line {
  width: 100%;
  height: 0.125rem;
  background-color: #ccc;
}

.form_box {
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem 4rem;
}

label {
  display: block;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
}

.form_group {
  width: 100%;
}

.input_box {
  border-radius: 0.5rem;
  border: 1px solid #9e9e9e;
  padding: 0.3rem 0.8rem;
}

.input_box > input {
  height: 1.9375rem;
  width: 100%;
  border: none;
  padding: 0;
}

.input_box:focus-within {
  border-color: black;
}

#select {
  padding: 0;
  height: 2.55rem;
}

.select_company {
  width: 100%;
  height: 100%;
  padding: 0.25rem 0.8rem;
  border: none;
  outline: none;
  border-radius: 1rem;
}

#order_number {
  grid-column: span 2;
}

/* 스피너 제거 */
.input_box > input[type="number"]::-webkit-inner-spin-button,
.input_box > input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.input_box > input[type="number"] {
  -moz-appearance: textfield; /* Firefox */
}

.btn {
  width: 10rem;
  padding: 0.6rem 2rem;
  background-color: #ff7400;
  color: white;
  border-radius: 0.8rem;
  font-size: 1rem;
  font-weight: 700;
  transition: background-color 0.3s ease;
  margin-top: 1.25rem;
  align-self: center;
}

.btn:hover {
  background-color: #c96208;
}
</style>
