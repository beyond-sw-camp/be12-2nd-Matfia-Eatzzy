<template>
  <tr>
    <!-- 상품 정보 -->
    <td class="td_left">
      <input type="hidden" name="cartSno[]" :value="cartProduct.idx" />
      <input
        type="hidden"
        class="goodsCheck"
        :value="cartProduct.productsResponse.idx"
        title="상품 ID"
      />
      <div class="pick_add_cont">
        <!-- 상품 이미지 -->
        <span class="pick_add_img">
          <router-link
            :to="`/products/${cartProduct.productsResponse.productId}`"
          >
            <img
              :src="cartProduct.productsResponse.productImg"
              width="40"
              alt="상품 이미지"
              title="상품 이미지"
              class="middle"
              onerror="this.src='/src/assets/icons/noimage_s.png'"
            />
          </router-link>
        </span>

        <!-- 상품명 -->
        <div class="pick_add_info">
          <em>
            <router-link
              :to="`/products/${cartProduct.productsResponse.productId}`"
            >
              {{ cartProduct.productsResponse.name }}
            </router-link>
          </em>
        </div>
      </div>
    </td>

    <!-- 주문 수량 -->
    <td class="td_order_amount">
      <div class="order_goods_num">
        <strong>{{ cartProduct.quantity }}</strong>
      </div>
    </td>

    <!-- 개별 상품 가격 -->
    <td>
      <strong class="order_sum_txt time_sale_cost">
        {{ cartProduct.price.toLocaleString() }}원
      </strong>
    </td>

    <!-- 총 가격 (수량 * 개별 가격) -->
    <td>
      <strong class="order_sum_txt">
        {{ (cartProduct.price * cartProduct.quantity).toLocaleString() }}원
      </strong>
    </td>

    <!-- 배송비 -->
    <td class="td_delivery" rowspan="1">
      기본배송비<br />
      4,000원
      <br />
      (택배)
    </td>
  </tr>
</template>

<script setup>
defineProps({
  cartProduct: {
    type: Object,
    required: true,
  },
});
</script>

<style></style>
