<script setup>
import { ref, reactive, onMounted } from "vue";
import { useProductsStore } from "../../stores/useProductsStore";
import { useStoresStore } from "../../stores/useStoresStore";
import { useCategoryStore } from "../../stores/useCategoryStore";

import Products from "../product/components/Product.vue";
import StoreCard from "../store/components/StoreCard.vue";
import BigCategory from "../store/components/BigCategory.vue";
import CartModal from "../cart/CartModal.vue";
import { useCartStore } from "../../stores/useCartStore";

const storesStore = useStoresStore();
const productStore = useProductsStore();
const categoryStore = useCategoryStore();
const cartStore = useCartStore();
onMounted(async () => {
  await storesStore.getStoreBestList();
});
onMounted(async () => {
  await productStore.getProductBestList();
});
</script>

<template>
  <div class="inner_wrap">
    <div class="visual"></div>
    <!-- 베스트 -->
    <section>
      <div class="head_title_wrap">
        <div class="s_title">뭘 좋아할 지 몰라 다 준비했어!</div>
        <div class="b_title">카테고리별 베스트</div>
      </div>
      <div class="best_goods_wrap">
        <BigCategory />
        <div class="product-grid-6">
          <StoreCard
            v-for="store in categoryStore.bigCate.name === '전체'
              ? storesStore.stores.slice(0, 6)
              : storesStore.stores
                  .filter(
                    (store) => store.category === categoryStore.bigCate.name
                  )
                  .slice(0, 6)"
            :key="store.id"
            :store="store"
          />
          <Products
            v-for="(product, index) in ProductList"
            :product="product"
            :index="index"
          />
        </div>
      </div>
    </section>
    <!-- 밀키트 -->
    <section>
      <div class="head_title_wrap">
        <div class="s_title">집에서도 경험하는 미식</div>
        <div class="b_title">밀키트 베스트</div>
      </div>
      <div class="product-grid-6">
        <Products
          v-for="product of productStore.productsBest"
          :key="product.id"
          :product="product"
        />
      </div>
    </section>
    <CartModal v-if="cartStore.isMadal"></CartModal>
  </div>
</template>

<style scoped>
section {
  padding: 3.75rem 0;
}

section:not(:last-child) {
  border-bottom: 0.0625rem solid #eee;
}

.head_title_wrap {
  position: relative;
  width: 100%;
  margin: 0 auto;
}

.head_title_wrap .s_title {
  font-size: 1.25rem;
  line-height: 2rem;
  letter-spacing: -0.02em;
  font-weight: 400;
}

.head_title_wrap .b_title {
  font-size: 2rem;
  line-height: 2.1875rem;
  letter-spacing: -0.02em;
  font-weight: 600;
  margin: 0.625rem 0 1.875rem 0;
  display: flex;
  justify-content: space-between;
}

.visual {
  background: url(/src/assets/icons/main_img.jpeg) no-repeat center 60%;
  border-radius: 0 0 1.25rem 1.25rem;
  color: #fff;
  box-sizing: border-box;
  background-size: cover;
  height: 12.5rem;
}

.best_goods_wrap {
  width: 100%;
  margin: 0 auto;
}

.product-grid-6 {
  grid-template-columns: repeat(6, 1fr);
  display: grid;
  gap: 2.5rem 1.5rem;
  width: 100%;
  letter-spacing: -0.05em;
  flex-direction: column;
  width: 100%;
}

.crema-hide.crema-applied {
  display: none !important;
}

.crema-show {
  font-size: 0.75rem;
  font-family: "Open Sans", "Noto Sans KR", sans-serif;
  display: flex;
  align-items: center;
  gap: 0.125rem;
  letter-spacing: -0.01em;
}

.crema-show:before {
  content: "";
  display: block;
  width: 1.125rem;
  height: 1.125rem;
  background: url(https://thenaum.cdn-nhncommerce.com/data/img/allnew/layout/star_fill.svg)
    no-repeat;
  background-size: contain;
}
.crema-product-reviews-score {
  font-size: 0.875rem;
  font-weight: 500;
  color: #1a1a1a;
}

.crema_product_reviews_score__container {
  display: inline-block;
  font-family: inherit;
}

.crema-product-reviews-count {
  color: #595959;
}

.item_money_box {
  display: flex;
  flex-direction: column;
}

@media (max-width: 960px) {
  .product-grid-6 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 500px) {
  .product-grid-6 {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
