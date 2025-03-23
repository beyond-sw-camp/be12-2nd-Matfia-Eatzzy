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
import { useLoadingStore } from "../../stores/useLoadingStore";

const storesStore = useStoresStore();
const productStore = useProductsStore();
const categoryStore = useCategoryStore();
const loadingStore = useLoadingStore();
const cartStore = useCartStore();

onMounted(async () => {
  loadingStore.startLoading();
  await storesStore.getStoreBestList();
  await productStore.getProductBestList();
  loadingStore.stopLoading();
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
      <div v-if="loadingStore.isLoading" class="spinner_box">
        <VueSpinner size="30" color="#ff7400" />
      </div>
      <div v-else class="best_goods_wrap">
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
        </div>
      </div>
    </section>
    <!-- 밀키트 -->
    <section>
      <div class="head_title_wrap">
        <div class="s_title">집에서도 경험하는 미식</div>
        <div class="b_title">밀키트 베스트</div>
      </div>
      <div v-if="loadingStore.isLoading" class="spinner_box">
        <VueSpinner size="30" color="#ff7400" />
      </div>
      <div v-else class="product-grid-6">
        <Products
          v-for="product of productStore.productsBest"
          :key="product.idx"
          :product="product"
        />
      </div>
    </section>
    <CartModal v-if="cartStore.isMadal"></CartModal>
  </div>
</template>

<style scoped>
.spinner_box {
  width: 4rem;
  height: 5rem;
  margin: 5rem auto;
}

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
  background: url("/src/assets/icons/main_img.jpeg") no-repeat center 60%;
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
  width: 100%;
  gap: 2.5rem 1.5rem;
  letter-spacing: -0.05em;
  flex-direction: column;
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
  background: url("/src/assets/icons/star_fill.svg") no-repeat;
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
