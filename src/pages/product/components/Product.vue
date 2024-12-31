<script setup>
import { useCartStore } from "../../../stores/useCartStore";
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const cartStore = useCartStore();
</script>
<template>
  <div class="list">
    <router-link :to="`/products/${product.id}`" class="img_box">
      <img :src="`${product.imgPath}`" />
    </router-link>
    <div class="info_box">
      <!-- 브랜드명, 상품명 -->
      <div class="item_tit_box css_title_box">
        <span class="css_brand_name">Eatzzy</span>
        <router-link to="/" class="css_prd_name">
          {{ product.name }}
        </router-link>
      </div>
      <!-- //브랜드명, 상품명 -->
      <div class="review_box crema-hide crema-applied" style="display: none">
        <span class="star_back_new">
          <span class="star_new" style="width: 96%"></span>
        </span>
        {{ product.starPoint }} ({{ product.reviewCnt }}개)
      </div>
      <div class="item_money_box css_price_box">
        <div class="css_final">
          <div>
            <strong class="css_purchase">
              <span>{{ product.price }}</span>
              <em>원</em>
            </strong>
          </div>
          <!-- 장바구니 버튼 -->
          <button
            @click="cartStore.openModal"
            type="button"
            href="#optionViewLayer"
            class="n_list_cart btn_add_cart btn_open_layer list_basket_cart"
            title="장바구니"
          ></button>
          <!-- 장바구니 버튼 -->
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.list {
  letter-spacing: -0.05em;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.list .img_box {
  position: relative;
  display: flex;
  border-radius: 0.375rem;
  overflow: hidden;
  width: 100%;
}
.list .img_box img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  object-fit: cover;
}
.list .img_box:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}
.list .info_box {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 0.25rem;
}

.list .css_title_box {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.list .css_brand_name {
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 0.75rem;
  color: #555;
}

.list .css_prd_name {
  font-size: 1rem;
  line-height: 1.3125rem;
  height: 2.5rem;
  overflow: hidden;
  color: #1a1a1a;
}

.list .css_final {
  justify-content: space-between;
  position: relative;
}

.list .css_final {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.list .css_final > div {
  display: flex;
  gap: 0.625rem;
}

.list .css_purchase {
  display: flex;
  align-items: center;
}

.list .css_purchase span {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 150%;
}

.list .css_purchase em {
  font-size: 1rem;
  font-weight: 400;
  line-height: 170%;
  font-style: normal;
}

.list_basket_cart {
  right: 0;
  bottom: 0.3125rem;
  position: relative;
  background: #ff7700;
  border-radius: 0.125rem;
  box-shadow: none;
  margin: 0;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.list_basket_cart:before {
  content: "";
  display: block;
  width: 1.65rem;
  height: 1.65rem;
  background: url(https://thenaum.cdn-nhncommerce.com/data/img/allnew/layout/ncart.svg)
    no-repeat;
}
</style>
