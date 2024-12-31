import { defineStore } from "pinia";
import axios from "axios";

export const useReviewableStore = defineStore("reviewable", {
  state: () => ({
    reviewableStores: [],
    reviewableProducts: [],
  }),
  actions: {
    async getreviewableStores() {
      const response = await axios.get("https://193e67e5-10ed-40ed-ad63-dc23723ce82b.mock.pstmn.io/carts");

      this.reviewableStores = response.data.stores;
      this.reviewableProducts = response.data.products;
      // console.log(this.cartProducts)
    },
  },
});
