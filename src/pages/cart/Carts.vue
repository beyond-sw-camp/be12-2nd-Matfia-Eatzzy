<template>
  <div class="wrap page_cart">
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
              ><img src="/src/assets/icons/icon_join_step_on.png" alt=""
            /></span>
          </li>
          <li>
            <span>02</span> 주문서작성/결제<span
              ><img src="/src/assets/icons/icon_join_step_off.png" alt=""
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
                      :checked="cartStore.isAllChecked"
                      data-gtm-form-interact-field-id="0"
                      @click="cartStore.allCheck"
                    />
                    <label for="allCheck1" class="check_s"></label>
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
                v-for="cartProduct in cartStore.items"
                :cartProduct="{ ...cartProduct }"
                :key="cartProduct.productId"
              ></CartCard>
            </tbody>
          </table>
          <!-- 장바구니 상품리스트 끝 -->

          <div class="btn_order_box">
            <span class="btn_left_box">
              <button
                type="button"
                class="btn_order_choice_del"
                @click="cartStore.removeSelectedItems"
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
                    총 <strong>{{ cartStore.cartCount }}</strong> 개의 상품금액
                  </p>
                  <p class="price">
                    <strong>{{ cartStore.totalPrice }}</strong
                    >원
                  </p>
                </div>
                <!-- <img
                  src="/src/assets/icons/order_price_total.png"
                  alt="합계"
                /> -->
                <!-- <div>
                  <p>상품할인</p>
                  <p class="price"><strong>3,960</strong>원</p>
                </div>
                <img
                  src="/src/assets/icons/order_price_plus.png"
                  alt="더하기"
                /> -->
                <img
                  src="/src/assets/icons/order_price_plus.png"
                  alt="더하기"
                />
                <div>
                  <p>배송비</p>
                  <p class="price"><strong>4,000</strong>원</p>
                </div>
                <img src="/src/assets/icons/order_price_total.png" alt="합계" />
                <div class="price_total">
                  <p>합계</p>
                  <p class="price">
                    <strong>{{
                      cartStore.checkedTotalPrice + cartStore.deliveryFee
                    }}</strong
                    >원
                  </p>
                </div>
              </div>
            </div>

            <!-- //price_sum_cont -->
          </div>
        </div>

        <div class="order_btn_group">
          <router-link to="/orders">
            <button type="button" class="btn_order_choice_buy">
              선택 상품 주문
            </button>
          </router-link>
          <router-link to="/orders" @click.prevent="handleOrder">
            <button type="button" class="btn_order_whole_buy">
              전체 상품 주문
            </button>
          </router-link>

          <em class="chk_none"
            ><img src="/src/assets/icons/icon_warning_new.png" />주문서
            작성단계에서 할인/적립금 적용을 하실 수 있습니다.</em
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import CartCard from "./CartCard.vue";
import "./../../../src/assets/cart/cart.css";
import { useCartStore } from "../../stores/useCartStore";
import { onMounted } from "vue";
const cartStore = useCartStore();
const router = useRouter();
const handleOrder = async () => {
  try {
    const orderIdx = await cartStore.orderCreate(); // ✅ 주문 요청 실행 후 orderIdx 반환

    if (orderIdx) {
      router.push(`/order/${orderIdx}`); // ✅ 주문 완료 후 해당 주문 상세 페이지로 이동
    } else {
      alert("주문 ID를 받아오지 못했습니다. 다시 시도해주세요.");
    }
  } catch (error) {
    console.error("주문 처리 중 오류 발생:", error);
  }
};
onMounted(async () => {
  await cartStore.getCartProducts();
  initalProductCheckList();
  console.log(cartStore.cartProducts);
  // console.log(cartProductCheckList.value);
});
</script>

<style></style>
