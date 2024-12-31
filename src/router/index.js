import { createRouter, createWebHistory } from "vue-router";

import Carts from "../pages/cart/Carts.vue";
import MainView from "../pages/common/Main.vue";
import Mypage from "../pages/mypage/Mypage.vue";
import Client from "../pages/mypage/client/Client.vue";
import ClientInfo from "../pages/mypage/client/ClientInfo.vue";
import ClientOrder from "../pages/mypage/client/ClientOrder.vue";
import ClientOrderDetail from "../pages/mypage/client/ClientOrderDetail.vue";
import ClientProductInfo from "../pages/mypage/client/ClientProductInfo.vue";
import ClientProductsReview from "../pages/mypage/client/ClientProductsReview.vue";
import ClientStoreReview from "../pages/mypage/client/ClientStoreReview.vue";
import ClientStoreRez from "../pages/mypage/client/ClientStoreRez.vue";
import ClientStorelike from "../pages/mypage/client/ClientStorelike.vue";
import CreateReview from "../pages/mypage/client/CreateReview.vue";
import OrderDetails from "../pages/mypage/seller/OrderDetails.vue";
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

const checkUserType = (from, to, next) => {
  // 고객인지 점주인지 확인 후 경로 이동
  const userType = false;
  if (userType) {
    return "/mypage/seller";
  }
  return "/mypage/client";
};

const checkLogin = async (from, to, next) => {
  const memberStore = useMemberStore();
  await memberStore.loginCheck();
  if (memberStore.isLogin) {
    return next();
  }

  next("/login");
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
    redirect: checkUserType,
    children: [
      {
        path: "client",
        component: Client,
        children: [
          { path: "orders", component: ClientOrder },
          { path: "orders/:id", component: ClientOrderDetail },
          { path: "info", component: ClientInfo },
          { path: "store/rsv", component: ClientStoreRez },
          { path: "store/like", component: ClientStorelike },
          { path: "store/review", component: ClientStoreReview },
          { path: "product/info", component: ClientProductInfo },
          { path: "product/review", component: ClientProductsReview },
          { path: "product/review/create", component: CreateReview },
        ],
      },
      {
        path: "seller",
        component: Seller,
        children: [
          { path: "my-info/modify", component: SellerMyInfoModify },
          { path: "store", component: SellerStoreItem },
          { path: "store/rsv", component: SellerReservationCard },
          { path: "store/create", component: SellerInsertStore },
          { path: "store/modify", component: SellerModifyStore },
          { path: "menu/insert", component: SellerInsertMenu },
          { path: "order", component: ProductOrder },
          { path: "order/:id", component: OrderDetails },
          { path: "delivery/register", component: ShippingRegister },
          { path: "product", component: ProductList },
          { path: "product/register", component: ProductEdit },
          { path: "product/modify", component: ProductEdit },
          { path: "store_menu/:id", component: SellerMenuCard },
          { path: "menu_modify/:id", component: SellerModifyMenu },
        ],
      },
      { path: "/carts", component: Carts },
      { path: "/order", component: Order },
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
