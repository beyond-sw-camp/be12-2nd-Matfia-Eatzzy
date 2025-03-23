<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "../../../stores/useCartStore";
import { useMemberStore } from "../../../stores/useMemberStore";
const memberStore = useMemberStore();
const cartStore = useCartStore();

const router = useRouter();
const searchKeyword = ref("");

const logout = () => {
  memberStore.logout();
};

const userType = sessionStorage.getItem("LOGIN")?.toLowerCase() || null;
const mypage = "/mypage/" + userType;
const orders = "/mypage/" + userType + "/orders";
const admin = "/admin/";
const loginStatus = sessionStorage.getItem("LOGIN")?.length > 0;

const gnbOpen = () => {
  let gnb = document.querySelector("#gnb");
  if (gnb) {
    gnb.classList.toggle("hide");
    button.classList.toggle("off");
  }
};

// 검색 버튼 클릭 -> Search 라우트로 이동, query에 검색어 전달
function goSearch() {
  router.push({
    name: "Search", // router 설정에서 path, name이 어떻게 되어있는지 확인
    query: {
      keyword: searchKeyword.value,
    },
  });
}
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
        <div v-if="loginStatus">
          <router-link :to="orders">주문조회</router-link>
        </div>
        <div v-if="loginStatus">
          <router-link :to="mypage" v-if="userType !== 'admin'"
            >마이페이지</router-link
          >
          <router-link :to="admin" v-if="userType == 'admin'"
            >관리자페이지</router-link
          >
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
                  v-model="searchKeyword"
                  placeholder="검색어를 입력하세요."
                  autocomplete="off"
                  onselectstart="return false"
                  required=""
                  data-groupsno=""
                />
                <button
                  type="submit"
                  id="btnSearchTop"
                  @click="goSearch"
                  keyword="검색"
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
                ><span class="num">{{ cartStore.cartCount }}</span
                >장바구니</router-link
              >
            </li>
            <li class="delevery_btn" v-if="loginStatus">
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
                <router-link to="/stores">맛집리스트</router-link>
                <ul class="depth2">
                  <li><router-link to="/stores">한식</router-link></li>
                  <li><router-link to="/stores">중식</router-link></li>
                  <li><router-link to="/stores">일식</router-link></li>
                  <li><router-link to="/stores">양식</router-link></li>
                  <li><router-link to="/stores">아시아</router-link></li>
                  <li><router-link to="/stores">분식</router-link></li>
                  <li><router-link to="/stores">패스트푸드</router-link></li>
                </ul>
              </li>
              <li>
                <router-link to="/products">밀키트 상품</router-link>
                <ul class="depth2">
                  <li><router-link to="/products">한식</router-link></li>
                  <li><router-link to="/products">중식</router-link></li>
                  <li><router-link to="/products">일식</router-link></li>
                  <li><router-link to="/products">양식</router-link></li>
                  <li><router-link to="/products">아시아</router-link></li>
                  <li><router-link to="/products">분식</router-link></li>
                  <li><router-link to="/products">패스트푸드</router-link></li>
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
  background: url("/src/assets/icons/logo.png") no-repeat 0 0;
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
  background: url("/src/assets/icons/search_btn.svg") no-repeat;
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
  background-image: url("/src/assets/icons/gnb_user.svg");
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: cover;
}
header .search_area .util_menu .cart_btn {
  background-image: url("/src/assets/icons/gnb_cart.svg");
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: cover;
}
header .delevery_btn {
  background-image: url("/src/assets/icons/gnb_delevery.svg");
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
  background: url("/src/assets/icons/menu.svg") no-repeat 2.4375rem 1.125rem;
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
  background: url("/src/assets/icons/category.svg") no-repeat 2.4375rem 1.125rem;
}

nav .l_nav_wrap li.first_nav.off {
  background: url("/src/assets/icons/close_w.svg") no-repeat 2.5625rem 1.125rem
    #ff7400;
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
