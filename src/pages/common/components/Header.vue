<script setup>
import { useCartStore } from "../../../stores/useCartStore";
import { useMemberStore } from "../../../stores/useMemberStore";
const memberStore = useMemberStore();
const cartStore = useCartStore();

const logout = () => {
  memberStore.logout();
};

const mypage = "/mypage/" + sessionStorage.getItem("UserType");
const loginStatus = sessionStorage.getItem("LOGIN");

const gnbOpen = () => {
  let gnb = document.querySelector("#gnb");
  if (gnb) {
    gnb.classList.toggle("hide");
    button.classList.toggle("off");
  }
};
</script>

<template>
  <header>
    <div class="inner_wrap">
      <div class="top_login">
        <div v-if="!loginStatus">
          <router-link to="/login">로그인</router-link>
        </div>
        <div v-if="loginStatus" @click="logout" class="pointer">로그아웃</div>
        <div v-if="!loginStatus">
          <router-link to="/join">회원가입</router-link>
        </div>
        <div><router-link to="/">주문조회</router-link></div>
        <div v-if="loginStatus">
          <router-link :to="mypage">마이페이지</router-link>
        </div>
      </div>
      <div class="search_area">
        <div class="logo"><router-link to="/">Eatzzy</router-link></div>
        <div class="header_search">
          <div class="search">
            <!-- 검색창 -->
            <div class="search_box">
              <div class="sch_input">
                <input
                  type="text"
                  id="search_form"
                  name="keyword"
                  value=""
                  class="search_input search_btn"
                  title="검색어를 입력하세요."
                  placeholder="검색어를 입력하세요."
                  autocomplete="off"
                  onselectstart="return false"
                  required=""
                  data-groupsno=""
                />
                <button
                  type="submit"
                  id="btnSearchTop"
                  title="검색"
                  value="검색"
                  alt="검색"
                  class="search_btn"
                >
                  <span id="resultCnt" class="result_cnt"></span>
                </button>
              </div>
              <button type="button" class="btn_top_search_close">
                <svg
                  width="19"
                  height="18"
                  viewBox="0 0 19 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.5 17L17.5 1"
                    stroke="#333333"
                    stroke-width="2"
                    stroke-linecap="round"
                  ></path>
                  <path
                    d="M17.5 17L1.5 1"
                    stroke="#333333"
                    stroke-width="2"
                    stroke-linecap="round"
                  ></path>
                </svg>
              </button>
            </div>
            <!-- //검색창 -->
          </div>
        </div>
        <div class="util_menu">
          <ul>
            <li class="join_btn" v-if="loginStatus">
              <router-link :to="mypage">마이페이지</router-link>
            </li>
            <li class="cart_btn">
              <router-link to="/carts"
                ><span class="num">{{ cartStore.cartProducts.length }}</span
                >장바구니</router-link
              >
            </li>
            <li class="delevery_btn">
              <router-link to="/">배송조회</router-link>
            </li>
          </ul>
        </div>
      </div>
      <nav>
        <ul class="l_nav_wrap">
          <li class="first_nav gnb_all_btn" id="gnb_all_btn" @click="gnbOpen">
            카테고리
          </li>
          <li><router-link to="/stores">맛집리스트</router-link></li>
          <li class="last_nav">
            <router-link to="/products">밀키트 상품</router-link>
          </li>
        </ul>
        <!-- GNB -->
        <div class="gnb hide" id="gnb">
          <div class="ctg_wrap">
            <ul class="depth1">
              <li>
                <router-link to="/">맛집리스트</router-link>
                <ul class="depth2">
                  <li><router-link to="/">한식</router-link></li>
                  <li><router-link to="/">중식</router-link></li>
                  <li><router-link to="/">일식</router-link></li>
                  <li><router-link to="/">양식</router-link></li>
                  <li><router-link to="/">아시아</router-link></li>
                  <li><router-link to="/">분식</router-link></li>
                  <li><router-link to="/">패스트푸드</router-link></li>
                </ul>
              </li>
              <li>
                <router-link to="/">밀키트 상품</router-link>
                <ul class="depth2">
                  <li><router-link to="/">한식</router-link></li>
                  <li><router-link to="/">중식</router-link></li>
                  <li><router-link to="/">일식</router-link></li>
                  <li><router-link to="/">양식</router-link></li>
                  <li><router-link to="/">아시아</router-link></li>
                  <li><router-link to="/">분식</router-link></li>
                  <li><router-link to="/">패스트푸드</router-link></li>
                </ul>
              </li>
            </ul>
            <!-- //depth1-->
          </div>
        </div>
        <!-- //GNB -->
      </nav>
    </div>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  border-bottom: 0.0625rem solid #cecece;
  line-height: 1 !important;
  box-sizing: border-box;
}

header .top_login {
  display: flex;
  justify-content: flex-end;
  gap: 2.5rem;
  margin: 0.625rem auto;
  width: 100%;
}

header .search_area {
  height: 4.5rem;
  padding: 0.75rem 0 0 0;
  display: flex;
  justify-content: space-between;
}

header .search_area .header_search {
  max-width: 40rem;
  width: 45%;
}

header .search_area .logo {
  display: block;
  /* background: url(https://thenaum.cdn-nhncommerce.com/data/img/allnew/layout/n_fd_logo.gif) no-repeat 0 0; */
  background: url(/src/assets/icons/logo.png) no-repeat 0 0;
  font-size: 0;
}
header .search_area .logo a {
  display: inline-block;
  width: 10.25rem;
  height: 2.625rem;
}

header .search_area .search {
  position: relative;
}
header .search_area .search .search_box {
  display: flex;
  gap: 0.25rem;
  align-items: center;
  width: 100%;
  height: 2.625rem;
  border: 2px solid #ff7400;
  box-sizing: border-box;
  border-radius: 2.625rem;
  position: relative;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 0 1.875rem;
}
header .search_area .search .sch_input {
  display: flex;
  align-items: center;
  width: 100%;
}
header .search_area .search .search_box .search_input {
  flex-grow: 1;
  border: none;
  background: none;
  padding: 0;
  font-size: 0.8812rem;
  font-weight: 400;
  color: #333333;
  letter-spacing: -0.02em;
  height: 2.375rem;
  transition: margin 0.1s ease;
}

header .search_area .search .search_box .search_btn:after {
  content: "";
  display: block;
  width: 1.5625rem;
  height: 1.5625rem;
  background: url(/src/assets/icons/search_btn.svg) no-repeat;
  flex-shrink: 0;
}

header .search_area .search .search_box .search_btn {
  transition: top 0.1s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  object-fit: none;
}

header .search_area .search .btn_top_search_close {
  display: none;
}

header .search_area .util_menu {
  height: 1.8125rem;
}
header .search_area .util_menu > ul {
  display: flex;
  column-gap: 0.5rem;
}
header .search_area .util_menu > ul > li {
  position: relative;
}
header .search_area .util_menu > ul > li a {
  width: 1.6875rem;
  height: 1.8125rem;
  display: block;
  font-size: 0;
}
header .search_area .util_menu .join_btn {
  background-image: url(https://www.foodingfactory.com/data/img/allnew/layout/gnb_user.svg);
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: cover;
}
header .search_area .util_menu .cart_btn {
  background-image: url(https://www.foodingfactory.com/data/img/allnew/layout/gnb_cart.svg);
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: cover;
}
header .delevery_btn {
  background-image: url(https://www.foodingfactory.com/data/img/allnew/layout/gnb_delevery.svg);
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: cover;
}
header .search_area .util_menu .join_btn a,
header .search_area .util_menu .cart_btn a,
header .search_area .util_menu .delevery_btn a {
  width: 3rem !important;
  height: 3rem !important;
}

header .search_area .util_menu .cart_btn a .num {
  position: absolute;
  right: -0.0625rem;
  top: 0.3125rem;
  background: #ff7400;
  width: 1rem;
  height: 1rem;
  border-radius: 1rem;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
}

header nav {
  display: inline-block;
  width: 100%;
}

header nav .l_nav_wrap {
  width: 100%;
}

header nav .l_nav_wrap li {
  float: left;
  height: 3.125rem;
  line-height: 3.125rem;
  font-size: 1rem;
  font-weight: 400;
  margin: 0 2.0938rem;
  letter-spacing: -0.05rem;
  position: relative;
}

header nav .l_nav_wrap li.first_nav {
  font-size: 1.0625rem;
  font-weight: 500;
  color: #ff7400;
  position: relative;
  /* width: 14%; */
  width: 172px;
  margin: 0;
  text-align: center;
  cursor: pointer;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  box-sizing: border-box;
  letter-spacing: -0.05rem;
  text-indent: 1.875rem;
}

header nav .l_nav_wrap li.first_nav:before {
  content: "";
  width: 0.0625rem;
  height: 1.0625rem;
  background: #cccccc;
  position: absolute;
  top: 1rem;
  left: 0;
}

header nav .l_nav_wrap li.first_nav:after {
  content: "";
  width: 0.0625rem;
  height: 1.0625rem;
  background: #cccccc;
  position: absolute;
  top: 1rem;
  right: 0;
}

header nav .l_nav_wrap li.first_nav.on {
  background: url(/src/assets/icons/menu.svg) no-repeat 2.4375rem 1.125rem;
}

header nav .l_nav_wrap li .n_nav_newst {
  width: 0.9375rem;
  height: 0.9375rem;
  background: #ff7400;
  border-radius: 0.9375rem;
  display: inline-block;
  color: #fff;
  text-align: center;
  line-height: 0.9375rem;
  font-family: "Open Sans";
  font-size: 0.625rem;
  font-weight: bold;
  vertical-align: text-top;
  margin: 0.125rem 0.3125rem 0 0;
}

/* GNB */
nav .l_nav_wrap li.first_nav {
  background: url(/src/assets/icons/category.svg) no-repeat 2.4375rem 1.125rem;
}

nav .l_nav_wrap li.first_nav.off {
  background: url("https://thenaum.cdn-nhncommerce.com/data/img/allnew/layout/close_w.svg")
    no-repeat 2.5625rem 1.125rem #ff7400;
  color: #fff;
  background-size: 0.875rem;
}

nav .l_nav_wrap li.first_nav.off:before,
nav .l_nav_wrap li.first_nav.off:after {
  display: none;
}

/* 카테고리 */
header nav .gnb {
  position: relative;
}
header nav .gnb .ctg_wrap {
  width: 100%;
  border: 0.125rem solid #ff7400;
  box-sizing: border-box;
  position: absolute;
  top: 3.125rem;
  background: #fff;
  z-index: 900;
  padding: 1.875rem;
  left: 0;
}
header nav .gnb .ctg_wrap .depth1 {
  display: flex;
  column-gap: 2.5rem;
}
header nav .gnb .ctg_wrap .depth1 > li > a {
  font-weight: 700;
  font-size: 0.9375rem;
  display: inline-block;
  padding-bottom: 0.625rem;
  margin-bottom: 0.625rem;
  border-bottom: 0.0625rem solid #ccc;
  width: 100%;
}

header nav .gnb .ctg_wrap .depth1 > li:hover > a {
  color: #ff7400;
  font-weight: 700;
}

header nav .gnb .ctg_wrap .depth2 {
  display: flex;
  row-gap: 1.25rem;
  flex-wrap: wrap;
  width: 18.75rem;
}
header nav .gnb .ctg_wrap .depth2 > li {
  width: 9.375rem;
}
header nav .gnb .ctg_wrap .depth2 > li > a {
  font-size: 0.875rem;
}
header nav .gnb .ctg_wrap .depth2 > li:hover > a {
  color: #ff7400;
  font-weight: 700;
}

header nav .gnb .ctg_wrap .depth2 > li {
  display: flex;
}

/* 푸딩브랜드 */
header nav .gnb .ctg_wrap > ul li.fd_brand {
  position: static;
}

header nav .gnb .ctg_wrap > ul li.fd_brand .depth_2 {
  width: 19rem;
  left: 13.625rem;
  top: -0.125rem;
  height: calc(100% + 0.25rem);
  border-left: 0.0625rem solid #cbcbcb;
  padding: 0;
}

header nav .gnb .ctg_wrap > ul li.fd_brand .depth_2 li {
  border-bottom: 0.0625rem solid #e9e9e9;
  box-sizing: border-box;
}

header nav .gnb .ctg_wrap > ul li.fd_brand .depth_2 li:last-child {
  border-bottom: none;
}

header nav .gnb .ctg_wrap > ul li.fd_brand .depth_2 li a {
  display: inline-block;
  width: 100%;
  height: 100%;
  vertical-align: top;
  padding: 0 0 0 1.5625rem;
  box-sizing: border-box;
}

header nav .gnb .ctg_wrap > ul li.fd_brand .depth_2 li a p {
  display: inline-block;
  vertical-align: middle;
}

header nav .gnb .ctg_wrap > ul li.fd_brand .depth_2 li a p span {
  float: left;
  width: calc(100% - 4.6875rem);
  line-height: normal;
}

header nav .gnb .ctg_wrap > ul li.fd_brand .depth_2 li a p .title {
  display: inline-block;
  width: 100%;
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: -0.05rem;
  color: #333;
  line-height: 0.8125rem;
  margin: 0.375rem 0 0 0;
}

header nav .gnb .ctg_wrap > ul li.fd_brand .depth_2 li a p .sub {
  display: inline-block;
  width: 100%;
  font-size: 0.7188rem;
  font-weight: 400;
  letter-spacing: -0.025rem;
  color: #575757;
  line-height: 0.7188rem;
  margin: 0.4375rem 0 0 0;
}

header nav .gnb .ctg_wrap > ul li.fd_brand .depth_2 li.on {
  background: none;
}

header nav .gnb .ctg_wrap > ul li.fd_brand .depth_2 li.on a .title,
header nav .gnb .ctg_wrap > ul li.fd_brand .depth_2 li.on a .sub {
  color: var(--point-color);
}

header nav .gnb .ctg_wrap > ul li.fd_brand .depth_2 li a p:before {
  content: "";
  width: 2.6875rem;
  height: 2.6875rem;
  display: block;
  background: url(https://thenaum.cdn-nhncommerce.com/data/img/allnew/layout/brand_icon_allnew.png)
    no-repeat 0 0;
  float: left;
  margin: 0 1.375rem 0 0;
  background-size: cover;
}

header nav .gnb .ctg_wrap > ul li.fd_brand .depth_2 li.fooding a p:before {
  background-position-y: -59.125rem;
}

header nav .gnb .ctg_wrap > ul li.fd_brand .depth_2 li.single a p:before {
  background-position-y: -5.375rem;
}

header nav .gnb .ctg_wrap > ul li.fd_brand .depth_2 li.bunsic a p:before {
  background-position-y: -10.75rem;
}

header nav .gnb .ctg_wrap > ul li.fd_brand .depth_2 li.pub a p:before {
  background-position-y: -16.125rem;
}

header nav .gnb .ctg_wrap > ul li.fd_brand .depth_2 li.sicdang a p:before {
  background-position-y: -21.5rem;
}

header nav .gnb .ctg_wrap > ul li.fd_brand .depth_2 li.banjum a p:before {
  background-position-y: -26.875rem;
}

header nav .gnb .ctg_wrap > ul li.fd_brand .depth_2 li.pocha a p:before {
  background-position-y: -32.25rem;
}

header nav .gnb .ctg_wrap > ul li.fd_brand .depth_2 li.cafe a p:before {
  background-position-y: -37.625rem;
}

header nav .gnb .ctg_wrap > ul li.fd_brand .depth_2 li.sauce a p:before {
  background-position-y: -43rem;
}

header nav .gnb .ctg_wrap > ul li.fd_brand .depth_2 li.meat a p:before {
  background-position-y: -48.375rem;
}

header nav .gnb .ctg_wrap > ul li.fd_brand .depth_2 li.farm a p:before {
  background-position-y: -53.75rem;
}

.n_container_fix.fixed header nav .gnb .ctg_wrap {
  top: -0.75rem;
}

@media (max-width: 768px) {
  header .search_area .header_search {
    width: calc(100% - 12.5rem);
  }

  header nav .gnb .ctg_wrap .depth2 {
    width: auto;
  }
}

@media (max-width: 600px) {
  header .search_area {
    flex-direction: column;
    align-items: center;
    row-gap: 1rem;
    height: unset;
    min-height: 4.5rem;
    margin: 1rem 0;
  }

  header .search_area .header_search {
    width: 100%;
  }
}

@media (max-width: 500px) {
  header nav .l_nav_wrap {
    display: flex;
    justify-content: space-between;
  }

  header nav .l_nav_wrap li {
    margin: unset;
    text-align: center;
    flex: 1;
  }

  nav .l_nav_wrap li.first_nav,
  nav .l_nav_wrap li.first_nav.off {
    background-position: 1.8rem 1.125rem;
  }

  header nav .gnb .ctg_wrap {
    top: 0;
  }
}
</style>
