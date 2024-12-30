<script setup>
import { ref } from 'vue';
import { useProductsStore } from '../../../stores/useProductsStore';


const productsStore = useProductsStore();
const addProduct = async () => {
  const result = await productsStore.addProduct();
  console.log(result);
}

const registerProudct = (event) => {
  event.preventDefault();
  const result = confirm("상품을 등록하시겠습니까?");
  console.log(result);
  if(result){
    alert("상품이 등록되었습니다.");  
  }
};

const productData = ref(
{
  name: "",
  price: 0,
  stock: 0,
  expiration_date: "",
  cooking_time: 0,
  category: "",
  description: "",
  image: ""
}
);

addProduct();

</script>

<template>
  <div class="container">
    <h1>상품 등록</h1>
    <form>
      <div class="form_row">
        <div class="form_group">
          <label for="product_name">상품명</label>
          <input v-model="productData.name" type="text" id="product_name" name="product_name" required>
        </div>
        <div class="form_group">
          <label for="price">가격</label>
          <input v-model="productData.price" type="number" id="price" name="price" required min="0" step="1000">
        </div>
      </div>
      <div class="form_row">
        <div class="form_group">
          <label for="stock">재고 수량</label>
          <input v-model="productData.stock" type="number" id="stock" name="stock" required min="0">
        </div>
        <div class="form_group">
          <label for="expiry_date">유통기한</label>
          <input v-model="productData.expiration_date" type="date" id="expiry_date" name="expiry_date" >
        </div>
      </div>

      <div class="form_row">
        <div class="form_group">
          <label for="cooking_time">조리시간 (분)</label>
          <input v-model="productData.cooking_time" type="number" id="cooking_time" name="cooking_time" required min="0">
        </div>
        <div class="form_group">
          <label for="category">카테고리</label>
          <select v-model= "productData.category" id="category" name="category" required>
            <option value="Korean">한식</option>
            <option value="Chinese">중식</option>
            <option value="Japanese">일식</option>
            <option value="Western">양식</option>
            <option value="Asian">아시안</option>
            <option value="Snacks">분식</option>
            <option value="Fastfood">패스트푸드</option>
          </select>
        </div>
      </div>

      <div class="form_row">
        <div class="form_group">
          <label for="description">상품 설명</label>
          <textarea v-model="productData.description" id="description" name="description" rows="4" required></textarea>
        </div>
        <div class="form_group">
          <label for="image">상품 이미지</label>
          <input type="file" id="image" name="image" accept="image/*" required>
        </div>
      </div>

      <button @click ="registerProudct" class="button">등록하기</button>
    </form>
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
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
h1 {
  text-align: center;
  color: #00a7b3;
  font-size: 2rem;
  margin-bottom: 70px;
  margin-top: 40px;
}
.form_row {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
}
.form_group {
  flex: 1;
  min-width: 250px;
  margin-bottom: 20px;
  font-size: 15px;
}
label {
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
  display: block;
}
input,
textarea,
select {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 3px solid #ddd;
  font-size: 1rem;
  margin: 5px 0;
  box-sizing: border-box;
  transition: border 0.3s ease;
}
input:focus,
textarea:focus,
select:focus {
  border-color: #00a7b3;
  outline: none;
}
textarea {
  resize: vertical;
  min-height: 150px;
}
button {
  width: 100%;
  padding: 15px;
  background-color: #00a7b3;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;
}
button:hover {
  background-color: #008a92;
}
.form_group input[type="file"] {
  padding: 6px;
  font-size: 12px;
}
.form_group input[type="date"],
.form_group input[type="number"] {
  font-size: 12px;
}
</style>

