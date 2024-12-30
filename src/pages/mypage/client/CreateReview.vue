<script setup>
import { useReviewStore } from '../../../stores/useReviewStore';
import ProductItem from './components/ProductItem.vue';

const reviewStore = useReviewStore();

</script>

<template>
  <div>
    <div class="review_container">
    <h1>리뷰 작성</h1>
    <div class="line"></div>
    <div class="review_box">
      <ProductItem :product="reviewStore.product"  />


    <div class="input_box">
      <p>제목</p>
      <input type="text">
    </div>
    
    <div  class="input_box">
      <p>내용</p>
      <textarea name="review"></textarea>
    </div>

    <div  class="input_box">
      <p>사진 등록</p>
      <input type="file" name="" id="">
    </div>
  </div>
  </div>
      </div>
</template>

<style scoped>
.review_container > h1 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.line {
  width: 100%;
  height: 2px;
  background-color: #ccc;
}

.review_box {
  width: 100%;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.input_box * {
  width: 100%;
}


</style>