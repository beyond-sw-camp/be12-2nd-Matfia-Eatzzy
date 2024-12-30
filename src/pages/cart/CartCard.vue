<template>
  <tr>
    <td class="td_chk">
      <div class="form_element">
        <input
          @click="onClick"
          type="checkbox"
          :id="`cartSno1_${cartProduct.id}`"
          name="cartSno[]"
          value="4556515"
          checked="checked"
          data-price="31600"
          data-mileage="310"
          data-goodsdc="0"
          data-memberdc="0"
          data-coupondc="0"
          data-possible="y"
          data-goods-key="0"
          data-goods-no="1000016025"
          data-goods-nm="패션후르츠 샤베트 300ml (50ml x 6ea)_겨울에도 식을줄 모르는 디저트샤벳"
          data-option-nm=""
          data-fixed-sales="option"
          data-sales-unit="1"
          data-fixed-order-cnt="option"
          data-min-order-cnt="1"
          data-max-order-cnt="0"
          data-default-goods-cnt="4"
          data-f-firstsample="n"
          class="foo_firstSampleCheck"
        />
        <label :for="`cartSno1_${cartProduct.id}`" class="check_s on"></label>
      </div>
    </td>
    <td class="td_left">
      <input type="hidden" name="cartSno[]" value="4550128" />
      <input
        type="hidden"
        class="goodsCheck"
        value="1000004896"
        title="x배너 포함 주문시 쿠폰 사용여부 체크하기 위한 goodsNo"
      />
      <div class="pick_add_cont">
        <img
          src="https://thenaum.cdn-nhncommerce.com/data/skin/front/moment/img/common/layer/btn_layer_close.png"
          class="cart_delete"
          data-cart-sno="4556515"
        />

        <span class="pick_add_img">
          <router-link :to="`/products/${cartProduct.id}`">
            <img
              src="https://godomall.speedycdn.net/ec5d2a1c8483712efb957784c858b320/goods/1000016025/image/list/1000016025_list_027.jpg"
              width="40"
              alt="패션후르츠 샤베트 300ml (50ml x 6ea)_겨울에도 식을줄 모르는 디저트샤벳"
              title="패션후르츠 샤베트 300ml (50ml x 6ea)_겨울에도 식을줄 모르는 디저트샤벳"
              class="middle"
            />
          </router-link>
        </span>
        <div class="pick_add_info">
          <em>
            <a href="../goods/goods_view.php?goodsNo=1000016025">{{
              cartProduct.name
            }}</a>
          </em>

          <!-- //icon_pick_list -->
        </div>
      </div>
      <!-- //pick_add_cont -->

      <!-- //pick_add_list -->
    </td>
    <td class="td_order_amount">
      <div class="order_goods_num">
        <div>
          <span class="count_box">
            <button class="minus" value @click="substactCart"></button>
            <span class="min_order_cnt" style="display: none">1</span>
            <input type="hidden" name="sale_unit" value="1" />
            <span class="stock_cnt" style="display: none">0</span>
            <span class="change_loading" style="display: none"></span>
            <input
              type="text"
              name="goodsCnt[]"
              class="goodsCnt"
              id="_goodsCnt_4556515"
              :value="productCnt"
            />
            <button
              type="button"
              class="plus"
              value=""
              @click="addCart"
            ></button>
            <span class="max_order_cnt" style="display: none">0</span>
          </span>
          <router-link to="/carts">
            <!-- <span v-if="isClicked" class="cart_go" data-cart-sno="4556515"
              >수량변경</span
            > -->
          </router-link>
        </div>
      </div>
    </td>
    <td>
      <strong class="order_sum_txt time_sale_cost">
        {{ cartProduct.price }}
      </strong>
    </td>
    <td>
      <strong class="order_sum_txt">
        {{ totalPrice }}
      </strong>
    </td>
  </tr>
</template>

<script setup>
import { ref, computed } from "vue";
// import { useCartStore } from "../../stores/useCartStore";
import { useCartStore } from "../../stores/useCartStore";

const cartStore = useCartStore();

const props = defineProps({
  cartProduct: {
    type: Object,
    required: true,
  },
  isChecked: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(["update:isChecked", "update:cartProduct"]);
const onClick = () => {
  console.log(!props.isChecked);
  emit("update:isChecked", !props.isChecked);
};
const totalPrice = computed(() => {
  const price = props.cartProduct?.price || 0; // 가격이 없을 경우 기본값 0
  return productCnt.value * price;
});
const productCnt = ref(props.cartProduct.quantity);
const addCart = () => {
  productCnt.value = productCnt.value + 1;
  const newQuantity = props.cartProduct.quantity + 1;
  emit("update:cartProduct", { ...props.cartProduct, quantity: newQuantity });
  console.log(props.cartProduct);
};
const substactCart = () => {
  if (productCnt.value == 1) {
    alert("상품은 1개 이상 장바구니에 담을 수 있습니다.");
    return;
  } else {
    productCnt.value = productCnt.value - 1;
    const newQuantity = props.cartProduct.quantity - 1;
    emit("update:cartProduct", { ...props.cartProduct, quantity: newQuantity });
  }
};
</script>

<style></style>
