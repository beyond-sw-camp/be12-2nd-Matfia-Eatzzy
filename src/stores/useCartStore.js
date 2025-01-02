import { defineStore } from "pinia";
import axios from "axios";

export const useCartStore = defineStore("carts", {
  state: () => ({
    cartProducts: [],
    isMadal: false,
    isAllChecked: true,
    deliveryFee: 4000,
    cartChecked: {},
    totalPrice: 0,
  }),
  getters: {
    calTotalPrice() {
      return this.cartProducts.reduce(
        (sum, product) => sum + (product.totalPrice || 0),
        0
      );
    },

    getTotalPrice() {
      console.log(this.calTotalPrice);
      return this.calTotalPrice + this.deliveryFee;
    },

    getCartCheck: (state) => {
      // 반환값이 '함수'인 게터
      return (productId) => state.cartChecked[productId];
    },
  },

  actions: {
    async getCartProducts() {
      const response = await axios.get("/test/cart");
      this.cartProducts = response.data.cartProducts;
      for (const cartProduct of this.cartProducts) {
        this.cartChecked[cartProduct.productId] = true;
        this.totalPrice += cartProduct.price * cartProduct.quantity;
        console.log(this.totalPrice);
      }
    },
    allCheck() {
      this.isAllChecked = !this.isAllChecked;

      // 모든 상품에 대해 동일한 체크 상태를 부여
      for (const cartProduct of this.cartProducts) {
        this.cartChecked[cartProduct.productId] = this.isAllChecked;
      }
      this.updateTotalPrice();
    },
    // 총 가격 업데이트
    updateTotalPrice() {
      this.totalPrice = this.cartProducts.reduce((sum, product) => {
        if (this.cartChecked[product.productId]) {
          return sum + product.price * product.quantity;
        }
        console.log(sum);
        return sum;
      }, 0);
      let tmp = 0;
      console.log(tmp);

      for (const cartProduct of this.cartProducts) {
        if (this.cartChecked[cartProduct.productId])
          tmp += cartProduct.price * cartProduct.quantity;
        console.log(tmp);
      }
      this.totalPrice = tmp;
    },

    checkIsAllchecked() {
      for (const checked of this.cartChecked) {
        if (!checked) this.isAllChecked = false;
      }

      this.isAllChecked = true;
    },

    openModal() {
      this.isMadal = true;
    },
    closeModal() {
      this.isMadal = false;
    },
    toggleCheck(productId) {
      this.cartChecked[productId] = !this.cartChecked[productId];
      // 모든 상품이 체크되어 있다면 isAllChecked = true, 아니면 false
      const allChecked = this.cartProducts.every(
        (product) => this.cartChecked[product.productId] === true
      );
      this.isAllChecked = allChecked;
      console.log(this.updateTotalPrice());
    },
    changeQuantity(productId, diff) {
      const product = this.cartProducts.find((p) => p.productId === productId);
      if (!product) return;

      if (product.quantity + diff <= 0) {
        alert("최소 수량은 1개입니다.");
        return;
      }
      product.quantity += diff;
      product.totalPrice = product.quantity * product.price;
      this.updateTotalPrice();
    },
  },
});
