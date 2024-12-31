import { defineStore } from "pinia";
import axios from "axios";

export const useLoveStore = defineStore("loves", {
  state: () => ({
    rezStores: [],
    likeStores: [],
  }),
  actions: {
    async getloveStores() {
      const response = await axios.get("https://193e67e5-10ed-40ed-ad63-dc23723ce82b.mock.pstmn.io/carts");

      this.rezStores = response.data.rez;
      this.likeStores = response.data.like;
      // console.log(this.cartProducts)
    },
  },
});
