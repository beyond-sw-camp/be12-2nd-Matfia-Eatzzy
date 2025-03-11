import { createRouter, createWebHistory } from "vue-router";

import Carts from "../pages/cart/Carts.vue";
import MainView from "../pages/common/Main.vue";
import Mypage from "../pages/mypage/Mypage.vue";
import Client from "../pages/mypage/client/Client.vue";
import ClientOrder from "../pages/mypage/client/ClientOrder.vue";
import ClientProductInfo from "../pages/mypage/client/ClientProductInfo.vue";
import ClientProductsReview from "../pages/mypage/client/ClientProductsReview.vue";
import ClientStoreReview from "../pages/mypage/client/ClientStoreReview.vue";
import ClientStoreRez from "../pages/mypage/client/ClientStoreRez.vue";
import ClientStorelike from "../pages/mypage/client/ClientStorelike.vue";
import CreateReview from "../pages/mypage/client/CreateReview.vue";
import ProductList from "../pages/mypage/seller/ProductList.vue";
import ProductOrder from "../pages/mypage/seller/ProductOrder.vue";
import Seller from "../pages/mypage/seller/Seller.vue";
import DeliveryRegister from "../pages/mypage/seller/DeliveryRegister.vue";
import Products from "../pages/product/Products.vue";
import ProductDetail from "../pages/product/components/ProductDetail.vue";
import StoreDetail from "../pages/store/StoreDetail.vue";
import Stores from "../pages/store/Stores.vue";
import Join from "../pages/user/Join.vue";
import JoinAgreement from "../pages/user/JoinAgreement.vue";
import JoinForm from "../pages/user/JoinForm.vue";
import Login from "../pages/user/LoginView.vue";
import Kakao from "../pages/user/LoginKakao.vue";
import LoginKakaoRedirect from "../pages/user/LoginKakaoRedirect.vue";

import ProductEdit from "../pages/mypage/seller/ProductEdit.vue";
import SellerInsertMenu from "../pages/mypage/seller/SellerInsertMenu.vue";
import SellerInsertStore from "../pages/mypage/seller/SellerInsertStore.vue";
import SellerModifyStore from "../pages/mypage/seller/SellerModifyStore.vue";
import SellerReservationCard from "../pages/mypage/seller/SellerReservationCard.vue";
import SellerStoreItem from "../pages/mypage/seller/SellerStores.vue";
import SellerEditMenu from "../pages/mypage/seller/SellerEditMenu.vue";
import Order from "../pages/order/Order.vue";
import OrderDetail from "../pages/mypage/components/OrderDetail.vue";
import MyInfo from "../pages/mypage/components/MyInfo.vue";
import SellerMenuList from "../pages/mypage/seller/SellerMenuList.vue";

import Admin from "../pages/admin/Admin.vue";
import AdminStoreList from "../pages/admin/store/List.vue";
import AdminStoreDetail from "../pages/admin/store/Detail.vue";
import AdminCategoryList from "../pages/admin/category/List.vue";

const checkUserType = (from, to, next) => {
  // 고객인지 점주인지 확인 후 경로 이동
  const userType = sessionStorage.getItem("UserType");
  if (userType === "seller") {
    return "/mypage/seller";
  } else if (userType === "client") {
    return "/mypage/client";
  } else {
    return next();
  }

  next("/");
};

const checkLogin = async (from, to, next) => {
  const loginStatus = sessionStorage.getItem("LOGIN");

  if (loginStatus === null) {
    return next("/login");
  }

  next();
};

const routes = [
  { path: "/", component: MainView },
  { path: "/stores", component: Stores },
  { path: "/stores/:id", component: StoreDetail },
  { path: "/login", component: Login },
  { path: "/login/kakao", component: Kakao },
  { path: "/login/kakao/:id", component: LoginKakaoRedirect },
  { path: "/join", component: Join },
  { path: "/join_agreement", component: JoinAgreement },
  { path: "/products/:id", component: ProductDetail },
  { path: "/join_form", component: JoinForm },
  { path: "/products", component: Products },
  {
    path: "/mypage",
    component: Mypage,
    beforeEnter: checkLogin,
    children: [
      {
        path: "client",
        component: Client,
        redirect: "/mypage/client/info",
        children: [
          { path: "orders", component: ClientOrder },
          { path: "orders/:id", component: OrderDetail },
          { path: "info", component: MyInfo },
          { path: "store/rsv", component: ClientStoreRez },
          { path: "store/like", component: ClientStorelike },
          { path: "store/review", component: ClientStoreReview },
          { path: "store/review/create", component: CreateReview },
          { path: "product/info", component: ClientProductInfo },
          { path: "product/review", component: ClientProductsReview },
          { path: "product/review/create", component: CreateReview },
        ],
      },
      {
        path: "seller",
        component: Seller,
        redirect: "/mypage/seller/info",
        children: [
          { path: "info", component: MyInfo },
          { path: "store", component: SellerStoreItem },
          { path: "store/rsv", component: SellerReservationCard },
          { path: "store/create", component: SellerInsertStore },
          { path: "store/modify/:id", component: SellerModifyStore },
          { path: "store/menu/insert", component: SellerInsertMenu },
          { path: "orders", component: ProductOrder },
          { path: "orders/:id", component: OrderDetail },
          {
            path: "orders/:id/delivery/register",
            component: DeliveryRegister,
          },
          { path: "product", component: ProductList },
          { path: "product/register", component: ProductEdit },
          { path: "product/modify", component: ProductEdit },
          { path: "store/:id/menu", component: SellerMenuList },
          { path: "store/:id/menu/add", component: SellerEditMenu },
          { path: "store/menu/:id/modify", component: SellerEditMenu },
        ],
      },
    ],
  },
  {
    path: "/admin",
    component: Admin,
    redirect: "/admin/store/list",
    children: [
      { path: "store/list", component: AdminStoreList },
      { path: "store/:id", component: AdminStoreDetail },
      { path: "category/list", component: AdminCategoryList },
    ],
  },
  { path: "/carts", component: Carts },
  { path: "/orders/:orderIdx", component: Order, beforeEnter: checkLogin },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 항상 최상단으로 이동
    return { top: 0 };
  },
});

export default router;
