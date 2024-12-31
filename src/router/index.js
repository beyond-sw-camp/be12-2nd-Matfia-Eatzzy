import { createRouter, createWebHistory } from "vue-router";

import Carts from "../pages/cart/Carts.vue";
import MainView from "../pages/common/Main.vue";
import Mypage from "../pages/mypage/Mypage.vue";
import Client from "../pages/mypage/client/Client.vue";
import ClientInfo from "../pages/mypage/client/ClientInfo.vue";
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
import ShippingRegister from "../pages/mypage/seller/DeliveryRegister.vue";
import Products from "../pages/product/Products.vue";
import ProductDetail from "../pages/product/components/ProductDetail.vue";
import StoreDetail from "../pages/store/StoreDetail.vue";
import Stores from "../pages/store/Stores.vue";
import Join from "../pages/user/Join.vue";
import JoinAgreement from "../pages/user/JoinAgreement.vue";
import JoinForm from "../pages/user/JoinForm.vue";
import Login from "../pages/user/LoginView.vue";
import { useMemberStore } from "../stores/useMemberStore";

import ProductEdit from "../pages/mypage/seller/ProductEdit.vue";
import SellerInsertMenu from "../pages/mypage/seller/SellerInsertMenu.vue";
import SellerInsertStore from "../pages/mypage/seller/SellerInsertStore.vue";
import SellerModifyStore from "../pages/mypage/seller/SellerModifyStore.vue";
import SellerMyInfoModify from "../pages/mypage/seller/SellerMyInfoModify.vue";
import SellerReservationCard from "../pages/mypage/seller/SellerReservationCard.vue";
import SellerStoreItem from "../pages/mypage/seller/SellerStoreItem.vue";
import SellerMenuCard from "../pages/mypage/seller/components/SellerMenuCard.vue";
import SellerModifyMenu from "../pages/mypage/seller/SellerModifyMenu.vue";
import Order from "../pages/order/Order.vue";
import OrderDetail from "../pages/mypage/components/OrderDetail.vue";

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
        beforeEnter: checkLogin,
        children: [
          { path: "orders", component: ClientOrder, beforeEnter: checkLogin },
          {
            path: "orders/:id",
            component: OrderDetail,
            beforeEnter: checkLogin,
          },
          { path: "info", component: ClientInfo, beforeEnter: checkLogin },
          {
            path: "store/rsv",
            component: ClientStoreRez,
            beforeEnter: checkLogin,
          },
          {
            path: "store/like",
            component: ClientStorelike,
            beforeEnter: checkLogin,
          },
          {
            path: "store/review",
            component: ClientStoreReview,
            beforeEnter: checkLogin,
          },
          {
            path: "product/info",
            component: ClientProductInfo,
            beforeEnter: checkLogin,
          },
          {
            path: "product/review",
            component: ClientProductsReview,
            beforeEnter: checkLogin,
          },
          {
            path: "product/review/create",
            component: CreateReview,
            beforeEnter: checkLogin,
          },
        ],
      },
      {
        path: "seller",
        component: Seller,
        beforeEnter: checkLogin,
        children: [
          {
            path: "my-info/modify",
            component: SellerMyInfoModify,
            beforeEnter: checkLogin,
          },
          {
            path: "store",
            component: SellerStoreItem,
            beforeEnter: checkLogin,
          },
          {
            path: "store/rsv",
            component: SellerReservationCard,
            beforeEnter: checkLogin,
          },
          {
            path: "store/create",
            component: SellerInsertStore,
            beforeEnter: checkLogin,
          },
          {
            path: "store/modify/:id",
            component: SellerModifyStore,
            beforeEnter: checkLogin,
          },
          {
            path: "menu/insert",
            component: SellerInsertMenu,
            beforeEnter: checkLogin,
          },
          { path: "order", component: ProductOrder, beforeEnter: checkLogin },
          {
            path: "order/:id",
            component: OrderDetail,
            beforeEnter: checkLogin,
          },
          {
            path: "delivery/register",
            component: ShippingRegister,
            beforeEnter: checkLogin,
          },
          { path: "product", component: ProductList, beforeEnter: checkLogin },
          {
            path: "product/register",
            component: ProductEdit,
            beforeEnter: checkLogin,
          },
          {
            path: "product/modify",
            component: ProductEdit,
            beforeEnter: checkLogin,
          },
          {
            path: "store_menu/:id",
            component: SellerMenuCard,
            beforeEnter: checkLogin,
          },
          {
            path: "menu_modify/:id",
            component: SellerModifyMenu,
            beforeEnter: checkLogin,
          },
        ],
      },
      { path: "/carts", component: Carts },
      { path: "/order", component: Order, beforeEnter: checkLogin },
    ],
  },
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
