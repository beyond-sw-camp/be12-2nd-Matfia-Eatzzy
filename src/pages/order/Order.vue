<template>
  <div class="wrap page_cart">
    <header id="header"></header>
    <div class="page_order_payment order_wrap inner_wrap">
      <div class="order_tit">
        <h2>주문서작성/결제</h2>
        <ol>
          <li>
            <span>01</span> 장바구니
            <span
              ><img src="/src/assets/icons/icon_join_step_off.png" alt=""
            /></span>
          </li>
          <li class="page_on">
            <span>02</span> 주문서작성/결제<span
              ><img src="/src/assets/icons/icon_join_step_on.png" alt=""
            /></span>
          </li>
          <li><span>03</span> 주문완료</li>
        </ol>
      </div>

      <div class="order_cart_tit">
        <h3>주문상세내역</h3>
      </div>

      <div class="order_table_type">
        <!-- 장바구니 상품리스트 시작 -->
        <table>
          <colgroup>
            <col />
            <!-- 상품명/옵션 -->
            <col style="width: 5%" />
            <!-- 수량 -->
            <col style="width: 10%" />
            <!-- 상품금액 -->
            <col style="width: 13%" />
            <!-- 할인/적립 -->
            <!-- <col style="width: 10%" /> -->
            <!-- 합계금액 -->
            <col style="width: 10%" />
            <!-- 배송비 -->
          </colgroup>
          <thead>
            <tr>
              <th>상품/옵션 정보</th>
              <th>수량</th>
              <th>상품금액</th>
              <!-- <th>할인/적립</th> -->
              <th>합계금액</th>
              <th>배송비</th>
            </tr>
          </thead>
          <tbody>
            <!-- 페이스북픽셀 180508
            <script language="javascript">
              _G_amt[_google_countvar] = "15,840원".replace(/,/g, "");
              _G_nl[_google_countvar] = " 1";
              _G_pl[_google_countvar] = "1000004896";
              _G_pn[_google_countvar] =
                "치즈롤까스(25cm) 1kg (250g*4ea)".replace(/(<([^>]+)>)/gi, "");
              _G_ct[_google_countvar] = "";
              _google_countvar++;
            </script> -->
            <!--페이스북픽셀 180508-->
          </tbody>
        </table>
        <!-- 장바구니 상품리스트 끝 -->
        <OrderCard
          v-for="product in orderStore.order.orderProductResponse"
          :key="product.idx"
          :cartProduct="{ ...product, ...product.productsResponse }"
        ></OrderCard>

        <div class="price_sum">
          <div class="price_sum_cont">
            <div class="price_sum_list">
              <div>
                <p>
                  <!-- 총 <strong>{{ cartStore.cartProducts.length }}</strong> 개의 -->
                  상품금액
                </p>
                <p class="price">
                  <strong>{{ orderStore.order.price }}</strong
                  >원
                </p>
              </div>
              <img src="/src/assets/icons/order_price_plus.png" alt="더하기" />
              <div>
                <p>배송비</p>
                <p class="price"><strong>4,000</strong>원</p>
              </div>
              <img src="/src/assets/icons/order_price_total.png" alt="합계" />
              <div class="price_total">
                <p>합계</p>
                <p class="price">
                  <strong>{{ orderStore.order.price + 4000 }}</strong
                  >원
                </p>
              </div>
            </div>
          </div>

          <!-- //price_sum_cont -->
        </div>
      </div>

      <div class="order_zone_tit">
        <h4>주문자 정보</h4>
      </div>

      <div class="order_table_type">
        <table class="table_left">
          <colgroup>
            <col style="width: 15%" />
            <col style="width: 85%" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row"><span class="important">주문하시는 분</span></th>
              <td>
                <input
                  type="text"
                  name="orderName"
                  value="안규호"
                  data-pattern="gdEngKorNum"
                  maxlength="20"
                  readonly="readonly"
                />
              </td>
            </tr>
            <tr>
              <th scope="row">전화번호</th>
              <td>
                <input
                  type="text"
                  id="phoneNum"
                  name="orderPhone"
                  value=""
                  maxlength="20"
                />
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="important">휴대폰 번호</span></th>
              <td>
                <input
                  type="text"
                  id="mobileNum"
                  name="orderCellPhone"
                  value="010-7507-9483"
                  maxlength="20"
                />
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="important">이메일</span></th>
              <td class="member_email">
                <input
                  type="text"
                  name="orderEmail"
                  value="powergyuho@gmail.com"
                />

                <select
                  id="emailDomain"
                  class="chosen-select"
                  style="display: none"
                >
                  <option value="self">직접입력</option>
                  <option value="naver.com">naver.com</option>
                  <option value="hanmail.net">hanmail.net</option>
                  <option value="daum.net">daum.net</option>
                  <option value="nate.com">nate.com</option>
                  <option value="hotmail.com">hotmail.com</option>
                  <option value="gmail.com">gmail.com</option>
                  <option value="icloud.com">icloud.com</option>
                </select>
                <div
                  class="chosen-container chosen-container-single chosen-container-single-nosearch"
                  style="width: 120px"
                  title=""
                  id="emailDomain_chosen"
                >
                  <a class="chosen-single"
                    ><span>직접입력</span>
                    <div><b></b></div
                  ></a>
                  <div class="chosen-drop">
                    <div class="chosen-search">
                      <input type="text" autocomplete="off" readonly="" />
                    </div>
                    <ul class="chosen-results"></ul>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="delivery_info">
        <div class="order_zone_tit">
          <h4>배송정보</h4>
        </div>

        <div class="order_table_type">
          <table class="table_left">
            <colgroup>
              <col style="width: 15%" />
              <col style="width: 85%" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">배송지 확인</th>
                <td>
                  <div class="form_element">
                    <ul>
                      <li>
                        <input
                          type="radio"
                          name="shipping"
                          id="shippingBasic"
                        />
                        <label for="shippingBasic" class="choice_s"
                          >기본 배송지</label
                        >
                      </li>
                      <li>
                        <input
                          type="radio"
                          name="shipping"
                          id="shippingRecently"
                        />
                        <label for="shippingRecently" class="choice_s"
                          >최근 배송지</label
                        >
                      </li>
                      <li>
                        <input type="radio" name="shipping" id="shippingNew" />
                        <label for="shippingNew" class="choice_s on"
                          >직접 입력</label
                        >
                      </li>
                      <li>
                        <input
                          type="radio"
                          name="shipping"
                          id="shippingSameCheck"
                        />
                        <label for="shippingSameCheck" class="choice_s"
                          >주문자정보와 동일</label
                        >
                      </li>
                    </ul>
                    <span class="btn_gray_list"
                      ><a
                        href="#myShippingListLayer"
                        class="btn_gray_small btn_open_layer js_shipping"
                        ><span>배송지 관리</span></a
                      ></span
                    >
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="important">받으실분</span></th>
                <td>
                  <input
                    type="text"
                    name="receiverName"
                    data-pattern="gdEngKorNum"
                    maxlength="20"
                    id="receiver_check_name"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="important">받으실 곳</span></th>
                <td class="member_address">
                  <div class="address_postcode">
                    <input
                      type="text"
                      name="receiverZonecode"
                      readonly="readonly"
                    />
                    <input type="hidden" name="receiverZipcode" />
                    <span id="receiverZipcodeText" class="old_post_code"></span>
                    <button
                      type="button"
                      class="btn_post_search"
                      onclick="gd_postcode_search('receiverZonecode', 'receiverAddress', 'receiverZipcode');"
                    >
                      우편번호검색
                    </button>
                  </div>
                  <div class="address_input">
                    <input
                      type="text"
                      name="receiverAddress"
                      readonly="readonly"
                    />
                    <input
                      type="text"
                      name="receiverAddressSub"
                      data-pattern="gdEngKorNumHyphen"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">전화번호</th>
                <td>
                  <input type="text" id="receiverPhone" name="receiverPhone" />
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="important">휴대폰 번호</span></th>
                <td>
                  <input
                    type="text"
                    id="receiverCellPhone"
                    name="receiverCellPhone"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">남기실 말씀</th>
                <td class="td_last_say">
                  <input type="text" name="orderMemo" />
                </td>
              </tr>
              <tr>
                <th scope="row">회원정보 반영</th>
                <td>
                  <div class="form_element">
                    <div class="member_info_delivery">
                      <input
                        type="checkbox"
                        id="reflectApplyDelivery"
                        name="reflectApplyDelivery"
                        value="y"
                      />
                      <label for="reflectApplyDelivery" class="check_s"
                        ><em>나의 배송지에 추가합니다.</em></label
                      >
                    </div>
                    <div class="member_info_apply">
                      <input
                        name="reflectApplyMember"
                        type="checkbox"
                        id="reflectApplyMember"
                        value="y"
                      />
                      <label for="reflectApplyMember" class="check_s on"
                        >위 내용을 회원정보에 반영하여 수정합니다..
                        <span
                          >(주소/전화번호/휴대폰번호)
                          <span style="color: #f30"
                            >※체크시 다음주문부터 다시 입력하실 필요가
                            없습니다.</span
                          ></span
                        ></label
                      >
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="payment_info">
        <div class="order_zone_tit">
          <h4>결제정보</h4>
        </div>

        <div class="order_table_type">
          <table class="table_left">
            <colgroup>
              <col style="width: 15%" />
              <col style="width: 85%" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">상품 합계 금액</th>
                <td>
                  <span id="totalGoodsPrice"
                    >{{ orderStore.order.price }}원</span
                  >
                </td>
              </tr>
              <tr>
                <th scope="row">기본 배송비</th>
                <td>
                  <span id="totalDeliveryCharge">{{
                    cartStore.deliveryFee
                  }}</span
                  >원
                </td>
              </tr>

              <tr>
                <th scope="row">최종 결제 금액</th>
                <td>
                  <input type="hidden" name="settlePrice" value="19840" />
                  <input type="hidden" name="overseasSettlePrice" value="0" />
                  <input
                    type="hidden"
                    name="overseasSettleCurrency"
                    value="KRW"
                  />
                  <strong id="totalSettlePrice" class="order_payment_sum">{{
                    orderStore.order.price + cartStore.deliveryFee
                  }}</strong
                  >원
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="payment_progress">
        <div class="order_zone_tit">
          <h4>결제수단 선택 / 결제</h4>
          <p class="js_pay_content">
            ※ 고객님은 안전거래를 위해 현금으로 결제시 저희 쇼핑몰에서 가입한
            구매안전서비스인 NHN KCP의 구매안전(에스크로)서비스를 이용하실 수
            있습니다.
          </p>
        </div>

        <div class="payment_progress_list">
          <div class="js_pay_content">
            <!-- N : 일반결제 시작 -->
            <div id="settlekind_general" class="general_payment">
              <dl>
                <dt>일반결제</dt>
                <dd>
                  <div class="form_element">
                    <ul class="payment_progress_select">
                      <li id="settlekindType_pc">
                        <input
                          type="radio"
                          id="settleKind_pc"
                          name="settleKind"
                          value="pc"
                        />
                        <label
                          for="settleKind_pc"
                          class="choice_s"
                          style="display: inline-block"
                        >
                          <span
                            ><img
                              src="/src/assets/icons/pay_pc_icon.png"
                              alt="신용카드"
                          /></span>
                        </label>
                      </li>
                      <li id="settlekindType_pb">
                        <input
                          type="radio"
                          id="settleKind_pb"
                          name="settleKind"
                          value="pb"
                        />
                        <label
                          for="settleKind_pb"
                          class="choice_s"
                          style="display: inline-block"
                        >
                          <span
                            ><img
                              src="/src/assets/icons/pay_pb_icon.png"
                              alt="계좌이체"
                          /></span>
                        </label>
                      </li>
                      <li id="settlekindType_ph">
                        <input
                          type="radio"
                          id="settleKind_ph"
                          name="settleKind"
                          value="ph"
                        />
                        <label
                          for="settleKind_ph"
                          class="choice_s"
                          style="display: inline-block"
                        >
                          <span
                            ><img
                              src="/src/assets/icons/pay_ph_icon.png"
                              alt="휴대폰결제"
                          /></span>
                        </label>
                      </li>
                      <li id="settlekindType_pk">
                        <input
                          type="radio"
                          id="settleKind_pk"
                          name="settleKind"
                          value="pk"
                        />
                        <label
                          for="settleKind_pk"
                          class="choice_s"
                          style="display: inline-block"
                        >
                          <span
                            ><img
                              src="/src/assets/icons/pay_pk_icon.png"
                              alt="카카오페이"
                          /></span>
                        </label>
                      </li>

                      <li>
                        <input
                          type="radio"
                          name="settleKind"
                          id="settleKind_payco"
                          value="payco"
                        />
                        <label
                          for="settleKind_payco"
                          class="choice_s"
                          style="display: inline-block"
                        >
                          <span
                            ><img
                              src="/src/assets/icons/pay_payco_icon.png"
                              alt="페이코결제"
                          /></span>
                        </label>
                      </li>
                    </ul>
                  </div>

                  <!-- 신용카드 컨텐츠 -->
                  <div
                    class="card"
                    id="settlekind_general_pc"
                    style="display: none"
                  ></div>
                  <!-- //신용카드 컨텐츠 -->

                  <!-- 계좌이체 컨텐츠 -->
                  <div
                    class="account-bank"
                    id="settlekind_general_pb"
                    style="display: none"
                  ></div>
                  <!-- //계좌이체 컨텐츠 -->

                  <!-- 휴대폰 컨텐츠 -->
                  <div
                    class="cellphone"
                    id="settlekind_general_ph"
                    style="display: none"
                  ></div>
                  <!-- //휴대폰 컨텐츠 -->
                </dd>
              </dl>
            </div>
            <!-- //general_payment -->
            <!-- N : 일반결제 끝 -->

            <!-- N : 에스크로결제 시작 -->
            <div id="settlekind_escrow" class="escrow_payment">
              <dl>
                <dt>에스크로결제</dt>
                <dd>
                  <div class="form_element">
                    <ul class="payment_progress_select">
                      <li>
                        <input
                          type="radio"
                          name="settleKind"
                          id="settleKind_ec"
                          value="ec"
                        />
                        <label for="settleKind_ec" class="choice_s"
                          >신용카드</label
                        >
                      </li>
                      <li>
                        <input
                          type="radio"
                          name="settleKind"
                          id="settleKind_eb"
                          value="eb"
                        />
                        <label for="settleKind_eb" class="choice_s"
                          >계좌이체</label
                        >
                      </li>
                      <li>
                        <input
                          type="radio"
                          name="settleKind"
                          id="settleKind_ev"
                          value="ev"
                        />
                        <label for="settleKind_ev" class="choice_s"
                          >가상계좌</label
                        >
                      </li>
                    </ul>
                  </div>
                </dd>
              </dl>
            </div>
            <!-- //escrow_payment -->
            <!-- N : 에스크로결제 끝 -->

            <!-- N : 현금영수증/계산서 발행 시작 -->
            <div id="receiptSelect" class="cash_tax_get" style="display: block">
              <dl>
                <dt>현금영수증 발급신청</dt>
                <dd>
                  <div class="form_element">
                    <ul class="payment_progress_select">
                      <li id="nonReceiptView" style="display: none">
                        <input
                          type="radio"
                          id="receiptNon"
                          name="receiptFl"
                          value="n"
                          onclick="gd_receipt_display();"
                        />
                        <label for="receiptNon" class="choice_s">
                          <div
                            class="cash_receipt_non"
                            style="display: inline-block"
                          >
                            신청안함
                          </div>
                          <div class="cash_receipt_pg" style="display: none">
                            현금영수증 (※ 결제창에서 신청)
                          </div>
                        </label>
                      </li>
                      <li id="cashReceiptView">
                        <input
                          type="radio"
                          id="receiptCash"
                          name="receiptFl"
                          value="r"
                          checked=""
                          onclick="gd_receipt_display();"
                        />
                        <label for="receiptCash" class="choice_s on"
                          >현금영수증</label
                        >
                      </li>
                    </ul>
                  </div>
                </dd>
              </dl>

              <!-- N : 현금영수증 시작 -->
              <div id="cash_receipt_info" class="cash_receipt_box js_receipt">
                <div class="form_element">
                  <ul class="payment_progress_select">
                    <input type="hidden" name="cashCertFl" value="c" />
                    <li>
                      <input
                        type="radio"
                        id="cashCert_e"
                        name="cashUseFl"
                        value="e"
                        onclick="gd_cash_receipt_toggle();"
                      />
                      <label class="choice_s" for="cashCert_e"
                        >지출증빙용(사업자용)</label
                      >
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="cashCert_d"
                        name="cashUseFl"
                        value="d"
                        onclick="gd_cash_receipt_toggle();"
                        checked="checked"
                      />
                      <label class="choice_s on" for="cashCert_d"
                        >소득공제용</label
                      >
                    </li>
                  </ul>
                </div>
                <div class="cash_receipt_list">
                  <dl id="certNoHp">
                    <dt>휴대폰번호</dt>
                    <dd style="margin: 0">
                      <input
                        type="text"
                        name="cashCertNo[c]"
                        class="number_only"
                        value="01075079483"
                      />

                      <span class="btn_gray_list">
                        <button
                          type="button"
                          class="cash_phone_num_modify"
                          style="padding: 4px 0 4px 11px"
                          data-update-field="cellPhone"
                          data-btn-text="휴대폰번호"
                        >
                          <span>휴대폰번호 정보변경</span>
                        </button>
                      </span>
                      <br />
                      <span class="fc7 fw700 fs14 cellPhone_result"
                        >입력하신 번호가 정확한지 다시한번 확인해 주세요!</span
                      >
                    </dd>
                  </dl>
                  <dl id="certNoBno" style="display: none">
                    <dt>사업자번호</dt>
                    <dd style="margin: 0">
                      <input
                        type="text"
                        name="cashCertNo[b]"
                        class="number_only"
                        value=""
                        maxlength="10"
                      />
                      <br />
                      <span class="fc7 fw700 fs14 busiNo_result"
                        >입력하신 번호가 정확한지 다시한번 확인해 주세요!</span
                      >
                    </dd>
                  </dl>
                </div>
              </div>
              <!-- //cash_receipt_box -->
            </div>
            <!-- //cash_tax_get -->
            <!-- N : 현금영수증/계산서 발행 끝-->

            <!-- N : 페이코결제 시작 -->

            <div
              id="settlekind_payco"
              class="payco_payment"
              style="display: none"
            >
              <dl>
                <dt>
                  <div id="paycoDisplayID" style="display: inline">
                    <img
                      src="https://paycoscdn.toastoven.net/payco/bill/checkout/img/v2/btn_type/EASYPAY_A2.png"
                      width="103"
                      height="14"
                      style="width: auto; vertical-align: middle"
                    />
                  </div>

                  <!-- <script type="text/javascript">
                    //<![CDATA[
                    Payco.Button.register({
                      SELLER_KEY: "GN_700R8O",
                      ORDER_METHOD: "EASYPAY",
                      BUTTON_TYPE: "A2",
                      DISPLAY_PROMOTION: "Y",
                      DISPLAY_ELEMENT_ID: "paycoDisplayID",
                    });
                    //]]>
                  </script> -->
                </dt>
                <dd>
                  <div class="form_element">
                    <ul>
                      <li>
                        <input
                          type="radio"
                          id="settleKind_payco_fc"
                          name="settleKind"
                          value="fc"
                          onclick="gd_payco_toggle('fc');"
                        />
                        <label for="settleKind_payco_fc" class="choice_payco">
                          <span>PAYCO 신용카드</span>
                        </label>
                      </li>
                      <li>
                        <input
                          type="radio"
                          id="settleKind_payco_fb"
                          name="settleKind"
                          value="fb"
                          onclick="gd_payco_toggle('fb');"
                        />
                        <label for="settleKind_payco_fb" class="choice_payco">
                          <span>PAYCO 바로이체(계좌이체)</span>
                        </label>
                      </li>
                      <li>
                        <input
                          type="radio"
                          id="settleKind_payco_fp"
                          name="settleKind"
                          value="fp"
                          onclick="gd_payco_toggle('fp');"
                        />
                        <label for="settleKind_payco_fp" class="choice_payco">
                          <span>PAYCO 포인트</span>
                        </label>
                      </li>
                    </ul>
                  </div>
                </dd>
              </dl>
            </div>

            <!-- //payco_payment -->
            <!-- N : 페이코결제 끝 -->
          </div>

          <!-- //payment_progress_list -->
        </div>
        <div
          class="order_zone_tit"
          style="border-bottom: 1px solid #666; margin: 0 0 10px 0"
        >
          <h4>상품 품절시 처리방법</h4>
          <p class="js_pay_content">
            ※ 주문 완료 후 특정상품이 일시 품절 되었을 경우 아래 선택하신
            방법으로 처리됩니다.<br /><strong class="fc7"
              >확인 후 꼭!! 원하시는 방법으로 체크 부탁드립니다.</strong
            >
          </p>
        </div>
        <div id="settlekind_overseas" class="pg_payment">
          <dl>
            <!--<dt>상품 품절시 처리방법</dt>-->
            <dd style="margin: 0 0 0 20px">
              <div class="form_element">
                <ul class="payment_progress_select">
                  <li>
                    <input
                      type="radio"
                      name="userMemoCk"
                      id="userMemoCk2"
                      value="상품입고 시 출고"
                    />
                    <label
                      for="userMemoCk2"
                      class="choice_s"
                      style="margin-right: 10px"
                      >상품입고 시 출고</label
                    >
                    <!--<input type="radio" name="userMemoCk" id="userMemoCk3" value="대체상품 유선상담">
            <label for="userMemoCk3" class="choice_s">대체상품 유선상담</label>-->

                    <input
                      type="hidden"
                      name="visitMemo"
                      id="visitMemo"
                      class="require"
                      value=""
                    />
                    <input
                      type="radio"
                      name="userMemoCk"
                      id="userMemoCk1"
                      value="결제수단 환불"
                    />
                    <label
                      for="userMemoCk1"
                      class="choice_s"
                      style="margin-right: 10px"
                      >결제수단 환불</label
                    >

                    <p class="fc7 fw700 fs14 dn userMemoCk2Info">
                      (#단종 상품또는 장기간 입고 지연 상품은 문자 안내후 환불로
                      진행될 수 있습니다.)
                    </p>
                  </li>
                </ul>
              </div>
            </dd>
          </dl>
        </div>

        <div class="payment_final">
          <div class="payment_final_total">
            <dl>
              <dt>최종 결제 금액</dt>
              <dd>
                <span
                  ><strong id="totalSettlePriceView">{{
                    cartStore.calTotalPrice
                  }}</strong
                  >원</span
                >
              </dd>
            </dl>
          </div>
          <div class="payment_final_check">
            <div class="buy_terms">
              <div class="terms_all form_element">
                <input
                  type="checkbox"
                  id="termAgree1_orderCheck"
                  class="require"
                />
                <label for="termAgree1_orderCheck" class="check_s"
                  ><em
                    ><b
                      >(필수) 구매하실 상품의 결제정보를 확인하였으며,
                      구매진행에 관한 약관모두를 동의합니다.</b
                    ></em
                  ></label
                >
              </div>
              <div class="terms form_element orderTermsAgree">
                <div class="agree_choice_box">
                  <input
                    type="checkbox"
                    id="termAgree3_orderCheck"
                    class="require termAgree3_orderCheck"
                  />
                  <label for="termAgree3_orderCheck" class="check_s"
                    ><em
                      ><b>(필수) 청약철회에 대한 방침에 동의합니다.</b></em
                    ></label
                  >
                </div>
                <textarea rows="3" disabled="disabled" readonly="readonly">
      ①“푸딩팩토리”과 재화등의 구매에 관한 계약을 체결한 이용자는 수신확인의 통지를 받은 날부터 7일 이내에는 청약의 철회를 할 수 있습니다.
      
      ② 이용자는 재화등을 배송받은 경우 다음 각호의 1에 해당하는 경우에는 반품 및 교환을 할 수 없습니다.
      1. 이용자에게 책임 있는 사유로 재화 등이 멸실 또는 훼손된 경우(다만, 재화 등의 내용을 확인하기 위하여 포장 등을 훼손한 경우에는 청약철회를 할 수 있습니다)
      2. 이용자의 사용 또는 일부 소비에 의하여 재화 등의 가치가 현저히 감소한 경우
      3. 시간의 경과에 의하여 재판매가 곤란할 정도로 재화등의 가치가 현저히 감소한 경우
      4. 같은 성능을 지닌 재화등으로 복제가 가능한 경우 그 원본인 재화 등의 포장을 훼손한 경우
      
      ③ 제2항제2호 내지 제4호의 경우에 “몰”이 사전에 청약철회 등이 제한되는 사실을 소비자가 쉽게 알 수 있는 곳에 명기하거나 시용상품을 제공하는 등의 조치를 하지 않았다면 이용자의 청약철회등이 제한되지 않습니다.
      
      ④ 이용자는 제1항 및 제2항의 규정에 불구하고 재화등의 내용이 표시·광고 내용과 다르거나 계약내용과 다르게 이행된 때에는 당해 재화등을 공급받은 날부터 3월이내, 그 사실을 안 날 또는 알 수 있었던 날부터 30일 이내에 청약철회 등을 할 수 있습니다.
      
      제16조(청약철회 등의 효과)
      
      ① “푸딩팩토리”은 이용자로부터 재화 등을 반환받은 경우 3영업일 이내에 이미 지급받은 재화등의 대금을 환급합니다. 이 경우 “몰”이 이용자에게 재화등의 환급을 지연한 때에는 그 지연기간에 대하여 공정거래위원회가 정하여 고시하는 지연이자율을 곱하여 산정한 지연이자를 지급합니다.
      
      ② “푸딩팩토리”은 위 대금을 환급함에 있어서 이용자가 신용카드 또는 전자화폐 등의 결제수단으로 재화등의 대금을 지급한 때에는 지체없이 당해 결제수단을 제공한 사업자로 하여금 재화등의 대금의 청구를 정지 또는 취소하도록 요청합니다.
      
      ③ 청약철회등의 경우 공급받은 재화등의 반환에 필요한 비용은 이용자가 부담합니다. “몰”은 이용자에게 청약철회등을 이유로 위약금 또는 손해배상을 청구하지 않습니다. 다만 재화등의 내용이 표시·광고 내용과 다르거나 계약내용과 다르게 이행되어 청약철회등을 하는 경우 재화등의 반환에 필요한 비용은 “푸딩팩토리”이 부담합니다.
      
      ④ 이용자가 재화등을 제공받을때 발송비를 부담한 경우에 “몰”은 청약 철회시 그 비용을 누가 부담하는지를 이용자가 알기 쉽도록 명확하게 표시합니다.</textarea
                >
              </div>
            </div>
          </div>
        </div>
        <div class="btn_center_box">
          <button @click="pay" class="btn_order_buy order-buy">
            <em>결제하기</em>
          </button>
        </div>
        <div style="color: #f30; text-align: center; margin: 20px 0 0 0">
          <b
            >결제 오류시 배송정보 주소를 다시입력 후 주문하시면 정상적인 주문이
            가능합니다.</b
          ><br />
          <span style="color: #999"
            >주소변경 후 회원정보에 반영을 체크하시면 다음주문부터 다시 입력하실
            필요가 없습니다.</span
          >
        </div>
      </div>
    </div>
    <!-- <OrderModal v-if="modalChecked"></OrderModal> -->
    <OrderModal v-if="orderStore.modalChecked"></OrderModal>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import axios from "axios";
import PortOne from "@portone/browser-sdk/v2";
import { useCartStore } from "../../stores/useCartStore";
import OrderModal from "./OrderModal.vue";
import { onMounted, reactive, ref } from "vue";
import { useOrderStore } from "../../stores/useOrderStore";
import OrderCard from "./components/OrderCard.vue";
const cartStore = useCartStore();
const orderStore = useOrderStore();
const route = useRoute();
const orderIdx = reactive(route.params.orderIdx); // 반응형 변수로 선언
console.log(orderIdx);
// 컴포넌트 마운트 시 주문 정보 가져오기
onMounted(async () => {
  console.log(orderIdx);
  await orderStore.fetchOrderDetails(orderIdx);
});

// 결제 함수
const pay = async () => {
  if (!orderStore.order) {
    console.error("주문 정보가 없습니다!");
    return alert("주문 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
  }

  let orderName;

  if (orderStore.order.orderProductResponse.length > 0) {
    const firstProduct =
      orderStore.order.orderProductResponse[0].productsResponse.name;
    const otherCount = orderStore.order.orderProductResponse.length - 1;

    if (otherCount === 0) {
      orderName = `${firstProduct} 1개`;
    } else {
      orderName = `${firstProduct} 외 ${otherCount}가지 상품`;
    }
  }

  const portoneRes = await PortOne.requestPayment({
    storeId: "store-5493e266-f9a3-4c57-80a1-8e94fd06935e",
    channelKey: "channel-key-15f235be-7db2-4b8d-a25a-843ab9536d1b",
    paymentId: "payment-" + crypto.randomUUID(),
    orderName: orderName,
    totalAmount: orderStore.order.price,
    currency: "CURRENCY_KRW",
    payMethod: "EASY_PAY",
  });

  console.log(portoneRes);

  if (portoneRes.code !== undefined) {
    // 오류 발생
    return alert(portoneRes.message);
  }

  handlePayment(portoneRes);
  orderStore.modalChecked = true;
};

// 결제 정보를 서버로 전송하는 함수
const sendPaymentData = async (paymentData) => {
  try {
    const response = await axios.post("/api/app/payment/register", paymentData);

    console.log("결제 정보 전송 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("결제 정보를 전송하는 중 오류 발생:", error);
  }
};

// 결제 완료 후 서버에 전송
const handlePayment = async (portoneRes) => {
  const paymentData = {
    orderIdx: orderStore.order.idx,
    userId: 1, // 현재 로그인한 사용자 ID (예: localStorage 또는 Vuex/Pinia에서 가져오기)
    paymentId: portoneRes.paymentId,
    transactionType: portoneRes.transactionType,
    txId: portoneRes.txId,
  };

  await sendPaymentData(paymentData);
};
</script>

<style>
#paycoDisplayID img {
  pointer-events: none;
}

.page_cart .btn_order_buy {
  display: inline-block;
  width: 300px;
  height: 61px;
  line-height: 59px;
  color: #fff;
  font-size: 20px;
  border: 1px solid #ff7400;
  background: #ff7400;
  text-align: center;
}
</style>
