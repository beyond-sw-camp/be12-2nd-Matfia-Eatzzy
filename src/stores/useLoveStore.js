import { defineStore } from "pinia";
import axios from "axios";

export const useLoveStore = defineStore("loves", {
  state: () => ({
    rezStores: [],
    likeStores: [],
  }),
  actions: {
    async getloveStores() {
      const response = await axios.get("/api/app/likes/mypage/store");
      this.likeStores = response.data.result;
      console.log(response.data.result);
      console.log(this.likeStores);
    },
  },
});
