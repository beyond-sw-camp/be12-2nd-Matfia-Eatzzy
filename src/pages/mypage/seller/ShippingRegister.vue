<script setup>
import { ref } from "vue";
import { useProductsStore } from "../../../stores/useProductsStore";

const productsStore = useProductsStore();
const RegisterDelivery = async () => {
  const result = await productsStore.RegisterDelivery();
  console.log(result);
};

const registerDelivery = (event) => {
  event.preventDefault();
  const result = confirm("배송등록을 하시겠습니까?");
  console.log(result);
  if(result){
    alert("배송등록되었습니다.");  
  }
};

const deliveryData = ref({
  courier_company: "",
  tracking_number: 0,
  order_id: "",
});

RegisterDelivery();



</script>

<template>
  <div class="container">
    <h2>배송 등록</h2>
    <div class="form_group">
      <label for="courier">택배사</label>
      <select
        v-model="deliveryData.courier_company"
        id="courier"
        name="courier"
        required
      >
        <option value="CJ대한통운">CJ 대한통운</option>
        <option value="한진택배">한진택배</option>
        <option value="롯데택배">롯데택배</option>
        <option value="우체국">우체국</option>
        <option value="편의점택배">편의점 택배</option>
      </select>
    </div>
    <div class="form_group">
      <label for="trackingNumber">운송장 번호</label>
      <input
        v-model="deliveryData.tracking_number"
        type="text"
        id="trackingNumber"
        name="trackingNumber"
        placeholder="운송장번호를 입력해주세요"
        required
      />
    </div>
    <div class="form_group">
      <label for="orderNumber">주문 번호</label>
      <input
        v-model="deliveryData.order_id"
        type="text"
        id="orderNumber"
        name="orderNumber"
        placeholder="주문번호를 입력해주세요"
        required
      />
    </div>
    <div class="btn_container">
      <button @click ="registerDelivery" class="btn_submit">등록하기</button>
    </div>
  </div>
</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 360px;
  margin: 50px auto;
  padding: 30px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #00a7b3;
  font-size: 1.8rem;
  margin-bottom: 60px;
}

.form_group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 6px;
}

input[type="text"],
select {
  width: 100%;
  padding: 20px;
  font-size: 14px;
  border: 3px solid #ddd;
  border-radius: 6px;
  box-sizing: border-box;
  margin-bottom: 12px;
  transition: border-color 0.3s;
}

input[type="text"]:focus,
select:focus {
  border-color: #00a7b3;
  outline: none;
}


.btn_submit{
  padding: 4px 30px;
  background-color: #00a7b3;
  color: white;
  font-size: 16px;
  border-radius: 6px;
}
.btn_submit:hover{
  background-color: #008a92;
}

.btn_container {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 20px;
  padding : 0 20px;
}

#courier {
  padding: 10px 18px;
}

</style>
