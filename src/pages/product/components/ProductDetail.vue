<template>
  <div class="wrap">
    <header id="header"></header>

    <div class="container">
      <div class="main">
        <div class="item_cont top_summary">
          <!-- 상품상단 왼쪽 -->
          <div class="left_cont">
            <div class="item_content_img">
              <span class="img_photo_big">
                <img
                  :src="`${productStore.product.imagePath}`"
                  width="500"
                  alt="패션후르츠 샤베트 300ml (50ml x 6ea)_겨울에도 식을줄 모르는 디저트샤벳"
                  title="패션후르츠 샤베트 300ml (50ml x 6ea)_겨울에도 식을줄 모르는 디저트샤벳"
                  class="middle"
                  onerror="this.src='/src/assets/icons/noimage.png'"
                />
                <span class="img_brand_icon"></span>
              </span>
            </div>
            <!-- 상품리뷰 -->
            <dl class="review">
              <dt class="fc3">상품리뷰</dt>
              <dd class="star_dd">
                <div class="star_repeat">
                  <div class="star_cnt" style="width: 0px"></div>
                </div>
                <span
                  class="crema-product-reviews-score per crema-applied"
                  data-product-code="1000016025"
                  data-format="{{{score}}}"
                  data-star-style="multiple"
                  data-install-method="hardcoded"
                  data-observed-install="false"
                  data-applied-widgets='[".crema-product-reviews-score"]'
                  ><div
                    class="crema_product_reviews_score__container"
                    style="display: inline-block; font-family: inherit"
                  >
                    {{ productStore.product.startPoint }}
                  </div></span
                >
                <span
                  class="crema-product-reviews-count cnt crema-applied"
                  data-product-code="1000016025"
                  data-format="({{{count}}}건)"
                  data-install-method="hardcoded"
                  data-observed-install="false"
                  data-applied-widgets='[".crema-product-reviews-count"]'
                  >{{ productStore.product.reviewCnt }}</span
                >
              </dd>
            </dl>
            <!-- //상품리뷰 -->
          </div>
          <!-- //상품상단 왼쪽 -->
          <!-- 상품상단 오른쪽 -->
          <div class="right_cont">
            <!-- 상품명 -->
            <div class="prd_title">
              <h4 class="fc1 add_info">
                🎆유명 호프집 인기급상승 디저트! 상큼 터지는 달콤한 샤벳
                디저트🍊
              </h4>
              <h1 class="goods_name">
                <!-- 패션후르츠 샤베트 300ml (50ml x 6ea)_겨울에도 식을줄 모르는
                디저트샤벳 -->
                {{ productStore.product.productName }}
              </h1>
              <div class="short_des"></div>
            </div>
            <!-- //상품명 -->
            <!-- 상품 상세정보 -->
            <form
              name="frmView"
              id="frmView"
              method="post"
              action="../order/cart_ps.php"
              target=""
            >
              <input type="hidden" name="mode" value="cartIn" />
              <input type="hidden" name="scmNo" value="1" />
              <input type="hidden" name="cartMode" value="" />
              <input type="hidden" name="set_goods_price" value="7900" />
              <input
                type="hidden"
                id="set_goods_fixedPrice"
                name="set_goods_fixedPrice"
                value="7900.00"
              />
              <input type="hidden" name="set_goods_mileage" value="0" />
              <input type="hidden" name="set_goods_stock" value="∞" />
              <input type="hidden" name="set_coupon_dc_price" value="7900" />
              <input
                type="hidden"
                id="set_goods_total_price"
                name="set_goods_total_price"
                value="0"
              />
              <input
                type="hidden"
                id="set_option_price"
                name="set_option_price"
                value="0"
              />
              <input
                type="hidden"
                id="set_option_text_price"
                name="set_option_text_price"
                value="0"
              />
              <input
                type="hidden"
                id="set_add_goods_price"
                name="set_add_goods_price"
                value="0"
              />
              <input
                type="hidden"
                id="total_price_fixed"
                name="set_total_price"
                value="7900"
              />
              <input type="hidden" name="mileageFl" value="c" />
              <input type="hidden" name="mileageGoods" value="0.00" />
              <input type="hidden" name="mileageGoodsUnit" value="percent" />
              <input type="hidden" name="goodsDiscountFl" value="n" />
              <input type="hidden" name="goodsDiscount" value="0.00" />
              <input type="hidden" name="goodsDiscountUnit" value="percent" />
              <input type="hidden" name="taxFreeFl" value="t" />
              <input type="hidden" name="taxPercent" value="10.0" />
              <input type="hidden" name="scmNo" value="1" />
              <input type="hidden" name="brandCd" value="007" />
              <input type="hidden" name="cateCd" value="213" />
              <input type="hidden" id="set_dc_price" value="0" />
              <input type="hidden" id="goodsOptionCnt" value="1" />
              <input type="hidden" name="optionFl" value="n" />
              <input type="hidden" name="goodsDiscountGroup" value="all" />
              <input type="hidden" name="useBundleGoods" value="1" />

              <!-- 상단 가격 정보 -->
              <div class="price_top">
                <div class="price_wrap">
                  <!-- 할인시 정가표시 -->
                  <!-- //할인시 정가표시 -->
                  <div class="single_wrap">
                    <!-- 할인율 -->

                    <span class="single"
                      ><span class="price"
                        ><strong class="single_price">
                          <!-- 7,900 -->
                          {{ productStore.product.price }}
                        </strong></span
                      >원</span
                    >
                  </div>
                </div>
                <div class="icon">
                  <span class="icon_card"><!-- 카드아이콘 --></span>
                  <span class="icon_share"><!-- 공유아이콘 --></span>
                </div>
              </div>
              <!-- //상단 가격 정보 -->
              <div class="info">
                <!-- 제조일자,유통기한 -->
                <dl class="exp_date">
                  <dt class="fc3">제조일자<br />유통(소비)기한</dt>
                  <dd class="fc3">
                    <p>
                      2024년 04월 27일 <br />
                      2026년 04월 26일
                    </p>
                    <span class="pop_btn js_pop_btn" data-type="exp">
                      소비기한 표시제
                    </span>
                    <!-- 소비기한 레이어 팝업 -->
                    <div class="exp pop_wrap" style="display: none">
                      <div class="pop_title">
                        <h6 class="title">소비기한 표시제</h6>
                        <span class="pop_close_btn"></span>
                      </div>
                      <div class="pop_cont">
                        <p class="des">
                          소비기한 표시제 시행으로 식품에 표기하는
                          <span>'유통기한'이 '소비기한' 으로 변경</span>되며,
                          상품에 따라 순차적으로 적용됩니다.
                        </p>
                        <div class="exp_info">
                          <p>
                            <strong>
                              <!-- 유통기한 -->
                              {{ productStore.product.expirationDate }}
                            </strong>
                            : 소비자에게 판매가 허용되는 기한
                          </p>
                          <p>
                            <strong>소비기한</strong> : 섭취하여도 안전에 이상이
                            없는 기한
                          </p>
                        </div>
                        <p class="des_small">
                          2023년은 계도기간으로 현재 유통기한 또는 소비기한으로
                          병행해서 사용될 수 있으니 자세한 내용은 하단
                          상세고시에서 확인 가능합니다.
                        </p>
                      </div>
                    </div>
                    <!-- //소비기한 레이어 팝업 -->
                  </dd>
                </dl>
                <!-- //제조일자유통기한 -->
                <!-- 보관방법 -->
                <dl>
                  <dt class="fc3">보관방법</dt>
                  <dd class="fc3">냉동</dd>
                </dl>
                <!-- //보관방법 -->
                <!-- 적립금 -->
                <dl class="mileage">
                  <dt>적립금</dt>
                  <dd>
                    최대 <span class="total_benefit_mileage">1,070</span>원
                    적립<span
                      class="benefit_pop_btn js_pop_btn"
                      data-type="benefit"
                    ></span>

                    <div class="benefit pop_wrap" style="display: none">
                      <div class="pop_title">
                        <h6 class="title">적립금 안내</h6>
                        <span class="pop_close_btn"></span>
                      </div>
                      <div class="pop_cont">
                        <div class="benefit_wrap">
                          <dl>
                            <dt>구매 적립금</dt>
                            <dd>
                              <span class="purchase_benefit mileage">70</span>원
                            </dd>
                          </dl>
                          <dl>
                            <dt>
                              리뷰 적립금
                              <span class="sub">(요리사진+글 30자 이상)</span>
                            </dt>
                            <dd>
                              최대
                              <span class="mileage review_mileage">1,000</span
                              >원
                            </dd>
                          </dl>
                          <dl class="pop_total_benefit">
                            <dt>예상 적립금</dt>
                            <dd>
                              <span class="total_benefit_mileage">1,070</span>원
                            </dd>
                          </dl>
                        </div>
                        <ul class="note">
                          <li>푸딩팩토리 회원에게만 적립</li>
                          <li>기본 적립금은 구매확정 시 적립</li>
                          <li>리뷰 작성은 구매 확정 이후 15일 내에만 가능</li>
                          <li>반품 시 적립된 포인트는 자동 회수</li>
                          <li>
                            자세한 리뷰 적립 금액은
                            <span class="red review_pop_open"
                              >싱품리뷰 &gt; 리뷰 적립금 혜택</span
                            >을 확인하시기 바랍니다.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </dd>
                </dl>
                <!-- //적립금 -->
                <!-- 배송정보 -->
                <dl class="delivery">
                  <dt>
                    배송정보<span class="benefit_pop_btn delivery_icon"></span>
                  </dt>
                  <dd>
                    <p class="f2"></p>
                    <div>
                      <span class="fc1 delivery_info1_1 css_date"
                        >지금주문하면 12/19(목)</span
                      ><span class="fc3 delivery_info1_1"> 출고예정</span>
                    </div>
                    <p></p>
                    <div class="btn_wrap">
                      <span class="pop_btn js_pop_btn" data-type="delivery">
                        <!--긴급공지-->
                        비식품 및 도서산간 배송안내
                      </span>
                      <span
                        class="pop_btn js_pop_btn"
                        data-type="delivery_calendar_layer"
                        >예상 배송 일정</span
                      >
                    </div>
                    <!-- 배송안내 레이어 팝업 -->
                    <div class="delivery pop_wrap" style="display: none">
                      <div class="pop_title">
                        <h6 class="title">비식품 및 도서산간 배송안내</h6>
                        <span class="pop_close_btn"></span>
                      </div>
                      <div class="pop_cont">
                        <!--								<p>최근 택배 물량이 폭증하여 특히 물량이 집중되는 <b style="color: #e40000">월요일의 경우 낮 2시까지 주문하시더라도 당일 출고가 어려울 수 있습니다.</b><br>택배사의 물량 제한으로 부득이하게 배송기간이 1~2일 정도 더 소요될 수 있으니 고객님들의 너그러운 이해 부탁드립니다.</p>-->
                        <p>
                          · 제주/도서산간 지역은 선박스케쥴과 해당지역 최단
                          배송기간을 위해 <u class="fc1">월화수목</u>에만
                          출고됩니다.
                        </p>
                        <p>
                          · 비식품의 경우 업체 설치유무에 따라 배송일정이
                          상이합니다.
                        </p>
                      </div>
                    </div>
                    <!-- //배송안내 레이어 팝업 -->

                    <!--//배송정보 달력-->
                    <div
                      class="delivery_calendar_layer pop_wrap"
                      style="display: none"
                    >
                      <div class="pop_title">
                        <h6 class="title">예상 배송 일정</h6>
                        <span class="pop_close_btn"></span>
                      </div>
                      <div class="pop_cont">
                        <table class="delivery_calendar">
                          <thead>
                            <tr>
                              <th>일</th>
                              <th>월</th>
                              <th>화</th>
                              <th>수</th>
                              <th>목</th>
                              <th>금</th>
                              <th>토</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td class="">
                                <span class="today">12-18</span
                                ><span class="blue">오후 2시</span>
                              </td>
                              <td class="">
                                <span class="">12-19</span
                                ><span class="blue">오후 2시</span>
                              </td>
                              <td class="">
                                <span class="">12-20</span
                                ><span class="blue">오후 2시</span>
                              </td>
                              <td class="">
                                <span class="">12-21</span
                                ><span class="red">X</span>
                              </td>
                            </tr>
                            <tr>
                              <td class="">
                                <span class="">12-22</span
                                ><span class="red">X</span>
                              </td>
                              <td class="">
                                <span class="">12-23</span
                                ><span class="blue">오후 2시</span>
                              </td>
                              <td class="">
                                <span class="">12-24</span
                                ><span class="blue">오후 2시</span>
                              </td>
                              <td class="">
                                <span class="">12-25</span
                                ><span class="blue">오후 2시</span>
                              </td>
                              <td class="">
                                <span class="">12-26</span
                                ><span class="blue">오후 2시</span>
                              </td>
                              <td class="">
                                <span class="">12-27</span
                                ><span class="blue">오후 2시</span>
                              </td>
                              <td class="">
                                <span class="">12-28</span
                                ><span class="red">X</span>
                              </td>
                            </tr>
                            <tr>
                              <td class="">
                                <span class="">12-29</span
                                ><span class="red">X</span>
                              </td>
                              <td class="">
                                <span class="">12-30</span
                                ><span class="blue">오후 2시</span>
                              </td>
                              <td class="">
                                <span class="">12-31</span
                                ><span class="blue">오후 2시</span>
                              </td>
                              <td class="">
                                <span class="">01-01</span
                                ><span class="blue">오후 2시</span>
                              </td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                          </tbody>
                        </table>
                        <p class="des">
                          ※ 위 달력은
                          <span class="red"
                            >예상 배송 일정으로 상황에 따라 변동될 수 있으니
                            참고용으로 확인</span
                          >해주시기 바랍니다.
                        </p>
                        <p class="des">
                          ※ 제주/도서산간을 제외한 일반 지역의 예상 배송
                          일정입니다.
                        </p>
                      </div>
                    </div>
                  </dd>
                </dl>
                <!-- //배송정보 -->
                <!-- 구매수량 -->
                <dl>
                  <dt>구매수량</dt>
                  <dd>
                    <div class="change_btn">
                      <span class="count">
                        <span class="goods_qtycs">
                          <button
                            type="button"
                            class="down goods_cnt"
                            title="감소"
                            value="dn^|^0"
                            id="tMinusBtn"
                            @click="substactCart"
                          >
                            감소
                          </button>
                          <!--<input type="text" name="goodsCnt[]" class="goodsCnt_0" title="수량" value="1" data-min-order="1" data-key="0" data-value="1" data-stock="0" data-max-order="0" data-sales-unit="1" data-stock-fl="n" onchange="goodsViewController.input_count_change(this, '1');return false;" />-->
                          <input
                            type="text"
                            name="goodsCnt[]"
                            class="goodsCnt_0"
                            title="수량"
                            v-model.number="productCnt"
                            data-min-order="1"
                            data-key="0"
                            data-value="1"
                            data-stock="0"
                            data-max-order="0"
                            data-sales-unit="1"
                            data-stock-fl="n"
                          />
                          <button
                            type="button"
                            class="up goods_cnt"
                            title="증가"
                            value="up^|^0"
                            id="tPlusBtn"
                            @click="addCart"
                          >
                            증가
                          </button>
                        </span>
                      </span>
                    </div>
                  </dd>
                </dl>
                <!-- //구매수량 -->

                <!--  -->
                <div class="dry_ice">
                  <a
                    href="/goods/goods_view.php?goodsNo=1000000238"
                    class="img"
                  >
                    드라이 아이스 추가 구매
                  </a>
                  <div class="text">
                    <strong
                      ><a href="/goods/goods_view.php?goodsNo=1000000238"
                        >더운 여름 날씨에 녹을까 걱정되신다면<br />
                        드라이아이스를 추가해보세요</a
                      ></strong
                    >
                    <p>(냉동 상품 전용 / 7만원당 1개 추가 권장)</p>
                    <button
                      type="button"
                      href="#optionViewLayer"
                      class="btn_add_cart_relation btn_open_layer"
                      data-mode="cartIn"
                      data-goods-no="1000000238"
                      @click="cartStore.addCart()"
                    >
                      장바구니
                    </button>
                  </div>
                </div>
                <!--  -->
              </div>

              <!-- //상품 상세정보 -->
              <div class="total_wrap">
                <!-- 최종 가격 -->
                <div class="total_price_wrap">
                  <span>총 </span
                  ><strong class="total_price">
                    {{ productStore.product.price * productCnt }}</strong
                  ><span>원</span>
                </div>
                <!-- //최종 가격 -->
              </div>
              <!-- 상품 가격정보 일반case -->
              <div class="item_content_right_price" style="display: none">
                <div class="item_content_right_price_left">
                  <div class="item_content_right_price_left_box">
                    <dl>
                      <dt class="fc2 f_l">판매가</dt>
                      <dd class="fc3 f_r"><del>7,900</del><span>원</span></dd>
                    </dl>
                    <dl>
                      <dt class="fc2 f_l"><!-- 일반회원등급명 -->일반회원가</dt>
                      <dd class="fc1 f_r">7,900<span>원</span></dd>
                    </dl>
                  </div>
                  <table
                    class="option_display_area"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    style="display: none"
                  >
                    <colgroup>
                      <col width="330px" />
                      <col />
                      <col width="80px" />
                      <col width="40px" />
                    </colgroup>
                    <tbody id="option_display_item_0">
                      <tr class="check optionKey_0">
                        <td class="cart_prdt_name">
                          <input
                            type="hidden"
                            name="goodsNo[]"
                            value="1000016025"
                          />
                          <input
                            type="hidden"
                            name="optionSno[]"
                            value="26350"
                          />
                          <input
                            type="hidden"
                            name="goodsPriceSum[]"
                            value="7900"
                          />
                          <input
                            type="hidden"
                            name="addGoodsPriceSum[]"
                            value="0"
                          />
                          <input
                            type="hidden"
                            name="couponApplyNo[]"
                            value=""
                          />
                          <input
                            type="hidden"
                            name="couponSalePriceSum[]"
                            value=""
                          />
                          <input
                            type="hidden"
                            name="couponAddPriceSum[]"
                            value=""
                          />
                          <div class="cart_tit_box">
                            <strong class="cart_tit">
                              <span
                                >패션후르츠 샤베트 300ml (50ml x 6ea)_겨울에도
                                식을줄 모르는 디저트샤벳</span
                              >

                              <span id="option_text_display_0"></span>
                            </strong>
                          </div>
                          <!-- //cart_tit_box -->
                        </td>
                        <!-- //cart_prdt_name -->
                        <td class="item_choice_price">
                          <input
                            type="hidden"
                            name="optionPriceSum[]"
                            value="0"
                          />
                          <input
                            type="hidden"
                            name="option_price_0"
                            value="0.00"
                          />
                          <strong class="option_price_display_0">7,900</strong
                          >원
                        </td>
                        <!-- //item_choice_price -->
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="buy_mileage fc3">
                    구매적립금
                    <span class="total_benefit_mileage fc1">1,070</span>
                  </div>
                </div>
                <div class="item_content_right_price_right">
                  <dl>
                    <dt class="fc1">총 합계</dt>
                    <dd class="fc1">
                      <strong class="total_price"> 7,900</strong><span>원</span>
                    </dd>
                  </dl>
                </div>
              </div>
              <!-- //상품 가격정보 일반case -->
              <!-- //상품 상세정보 -->

              <input type="hidden" name="deliveryCollectFl" value="pre" />
            </form>
            <!-- 상품 주문버튼 -->
            <div class="btn_choice_box">
              <!-- <button
                  class="btn_add_wish btn_buy_wish fc1"
                  id="wishBtn"
                  onclick="hdbAddToWishList();"
                >
                  찜
                </button> -->
              <button
                @click="addToCart"
                class="btn_add_cart btn_buy_cart bc2 fc5"
                id="cartBtn"
              >
                장바구니
              </button>
              <router-link
                to="/order"
                class="btn_add_order btn_buy_order bc1 fc5"
                >바로구매</router-link
              >
            </div>
            <!-- //상품 주문버튼 -->
            <div class="naver_sample"></div>
          </div>
          <!-- //상품상단 오른쪽 -->
        </div>
        <ul class="submenu_list">
          <li
            class="product_tab_item"
            @click="changeTab('description')"
            :class="{ picked: productStore.productTab === 'description' }"
            data-target="intro_box"
          >
            소개
          </li>
          <li
            class="product_tab_item"
            @click="changeTab('review')"
            :class="{ picked: productStore.productTab === 'review' }"
            data-target="review_box"
          >
            리뷰
          </li>
          <!-- <li
            class="submenu_item"
            style="font-weight: 400; color: rgb(26, 26, 26)"
          >
            밀키트
          </li> -->
        </ul>
        <ProductDescription
          v-if="productStore.productTab === 'description'"
          :description="productStore.product.description"
        />
        <ProductReviewList
          v-if="productTab === 'review'"
          :reviews="productStore.reviews"
        />

        <!-- <div id="intro_box" class="content_box">
          
        </div> -->

        <div id="addCartLayer" v-if="isModal" class="layer_wrap">
          <div
            class="box add_cart_layer"
            style="position: absolute; margin: 0px; top: 211.5px; left: 551px"
          >
            <div class="view">
              <h2>장바구니 담기</h2>
              <div class="scroll_box">
                <p class="success">
                  <strong>상품이 장바구니에 담겼습니다.</strong><br />바로
                  확인하시겠습니까?
                </p>
              </div>
              <div class="btn_box">
                <button @click="closeModal" class="btn_cancel">
                  <span>취소</span>
                </button>
                <router-link to="/carts">
                  <button class="btn_confirm btn_move_cart">
                    <span>확인</span>
                  </button>
                </router-link>
              </div>
              <button
                @click="closeModal"
                title="닫기"
                class="close layer_close"
                type="button"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useProductsStore } from "../../../stores/useProductsStore";
import { useRoute } from "vue-router";
import { ref } from "vue";
import ProductDescription from "./ProductDescription.vue";
import ProductReviewList from "./ProductReviewList.vue";
import { useCartStore } from "../../../stores/useCartStore";
const productStore = useProductsStore();
const route = useRoute();
const productId = route.params.id;
const isModal = ref(false);
const productCnt = ref(1);
const cartStore = useCartStore();

const changeTab = (str) => {
  productStore.productTab = str;
};
const addCart = () => {
  productCnt.value = productCnt.value + 1;
};

const addToCart = () => {
  cartStore.addItemWithCount(productStore.product, productCnt);
  openModal();
};

const substactCart = () => {
  if (productCnt.value == 1) {
    alert("상품은 1개 이상 장바구니에 담을 수 있습니다.");
    return;
  } else productCnt.value = productCnt.value - 1;
};

const openModal = () => {
  isModal.value = true;
};

const closeModal = () => {
  isModal.value = false;
};

onMounted(async () => {
  await productStore.getProductsDetail(productId);
  await productStore.getProductsWithReviews(productId);
});
</script>

<style scoped>
.top_summary {
  padding: 0 80px 80px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-start;
}

.top_summary .left_cont {
  margin: 0 50px 50px 0;
  position: sticky;
  top: 80px;
}

.top_summary .right_cont .add_info {
  font-size: 15px;
  line-height: 15px;
  letter-spacing: -0.05em;
  font-weight: 400;
  margin: 0 0 10px;
  border-bottom: 1px solid #e5e5e5;
  padding: 0 0 10px;
}

.top_summary .right_cont .goods_name {
  font-size: 24px;
  line-height: 36px;
  letter-spacing: -0.04em;
  color: #333;
  font-weight: 500;
  max-height: 72px;
  overflow: hidden;
  word-break: keep-all;
}

.top_summary .right_cont .short_des {
  font-size: 15px;
  line-height: 20px;
  letter-spacing: -0.05em;
  font-weight: 400;
  margin: 8px 0 0;
  color: #555;
}

.top_summary .right_cont .price_top {
  margin: 25px 0 0 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 10px 0 5px;
}

.top_summary .right_cont .price_top .single_wrap {
  margin: 10px 0 0 0;
  display: flex;
  position: relative;
}

.top_summary .right_cont .price_top .single_wrap .single {
  font-size: 20px;
  line-height: 33px;
  color: #333;
  letter-spacing: -0.05em;
  font-weight: 400;
}

.top_summary .right_cont .price_top .single_wrap .single_price {
  font-size: 35px;
  line-height: 25px;
  font-weight: 500;
  display: inline-block;
  vertical-align: top;
}

.top_summary .right_cont .info > dl {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ececec;
  position: relative;
  min-height: 70px;
  padding: 0 15px 0 5px;
}

.top_summary .right_cont .info > dl > dt {
  font-size: 15px;
  line-height: 25px;
  letter-spacing: -0.05em;
  color: #333;
  font-weight: 500;
  width: 105px;
  flex-shrink: 0;
}

.top_summary .right_cont .info > dl > dd {
  flex-grow: 1;
  font-size: 15px;
  line-height: 25px;
  letter-spacing: -0.05em;
  color: #555;
  font-weight: 400;
  padding: 20px 0;
}

.top_summary .right_cont .info .count {
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.count {
  display: table-cell;
  vertical-align: middle;
  padding: 0;
}

.top_summary .right_cont .info .count .goods_qtycs {
  display: flex;
}

.top_summary .right_cont .info .count button {
  display: inline-block;
  width: 38px;
  height: 38px;
  background: url("/src/assets/icons/goods_view_top.svg") no-repeat;
}

.top_summary .right_cont .info .count input[name="goodsCnt[]"] {
  width: 52px;
  height: 38px;
  font-size: 16px;
  letter-spacing: -0.02em;
  color: #333;
  font-weight: 500;
  text-align: center;
  padding: 0;
}

.top_summary .right_cont .info .count * {
  border: none;
}

.top_summary .right_cont .info .count button.up {
  background-position: -48px 0;
}

.top_summary .right_cont .info .count button {
  display: inline-block;
  width: 38px;
  height: 38px;
  background: url("/src/assets/icons/goods_view_top.svg") no-repeat;
}

.goods_qtycs button {
  display: block;
  width: 26px;
  height: 27px;
  text-indent: -9999px;
}

.top_summary .right_cont .btn_choice_box .btn_add_wish {
  width: 65px;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid #00a7b3;
  box-sizing: border-box;
  flex-basis: auto;
}

.top_summary .right_cont .btn_choice_box {
  display: flex;
  margin: 20px 0 0 0;
  padding: 0;
}

.top_summary .right_cont .btn_choice_box > *:not(:last-child) {
  margin: 0 10px 0 0;
}
.top_summary .right_cont .btn_choice_box > * {
  font-size: 22px;
  letter-spacing: -0.05em;
  font-weight: 400;
  height: 65px;
  flex-grow: 1;
  border-radius: 8px;
  margin: 0;
  flex-basis: 0;
  padding: 0;
}

.top_summary .right_cont .btn_choice_box > * {
  font-size: 22px;
  letter-spacing: -0.05em;
  font-weight: 400;
  height: 65px;
  flex-grow: 1;
  border-radius: 8px;
  margin: 0;
  flex-basis: 0;
  padding: 0;
}

.btn_add_order {
  display: grid;
  place-content: center;
  width: 170px;
  height: 60px;
  margin: 0 0 0 10px;
  padding: 0;
  color: #ffffff;
  font-size: 20px;
  background: #ff7400;
  text-align: center;
  font-weight: 500;
}

.bc2 {
  background: #454545;
}

.top_summary .left_cont .img_photo_big {
  border-radius: 15px;
  overflow: hidden;
  position: relative;
}

.item_content_img span {
  display: block;
}

.top_summary .left_cont .review {
  margin: 20px 0 0 0;
  display: flex;
  padding: 0 10px;
}

.top_summary .left_cont .review dt {
  font-size: 18px;
  line-height: 18px;
  letter-spacing: -0.03em;
  color: #333;
  font-weight: 500;
  margin: 0 24px 0 0;
}

.fc3 {
  color: #474747 !important;
}

.top_summary .left_cont .review dd {
  display: flex;
}

.top_summary .left_cont .review dd > *:not(:last-child) {
  margin: 0 10px 0 0;
}
.top_summary .left_cont .review .star_repeat {
  display: inline-block;
  align-items: center;
  cursor: pointer;
  background: url("/src/assets/icons/star_back.svg") no-repeat;
  width: 120px;
  height: 20px;
}

.top_summary .left_cont .review .per {
  font-size: 23px;
  line-height: 20px;
  font-weight: 500;
  color: #333;
}

.fc5 {
  color: #ffffff !important;
}

.top_summary .right_cont .total_wrap {
  margin: 20px 0 0 0;
  padding: 0 20px;
  box-sizing: border-box;
  text-align: right;
}

.top_summary .right_cont .total_wrap .total_price {
  font-size: 35px;
  font-weight: 500;
  line-height: 25px;
  vertical-align: top;
}

.top_summary .right_cont .total_wrap .total_price_wrap {
  font-size: 20px;
  line-height: 33px;
  letter-spacing: -0.05em;
  color: #333;
  font-weight: 400;
}

/* 상세 */

/* 목록 선택 */
.submenu_list {
  width: 100%;
  height: 2.5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 1rem 0 2rem;
  border-top: 1px solid #cecece;
  border-bottom: 1px solid #cecece;
}

.submenu_item {
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: content-box;
}

.submenu_item:active,
.submenu_item:hover {
  color: #ff7400;
  border-bottom: 1px solid #ff7400;
}

.submenu_item.picked {
  font-weight: 700;
  color: #ff7400;
}

/* 메뉴 리스트 */

#menu_box {
  margin: 0 auto;
  display: none;
  border: 1px solid #b6bdc7;
  border-radius: 1rem;
  padding: 2rem;
  box-sizing: border-box;
}

#menu_box > h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

#menu_box > ul {
  padding: 0.5rem;
}

.menu_list {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.menu_list:first-child {
  margin-top: 0;
}

.menu_dots {
  flex-grow: 1;
  height: 1px;
  margin: auto 1rem;
  border-top: 1px dashed #ccc;
}

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
  background: url("/src/assets/icons/add_cart_success.png") no-repeat center top;
}

.add_cart_layer p {
  margin: 30px 0 0;
  padding: 80px 0 0;
  color: #222;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  background: url("/src/assets/icons/add_cart_success.png") no-repeat center top;
}

.layer_wrap .box .view .close {
  display: block;
  position: absolute;
  top: 6px;
  right: 0;
  width: 18px;
  height: 18px;
  text-indent: -9999px;
  background: url("/src/assets/icons/btn/layer-close.png") no-repeat left top;
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
  border: 1px solid #00a7b3;
  color: #ffffff;
  background: #00a7b3;
  font-weight: bold;
}

.add_cart_layer .btn_box,
.add_wish_layer .btn_box {
  padding: 29px 0 0 0;
  text-align: center;
}

.product_tab_item {
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: content-box;
  font-size: 1rem;
}

.product_tab_item.picked {
  font-weight: 700;
}
</style>
