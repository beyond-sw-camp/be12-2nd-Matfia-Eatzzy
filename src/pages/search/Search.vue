<template>
  <div>
    <div class="order_box">
      <ul class="orderby">
        <li>
          <a href="" class="orderby_list active">가게</a>
        </li>
        <li>
          <a href="" class="orderby_list">상품</a>
        </li>
      </ul>
    </div>

    <div class="n_list_wrap">
      <div class="list_head">
        <h2 class="page_title">
          <span>{{ searchKeyword }}</span> 검색결과 1개
        </h2>
        <div class="page_sub">
          <p>
            총 <span>{{ productsStore.products.length }}</span
            >개 상품
          </p>
          <div class="choice_view">
            <select
              class="chosen-select"
              name="pageNum"
              id="foo_goods_list_cnt"
              style="display: none"
            >
              <option value="40">40개씩보기</option>
              <option value="60">60개씩보기</option>
              <option value="80">80개씩보기</option>
            </select>
            <div
              class="chosen-container chosen-container-single chosen-container-single-nosearch"
              style="width: 86px"
              title=""
              id="foo_goods_list_cnt_chosen"
            >
              <a class="chosen-single"
                ><span>40개씩보기</span>
                <div><b></b></div
              ></a>
              <div class="chosen-drop">
                <div class="chosen-search">
                  <input type="text" autocomplete="off" readonly="" />
                </div>
                <ul class="chosen-results"></ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 사이드 검색조건 -->
      <aside>
        <dl>
          <dt>
            <input
              type="checkbox"
              id="rescan"
              name="reSearch"
              value="y"
              checked="checked"
            />
            <label for="rescan">결과 내 재검색</label>
          </dt>
          <dd>
            <input
              type="text"
              name="keyword"
              class="research_input"
              v-model="searchKeyword"
              autocomplete="off"
              placeholder="검색어 입력"
              @keyup.enter="search"
            />
            <button type="submit" class="research_btn" @click="search"></button>
          </dd>
        </dl>
        <dl class="sort">
          <dt>정렬방식</dt>
          <dd>
            <input type="radio" id="sort1" class="radio" name="sort" value="" />
            <label for="sort1" class="on">추천순</label>
          </dd>
          <dd>
            <input
              type="radio"
              id="sort2"
              class="radio"
              name="sort"
              value="orderCnt desc,g.regDt desc"
            />
            <label for="sort2">판매인기순</label>
          </dd>
          <dd>
            <input
              type="radio"
              id="sort3"
              class="radio"
              name="sort"
              value="goodsPrice asc,g.regDt desc"
            />
            <label for="sort3">낮은가격순</label>
          </dd>
          <dd>
            <input
              type="radio"
              id="sort4"
              class="radio"
              name="sort"
              value="goodsPrice desc,g.regDt desc"
            />
            <label for="sort4">높은가격순</label>
          </dd>
          <dd>
            <input
              type="radio"
              id="sort5"
              class="radio"
              name="sort"
              value="reviewCnt desc,g.regDt desc"
            />
            <label for="sort5">상품평순</label>
          </dd>
          <dd>
            <input
              type="radio"
              id="sort6"
              class="radio"
              name="sort"
              value="g.regDt desc"
            />
            <label for="sort6">등록일순</label>
          </dd>
          <dd>
            <input
              type="radio"
              id="sort7"
              class="radio"
              name="sort"
              value="g.reviewPt desc"
            />
            <label for="sort7">평점순</label>
          </dd>
        </dl>
        <!-- 상세검색 필터 -->
        <dl
          class="detail_search js-detail-search"
          style="padding: 24px 0 20px 24px"
        >
          <dt>가격</dt>
          <dd>
            <input
              type="checkbox"
              class="js-price-research"
              id="f_priceA"
              name="searchDetail[priceRange]"
              value="range_1"
              onclick="checkboxToRadio(this, name);"
              data-filter="priceA"
            />
            <label for="f_priceA">1만원 이하</label>
          </dd>
          <dd>
            <input
              type="checkbox"
              class="js-price-research"
              id="f_priceB"
              name="searchDetail[priceRange]"
              value="range_2"
              onclick="checkboxToRadio(this, name);"
              data-filter="priceB"
            />
            <label for="f_priceB">1~2만원</label>
          </dd>
          <dd>
            <input
              type="checkbox"
              class="js-price-research"
              id="f_priceC"
              name="searchDetail[priceRange]"
              value="range_3"
              onclick="checkboxToRadio(this, name);"
              data-filter="priceC"
              checked=""
            />
            <label for="f_priceC">2만원 이상</label>
          </dd>
        </dl>

        <dl class="detail_search js-detail-search">
          <dt>보관방법</dt>
          <dd>
            <input
              type="checkbox"
              class="js-storage-research"
              id="f_goodsStorage_f"
              name="searchDetail[goodsStorage]"
              value="f"
              onclick="checkboxToRadio(this, name);"
              data-filter="goodsStorage_f"
              checked=""
            />
            <label for="f_goodsStorage_f">냉동(-18 ℃ 이하)</label>
          </dd>
          <dd>
            <input
              type="checkbox"
              class="js-storage-research"
              id="f_goodsStorage_c"
              name="searchDetail[goodsStorage]"
              value="c"
              onclick="checkboxToRadio(this, name);"
              data-filter="goodsStorage_c"
            />
            <label for="f_goodsStorage_c">냉장(0 ~ 10 ℃)</label>
          </dd>
          <dd>
            <input
              type="checkbox"
              class="js-storage-research"
              id="f_goodsStorage_h"
              name="searchDetail[goodsStorage]"
              value="h"
              onclick="checkboxToRadio(this, name);"
              data-filter="goodsStorage_h"
            />
            <label for="f_goodsStorage_h">상온(15 ~ 25 ℃)</label>
          </dd>
          <dd>
            <input
              type="checkbox"
              class="js-storage-research"
              id="f_goodsStorage_s"
              name="searchDetail[goodsStorage]"
              value="s"
              onclick="checkboxToRadio(this, name);"
              data-filter="goodsStorage_s"
            />
            <label for="f_goodsStorage_s">실온(1 ~ 35 ℃)</label>
          </dd>
        </dl>

        <dl class="detail_search js-detail-search">
          <dt>조리방법</dt>
          <dd>
            <input
              type="checkbox"
              class="js-method-research"
              id="f_cook_method_r"
              name="searchDetail[cookMethod][]"
              value="r"
              data-filter="cook_method_r"
            />
            <label for="f_cook_method_r">전자렌지</label>
          </dd>
          <dd>
            <input
              type="checkbox"
              class="js-method-research"
              id="f_cook_method_a"
              name="searchDetail[cookMethod][]"
              value="a"
              data-filter="cook_method_a"
            />
            <label for="f_cook_method_a">에어프라이</label>
          </dd>
          <dd>
            <input
              type="checkbox"
              class="js-method-research"
              id="f_cook_method_y"
              name="searchDetail[cookMethod][]"
              value="y"
              data-filter="cook_method_y"
            />
            <label for="f_cook_method_y">유탕기</label>
          </dd>
          <dd>
            <input
              type="checkbox"
              class="js-method-research"
              id="f_cook_method_p"
              name="searchDetail[cookMethod][]"
              value="p"
              data-filter="cook_method_p"
            />
            <label for="f_cook_method_p">팬조리</label>
          </dd>
          <dd>
            <input
              type="checkbox"
              class="js-method-research"
              id="f_cook_method_o"
              name="searchDetail[cookMethod][]"
              value="o"
              data-filter="cook_method_o"
            />
            <label for="f_cook_method_o">오븐</label>
          </dd>
          <dd>
            <input
              type="checkbox"
              class="js-method-research"
              id="f_cook_method_t"
              name="searchDetail[cookMethod][]"
              value="t"
              data-filter="cook_method_t"
            />
            <label for="f_cook_method_t">해동후섭취/즉시섭취</label>
          </dd>
        </dl>
        <!-- //상세검색 필터 -->
      </aside>
      <!-- //사이드 검색조건 -->

      <div class="n_prd_list">
        <div
          class="search_keyword_banner banner_design_2"
          style="display: none"
        >
          <a href="/board/view.php?&amp;bdId=event&amp;sno=129">
            푸딩팩토리 베스트셀러 모음<br />
            <small
              >이럴땐 이런 제품!
              <em style="color: yellow">추천 기획전</em></small
            >
          </a>
        </div>
        <!-- 상품 리스트 -->
        <div class="store_list">
          <Product
            v-for="product of productsStore.products"
            :key="product.idx"
            :product="product"
          />
        </div>
        <!-- option layer -->
        <div id="optionViewLayer" class="layer_wrap dn"></div>
        <!-- //option layer -->

        <div id="addCartLayer" class="layer_wrap dn">
          <div
            class="box add_cart_layer"
            style="position: absolute; margin: 0px; top: 279.5px; left: 651px"
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
                <button type="button" class="btn_cancel">
                  <span>계속쇼핑하기</span>
                </button>
                <button type="button" class="btn_confirm btn_move_cart">
                  <span>장바구니확인</span>
                </button>
              </div>
              <!-- //btn_box -->
              <button title="닫기" class="close layer_close" type="button">
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="pagination">
        <div class="pagination">
          <ul>
            <li class="on"><span>1</span></li>
          </ul>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import "../../assets/products/products.css";
import { useProductsStore } from "../../stores/useProductsStore";
import Product from "../product/components/Product.vue";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";

const productsStore = useProductsStore();

const route = useRoute();
const router = useRouter();

// ✅ 검색어 상태 (input 바인딩)
const searchKeyword = ref(route.query.keyword || ""); // 처음 로드 시 쿼리값 유지

// ✅ 검색 실행 함수
const search = async () => {
  if (!searchKeyword.value) return;

  // 🔹 1. URL 업데이트 (라우트 쿼리 갱신)
  router.push({ path: "/search", query: { keyword: searchKeyword.value } });

  // 🔹 3. 검색 API 호출
  await productsStore.getSearchProductsList(searchKeyword.value, 0, 50);
};

// ✅ onMounted()에서 검색 실행
onMounted(async () => {
  if (searchKeyword.value) {
    await search();
  }
});
</script>

<style>
.order_box {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.25rem;
}

.orderby {
  display: flex;
  gap: 0.625rem;
}

.orderby_list {
  height: 1.5rem;
  display: grid;
  place-content: center;
  color: #ff7400;
  background-color: #fff;
  font-size: 0.75rem;
  border: 1px solid #ff7400;
  border-radius: 6.25rem;
  padding: 0 0.625rem;
  line-height: 0;
  cursor: pointer;
}

.orderby .picked {
  background-color: #ff7400;
  color: white;
  border-color: #ff7400;
}

.n_list_wrap .list_head {
  height: 40px;
}

.n_list_wrap .list_head .page_title {
  float: left;
  border-left: 5px solid #ff7400;
  padding: 0 0 0 5px;
  width: 100%;
}

.n_list_wrap .list_head .page_title span {
  color: #ff7400;
}

.n_list_wrap .list_head .page_sub {
  float: right;
  width: 1001px;
  margin-bottom: 10px;
}

.n_list_wrap .page_sub {
  height: 38px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.n_list_wrap .list_head .page_sub p {
  float: left;
  line-height: 30px;
}

.n_list_wrap .list_head .page_sub p span {
  color: #ff7400;
  font-weight: 500;
}

.n_list_wrap {
  line-height: 1;
  padding: 35px 0 0 0;
}

.n_list_wrap aside {
  width: 210px;
  float: left;
  margin: 0 49px 0 0;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
}

aside {
  display: block;
  unicode-bidi: isolate;
}

.research_input {
  width: 124px;
  height: 32px !important;
  border-radius: 3px 0 0 3px;
  border: 1px solid #c2c2c2 !important;
  box-sizing: border-box;
  float: left;
}

.research_btn {
  width: 36px;
  height: 32px;
  border-radius: 0 3px 3px 0;
  border: 1px solid #c2c2c2;
  box-sizing: border-box;
  border-left: none;
  background: url(https://www.foodingfactory.com/data/img/allnew/layout/research_icon.svg)
    no-repeat center;
}

.n_list_wrap .n_prd_list {
  display: flex;
  flex-direction: column;
}

.n_list_wrap aside dl {
  border-bottom: 1px solid #dbdbdb;
  box-sizing: border-box;
  padding: 24px 0 24px 24px;
}

.n_list_wrap aside dl dd {
  font-size: 13px;
  font-weight: 300;
  letter-spacing: -0.05em;
  color: #555;
  margin: 0 0 12px 0;
}

.n_list_wrap aside dl dt {
  font-size: 15px;
  font-weight: 500;
  letter-spacing: -0.05em;
  color: #333;
  margin: 0 0 17px 0;
}

.n_list_wrap .list_head .page_sub .choice_view {
  float: right;
  width: 120px;
}

element.style {
  display: none;
}

.n_list_wrap .list_head .page_sub .choice_view #foo_goods_list_cnt_chosen {
  width: 120px !important;
}

.chosen-container-single .chosen-single {
  position: relative;
  display: block;
  overflow: hidden;
  padding: 0 0 0 8px;
  height: 25px;
  border: 1px solid #ccc;
  border-radius: 0px;
  background-color: #fff;
  color: #444;
  text-decoration: none;
  white-space: nowrap;
  line-height: 24px;
}

.chosen-container-single .chosen-single span {
  display: block;
  overflow: hidden;
  margin-right: 26px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chosen-container-single .chosen-single div {
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  width: 18px;
  height: 100%;
}

.chosen-container-single .chosen-single div b {
  display: block;
  width: 100%;
  height: 100%;
  background: url(./chosen-sprite.png) no-repeat 0px 2px;
}

.store_list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2.5rem 1.5rem;
  width: 100%;
}
.store_list .store_item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.store_list .store_item .img_box {
  position: relative;
  display: flex;
  border-radius: 0.375rem;
  overflow: hidden;
  width: 100%;
}

.store_list .store_item .info_box {
  display: flex;
  flex-direction: column;
  gap: 0.3125rem;
  white-space: nowrap;
}

.store_list .store_item .img_box img {
  width: 100%;
  height: 100%;
}
</style>
