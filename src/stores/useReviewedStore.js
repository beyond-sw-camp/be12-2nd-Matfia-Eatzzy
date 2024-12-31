import { defineStore } from "pinia";
import axios from "axios";

export const useReviewedStore = defineStore("reviewed", {
  state: () => ({
    reviewedStores: [],
    reviewedProducts: [],
  }),
  actions: {
    async getreviewedStores() {
      const response = await axios.get("https://193e67e5-10ed-40ed-ad63-dc23723ce82b.mock.pstmn.io/carts");

      this.reviewedStores = response.data.stores;
      this.reviewedProducts = response.data.products;
      // console.log(this.cartProducts)
    },
  },
});
