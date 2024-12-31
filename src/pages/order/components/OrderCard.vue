<template>
  <tr>
    <td class="td_left">
      <input type="hidden" name="cartSno[]" value="4550128" />
      <input
        type="hidden"
        class="goodsCheck"
        value="1000004896"
        title="x배너 포함 주문시 쿠폰 사용여부 체크하기 위한 goodsNo"
      />
      <div class="pick_add_cont">
        <span class="pick_add_img">
          <router-link :to="`/products/${cartProduct.productId}`"
            ><img
              :src="cartProduct.productImg"
              width="40"
              alt="치즈롤까스(25cm) 1kg (250g*4ea)"
              title="치즈롤까스(25cm) 1kg (250g*4ea)"
              class="middle"
          /></router-link>
        </span>
        <div class="pick_add_info">
          <em>
            <a
              href="../goods/goods_view.php?goodsNo=1000004896"
              class="100won_chk"
              >{{ cartProduct.productName }}</a
            >
          </em>

          <!-- //icon_pick_list -->

          <div class="pick_option_box"></div>

          <div class="pick_option_box"></div>
        </div>
      </div>
      <!-- //pick_add_cont -->

      <!-- //pick_add_list -->
    </td>
    <td class="td_order_amount">
      <div class="order_goods_num">
        <strong>{{ cartProduct.quantity }}</strong>
      </div>
    </td>
    <td>
      <strong class="order_sum_txt time_sale_cost">{{
        cartProduct.price
      }}</strong>
    </td>
    <!-- <td class="td_benefit">
                    <ul class="benefit_list">
                      <li class="benefit_sale">
                        <em>할인</em>
                        <span>상품 <strong>-3,960원</strong></span>
                      </li>
                      <li class="benefit_mileage js_mileage">
                        <em>적립</em>
                        <span>상품 <strong>+150원</strong></span>
                      </li>
                    </ul>
                  </td> -->
    <td>
      <strong class="order_sum_txt">{{ cartProduct.totalPrice }}</strong>
    </td>
    <td class="td_delivery" rowspan="1">
      기본배송비<br />
      4,000원

      <br />
      (택배)
    </td>
  </tr>
</template>

<script setup>
const props = defineProps({
  cartProduct: {
    type: Object,
    required: true,
  },
});
</script>

<style></style>
