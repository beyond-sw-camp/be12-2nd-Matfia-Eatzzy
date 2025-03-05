<template>
  <div class="container page_product">
    <div class="main">
      <h1>밀키트</h1>
      <BigCategory />
      <SmallCategory />
      <div class="order_box">
        <ul class="orderby">
          <li>
            <a href="" class="orderby_list active">좋아요순</a>
          </li>
          <li>
            <a href="" class="orderby_list">평점순</a>
          </li>
          <li>
            <a href="" class="orderby_list">리뷰 많은 순</a>
          </li>
        </ul>
      </div>
      <div class="store_list">
        <Product v-for="product of productsStore.products" :product="product" />
      </div>
      <CartModal v-if="cartStore.isMadal"></CartModal>
    </div>
  </div>
</template>

<script setup>
import "../../assets/products/products.css";
import Product from "./components/Product.vue";
import BigCategory from "../store/components/BigCategory.vue";
import { useProductsStore } from "../../stores/useProductsStore";
import { onMounted } from "vue";
import CartModal from "../cart/CartModal.vue";
import { useCartStore } from "../../stores/useCartStore";

const productsStore = useProductsStore();
const cartStore = useCartStore();
onMounted(async () => {
  await productsStore.getProductsList();
});
</script>

<style lang="scss" scoped></style>
