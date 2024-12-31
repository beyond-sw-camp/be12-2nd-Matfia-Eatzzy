import { defineStore } from "pinia";
import axios from "axios";

export const useLoveStore = defineStore("loves", {
  state: () => ({
    rezStores: [],
    likeStores: [],
  }),
  actions: {
    async getloveStores() {
      const response = await axios.get("/osj/love");
      console.log(response);
      this.rezStores = response.data.rez;
      this.likeStores = response.data.like;
      // console.log(this.cartProducts)
    },
  },
});
