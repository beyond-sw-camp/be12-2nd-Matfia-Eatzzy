<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useProductsStore } from "../../../stores/useProductsStore";
import { formatPrice } from "../../../utils/formatPrice";

const router = useRouter();
const productList = ref([]);

const productsStore = useProductsStore();

const getSellerProduct = async () => {
  const result = await productsStore.getSellerProduct();
  productList.value = result.products;
  console.log(result.products);
};

const modifyProduct = (product) => {
  console.log(product);
  productsStore.setModifyProduct(product);
  router.push("/mypage/seller/product/modify");
};

const deleteProduct = (event) => {
  event.preventDefault();
  const result = confirm("상품을 삭제하시겠습니까?");
  if (result) {
    alert("상품이 삭제되었습니다.");
  }
};

onMounted(() => {
  getSellerProduct();
});
</script>

<template>
  <div class="product_container">
    <h1>내 상품 리스트</h1>
    <div class="grid header">
      <div>상품명</div>
      <div>상품금액</div>
      <div>재고</div>
      <div>카테고리</div>
      <div>수정/삭제</div>
    </div>

    <div v-for="product in productList" class="grid product_item">
      <router-link :to="`/products/${product.idx}`" class="product_name">
        <img :src="product.image" alt="상품 이미지" />
        <p>
          {{ product.name }}
        </p>
      </router-link>
      <p>{{ formatPrice(product.price) }}원</p>
      <p>{{ product.stock }}개</p>
      <p>{{ product.category }}</p>
      <div class="btn_box">
        <button @click="modifyProduct(product)" class="btn edit">
          수정하기
        </button>
        <button @click="deleteProduct" class="btn delete">삭제하기</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product_container {
  width: 100%;
}

.product_container > h1 {
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
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  gap: 1rem;
  width: 100%;
}

.product_item {
  padding: 0.7rem 0;
  border-bottom: 1px solid #e6e6e6;
}

.product_name {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 0 0.5rem;
}
.product_name:hover {
  text-decoration: underline;
}

.product_name > img {
  width: 4.5rem;
  aspect-ratio: 1 / 1;
  border-radius: 0.5rem;
  object-fit: cover;
}

.product_name > p {
  font-weight: 700;
}

.product_item > p,
.btn_box {
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn_box {
  flex-direction: column;
  gap: 0.5rem;
}

.btn {
  padding: 0.15rem 0.5rem;
  font-size: 0.875rem;
  border: 1px solid #ccc;
  border-radius: 0.3rem;
  background-color: white;
  cursor: pointer;
}

.btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.btn.delete {
  color: red;
}

.btn_delete:hover {
  background-color: #ffe5e5;
}
</style>
