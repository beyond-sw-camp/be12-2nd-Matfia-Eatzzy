import { defineStore } from "pinia";
import axios from "axios";

export const useReviewedStore = defineStore("reviewed", {
  state: () => ({
    reviewedStores: [],
    reviewedProducts: [],
  }),
  actions: {
    async getreviewedStores() {
      const response = await axios.get("/osj/reviewed");

      this.reviewedStores = response.data.stores;
      this.reviewedProducts = response.data.products;
      // console.log(this.cartProducts)
    },
  },
});
