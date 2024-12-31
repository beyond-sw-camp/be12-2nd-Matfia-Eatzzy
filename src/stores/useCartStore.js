import { defineStore } from "pinia";
import axios from "axios";

export const useCartStore = defineStore("carts", {
  state: () => ({
    cartProducts: [],
    isMadal: false,
    isAllChecked: true,
    deliveryFee: 4000,
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
  },
  actions: {
    async getCartProducts() {
      const response = await axios.get(
        "https://193e67e5-10ed-40ed-ad63-dc23723ce82b.mock.pstmn.io/carts"
      );

      this.cartProducts = response.data.cartProducts;
    },

    openModal() {
      this.isMadal = true;
    },
    closeModal() {
      this.isMadal = false;
    },
  },
});
