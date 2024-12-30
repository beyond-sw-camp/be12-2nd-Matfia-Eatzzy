<script setup>
import { ref } from 'vue';
import { useProductsStore } from '../../../stores/useProductsStore';

const productsStore = useProductsStore();
const ModifyProduct = async () => {
  const result = await productsStore.ModifyProduct();
  console.log(result);
}

const modifyProudct = (event) => {
  event.preventDefault();
  const result = confirm("상품정보를 수정하시겠습니까?");
  console.log(result);
  if(result){
    alert("수정되었습니다.");  
  }
};

const modifyData = ref(
{
name: "", 
price : 0, 
stock : 0, 
description: "", 
image : ""
} 
);

ModifyProduct();
</script>

<template>
  <div class="form_container">
    <h1>상품 수정</h1>
    <form>
      <div class="form_group">
        <label for="name">상품명</label>
        <input v-model="modifyData.name" type="text" id="product_name" required />
      </div>

      <div class="form_group">
        <label for="price">가격</label>
        <input v-model="modifyData.price" type="number" id="product_price" required min="0" step="1000" />
      </div>

      <div class="form_group">
        <label for="stock">재고</label>
        <input v-model="modifyData.stock" type="number" id="product_stock" required min="0" />
      </div>

      <div class="form_group">
        <label for="description">상품 설명</label>
        <textarea v-model="modifyData.description" id="product_description" required></textarea>
      </div>

      <div class="form_group">
        <label for="image">상품 이미지</label>
        <input type="file" id="product_image" />
      </div>

      <div class="form_group buttons">
        <button @click="modifyProudct" class="btn_modify">수정하기</button>
        <router-link to="/mypage/seller/product" class="btn_cancel">취소하기</router-link>
      </div>
    </form>
  </div>
</template>

<style scoped>

.form_container {
  width: 100%;
  max-width: 450px;
  margin: 60px auto;
  background-color: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #00a7b3;
  font-size: 2.2rem;
  margin-bottom: 40px;
}

.form_group {
  margin-bottom: 25px;
}

.form_group label {
  display: block;
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
}

.form_group input,
.form_group textarea {
  width: 100%;
  padding: 12px;
  font-size: 15px;
  border: 2px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form_group input:focus,
.form_group textarea:focus {
  border-color: #00a7b3;
  outline: none;
  box-shadow: 0 0 8px rgba(0, 167, 179, 0.2);
}

.form_group textarea {
  min-height: 120px;
  resize: vertical;
}

.buttons {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

button {
  padding: 12px 20px;
  background-color: #00a7b3;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  max-width: 160px;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #008a92;
}

</style>
