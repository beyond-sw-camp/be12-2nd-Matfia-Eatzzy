import { defineStore } from "pinia";
import axios from "axios";

export const useReviewableStore = defineStore("reviewable", {
  state: () => ({
    reviewableStores: [],
    reviewableProducts: [],
  }),
  actions: {
    async getreviewableStores() {
      const response = await axios.get("/osj/reviewable");

      this.reviewableStores = response.data.stores;
      this.reviewableProducts = response.data.products;
      // console.log(this.cartProducts)
    },
  },
});
