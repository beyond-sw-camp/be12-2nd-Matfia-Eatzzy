<template>
  <div class="wrap">
    <header id="header"></header>
    <div class="location_wrap inner_wrap">
      <div class="location_cont">
        <em><a href="/" class="local_home">HOME</a> &gt; 장바구니</em>
      </div>
    </div>
    <div class="order_wrap">
      <div class="order_tit inner_wrap">
        <h2>장바구니</h2>
        <ol>
          <li class="page_on">
            <span>01</span> 장바구니
            <span
              ><img
                src="https://thenaum.cdn-nhncommerce.com/data/skin/front/moment/img/member/icon_join_step_on.png"
                alt=""
            /></span>
          </li>
          <li>
            <span>02</span> 주문서작성/결제<span
              ><img
                src="https://thenaum.cdn-nhncommerce.com/data/skin/front/moment/img/member/icon_join_step_off.png"
                alt=""
            /></span>
          </li>
          <li><span>03</span> 주문완료</li>
        </ol>
      </div>
      <div class="cart_cont">
        <div class="n_order_table_type inner_wrap">
          <!-- 장바구니 상품리스트 시작 -->
          <table>
            <colgroup>
              <col width="44px" />
              <!-- 체크박스 -->
              <col />
              <!-- 상품명/옵션 -->
              <col style="width: 20%" />
              <!-- 수량 -->
              <col style="width: 10%" />
              <!-- 상품금액 -->
              <col style="width: 13%" />
              <!-- 할인/적립 -->
              <!-- <col style="width: 10%" /> -->
              <!-- 합계금액 -->
              <!-- <col style="width: 10%" /> -->
              <!-- 배송비 -->
            </colgroup>
            <thead>
              <tr>
                <th>
                  <div class="form_element">
                    <input
                      type="checkbox"
                      id="allCheck1"
                      class="gd_select_all_goods"
                      data-target-id="cartSno1_"
                      data-target-form="#frmCart"
                      checked="checked"
                      data-gtm-form-interact-field-id="0"
                    />
                    <label for="allCheck1" class="check_s on"></label>
                  </div>
                </th>
                <th>상품/옵션 정보</th>
                <th>수량</th>
                <th>상품금액</th>
                <!-- <th>할인/적립</th> -->
                <th>합계금액</th>
              </tr>
            </thead>
            <tbody>
              <!-- TODO : emit 와 props 추가 장바구니 체크 리스트 기능 때문 -->
              <CartCard
                v-for="cartProduct in cartStore.cartProducts"
                :cartProduct="cartProduct"
                :key="cartProduct.id"
                v-model:isChecked="findCheckedItem(cartProduct.id).isChecked"
              ></CartCard>
            </tbody>
          </table>
          <!-- 장바구니 상품리스트 끝 -->

          <div class="btn_order_box">
            <span class="btn_left_box">
              <button
                type="button"
                class="btn_order_choice_del"
                onclick="gd_cart_process('cartDelete');"
              >
                선택상품삭제
              </button>
              <button
                type="button"
                class="btn_order_choice_wish"
                onclick="gd_cart_process('cartToWish');"
              >
                선택상품찜
              </button>
              <button
                type="button"
                class="btn_order_choice_wish"
                onclick="gd_cart_estimate_print();"
              >
                견적서출력
              </button>
            </span>
          </div>

          <div class="price_sum">
            <div class="price_sum_cont sum_total_list">
              <div class="price_sum_list">
                <div>
                  <p>
                    총 <strong>{{ cartStore.cartProducts.length }}</strong> 개의
                    상품금액
                  </p>
                  <p class="price">
                    <strong>{{ totalPriceInCarts }}</strong
                    >원
                  </p>
                </div>
                <img
                  src="https://thenaum.cdn-nhncommerce.com/data/skin/front/moment/img/order/order_price_total.png"
                  alt="합계"
                />
                <!-- <div>
                  <p>상품할인</p>
                  <p class="price"><strong>3,960</strong>원</p>
                </div>
                <img
                  src="https://thenaum.cdn-nhncommerce.com/data/skin/front/moment/img/order/order_price_plus.png"
                  alt="더하기"
                />
                <div>
                  <p>배송비</p>
                  <p class="price"><strong>4,000</strong>원</p>
                </div>
                <img
                  src="https://thenaum.cdn-nhncommerce.com/data/skin/front/moment/img/order/order_price_total.png"
                  alt="합계"
                /> -->
                <div class="price_total">
                  <p>합계</p>
                  <p class="price">
                    <strong>{{ totalPriceInCarts }}</strong
                    >원
                  </p>
                </div>
              </div>
            </div>

            <!-- //price_sum_cont -->
          </div>
        </div>

        <div class="order_btn_group">
          <button
            type="button"
            class="btn_order_choice_buy"
            onclick="gd_cart_process('orderSelect');"
          >
            선택 상품 주문
          </button>
          <button
            type="button"
            class="btn_order_whole_buy"
            onclick="gd_order_all();"
          >
            전체 상품 주문
          </button>
          <em class="chk_none"
            ><img
              src="https://thenaum.cdn-nhncommerce.com/data/skin/front/moment/img/icon/etc/icon_warning_new.png"
            />주문서 작성단계에서 할인/적립금 적용을 하실 수 있습니다.</em
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import CartCard from "./CartCard.vue";
import "./../../../src/assets/cart/cart.css";
import { useCartStore } from "../../stores/useCartStore";
import { onMounted } from "vue";
const cartStore = useCartStore();
const cartProductCheckList = ref([]);
const initalProductCheckList = () => {
  cartProductCheckList.value = cartStore.cartProducts.map((product) => ({
    id: product.id,
    isChecked: true,
  }));
};

const findCheckedItem = (id) => {
  // console.log(cartProductCheckList.value);
  // console.log("value[0] ", cartProductCheckList.value[0]);
  // console.log(cartProductCheckList.value[0].isChecked);
  return cartProductCheckList.value.find((item) => item.id == id);
};

const totalPriceInCarts = computed(() => {
  let totalPrice = 0;
  for (const product of cartStore.cartProducts) {
    if (findCheckedItem(product.id).isChecked) totalPrice += product.totalPrice;
  }
  return totalPrice;
});
onMounted(async () => {
  await cartStore.getCartProducts();
  initalProductCheckList();
  // console.log(cartProductCheckList.value);
});
</script>

<style></style>
