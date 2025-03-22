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

    <div class="store_list">
      <Product
        v-for="product of productsStore.productsBest"
        :product="product"
      />
    </div>

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
            value="떡볶이"
            autocomplete="off"
            placeholder="검색어 입력"
          />
          <button type="submit" class="research_btn"></button>
        </dd>
      </dl>
      <dl class="sort">
        <dt>정렬방식</dt>
        <dd>
          <input type="radio" id="sort1" class="radio" name="sort" value="" />
          <label for="sort1">추천순</label>
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
          <label for="sort5" class="on">상품평순</label>
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
  </div>
</template>

<script setup>
import Product from "../product/components/Product.vue";
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
</style>
