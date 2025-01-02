<template>
  <div id="addCartLayer" class="layer_wrap">
    <!-- <Products  /> -->
    <div
      class="box add_cart_layer"
      style="position: absolute; margin: 0px; top: 211.5px; left: 551px"
    >
      <div class="view">
        <h2>주문하기</h2>
        <div class="scroll_box">
          <p class="success"><strong>결제가 완료되었습니다.</strong><br /></p>
        </div>
        <div class="btn_box">
          <!-- <button @click="cartStore.closeModal" class="btn_cancel">
            <span>취소</span>
          </button> -->
          <router-link to="/mypage/client/orders">
            <button class="btn_confirm btn_move_cart">
              <span @click="orderStore.modal">확인</span>
            </button>
          </router-link>
        </div>
        <button
          @click="orderStore.modal"
          title="닫기"
          class="close layer_close"
          type="button"
        >
          닫기
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useOrderStore } from "../../stores/useOrderStore";

const orderStore = useOrderStore();
</script>

<style>
/* 장바구니 담기 */

/* 장바구니에 담으시겠습니까? */
.layer_wrap {
  /* overflow-y: auto; */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 210;
}

element.style {
  position: absolute;
  margin: 0px;
  top: 211.5px;
  left: 551px;
}

.layer_wrap .box {
  background: #fff;
  border: 2px solid #555;
}

.add_cart_layer,
.add_wish_layer {
  width: 414px;
  min-height: 312px;
}

.layer_wrap .box .view {
  position: relative;
  margin: 14px 20px;
}

.layer_wrap .box .view h2 {
  padding: 0 0 13px;
  border-bottom: 1px solid #999999;
  color: #000;
  font-size: 18px;
  line-height: 1;
}

.layer_wrap .scroll_box {
  overflow-x: hidden;
  overflow-y: auto;
}

.add_cart_layer p.success {
  background: url(https://thenaum.cdn-nhncommerce.com/data/skin/front/moment/img/common/layer/add_cart_success.png)
    no-repeat center top;
}

.add_cart_layer p {
  margin: 30px 0 0;
  padding: 80px 0 0;
  color: #222;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  background: url(https://thenaum.cdn-nhncommerce.com/data/skin/front/moment/img/common/layer/add_cart_success.png)
    no-repeat center top;
}

.layer_wrap .box .view .close {
  display: block;
  position: absolute;
  top: 6px;
  right: 0;
  width: 18px;
  height: 18px;
  text-indent: -9999px;
  background: url(https://thenaum.cdn-nhncommerce.com/data/skin/front/moment/img/btn/layer-close.png)
    no-repeat left top;
}

.add_cart_layer .btn_box,
.add_wish_layer .btn_box {
  padding: 29px 0 0 0;
  text-align: center;
}

.add_cart_layer .btn_cancel,
.add_wish_layer .btn_cancel {
  min-width: 74px;
  padding: 10px 10px 9px 10px;
  border: 1px solid #cccccc;
  color: #3e3d3c;
  background: #ffffff;
  font-weight: bold;
}

.add_cart_layer .btn_confirm,
.add_wish_layer .btn_confirm {
  min-width: 74px;
  padding: 10px 10px 9px 10px;
  margin: 0 0 0 6px;
  border: 1px solid #ff7400;
  color: #ffffff;
  background: #ff7400;
  font-weight: bold;
}

.add_cart_layer .btn_box,
.add_wish_layer .btn_box {
  padding: 29px 0 0 0;
  text-align: center;
}
</style>
