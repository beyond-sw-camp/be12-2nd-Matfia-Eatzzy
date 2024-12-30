<script setup></script>

<template>
  <div>
    <div class="menu_wrap">
      <h2><a href="/mypage/index.php">마이페이지</a></h2>
      <ul class="menuLists">
        <li>
          내 정보
          <ul class="eachList">
            <router-link to="/mypage/client/info"><li>- 내 정보 수정</li></router-link>
          </ul>
        </li>
        <li>
          식당
          <ul class="eachList">
            <router-link to="/mypage/client/store/rsv"><li>- 식당 예약 내역</li></router-link>
            <router-link to="/mypage/client/store/like"><li>- 좋아요 한 식당</li></router-link>
            <router-link to="/mypage/client/store/review"><li>- 식당 리뷰</li></router-link>
          </ul>
        </li>
        <li>
          상품
          <ul class="eachList">
            <router-link to="/mypage/client/orders"><li>- 주문 내역</li></router-link>
            <router-link to="/mypage/client/product/review"><li>- 상품 리뷰</li></router-link>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}

ul li {
  color: #333;
  font-size: 0.875rem;
  font-weight: 300;
}

.menu_wrap {
  position: sticky;
  top: 0; /* 스크롤 시 상단에 고정 */
  padding: 3.125rem 0;
  letter-spacing: -0.02em;
  min-width: 10.75rem;
  box-sizing: border-box;
  z-index: 1000; /* 다른 요소 위로 보이도록 설정 */
}

.menu_wrap .menuLists {
  margin: 2rem 0 0 0;
}

.menu_wrap h2 {
  color: #222;
  font-size: 1.625rem;
  line-height: 1.625rem;
  margin: 0 0 0 1.5625rem;
}

.menu_wrap .menuLists > li {
  color: #222;
  font-size: 1.0625rem;
  line-height: 1.0625rem;
  margin: 1.3125rem 0 0 0;
  padding: 0 0 2.0625rem 1.5625rem;
}

.menu_wrap .menuLists .eachList li {
  height: 0.875rem;
  margin: 0.8125rem 0 0 0;
  line-height: 0.875rem;
}

.menu_wrap .menuLists .eachList li:first-child {
  margin: 1rem 0 0 0;
}

.menu_wrap .menuLists .eachList li a {
  color: #555;
  font-size: 0.875rem;
  font-weight: 300;
}

.menu_wrap .menuLists > li:first-child {
  border-bottom: 0.0625rem solid #cecece;
}

.menu_wrap .menuLists > li:nth-child(2) {
  border-bottom: 0.0625rem solid #cecece;
}
</style>
