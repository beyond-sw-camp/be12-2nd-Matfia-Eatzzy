import { defineStore } from "pinia";
import axios from "axios";

export const useCartStore = defineStore("carts", {
  state: () => ({
    cartProducts: [],
    isMadal: false,
  }),
  actions: {
    async getCartProducts() {
      const response = await axios.get(
        "https://193e67e5-10ed-40ed-ad63-dc23723ce82b.mock.pstmn.io/carts"
      );

      this.cartProducts = response.data.cartProducts;
      // console.log(this.cartProducts)
    },
    openModal() {
      this.isMadal = true;
    },
    closeModal() {
      this.isMadal = false;
    },
  },
});
