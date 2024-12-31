import { defineStore } from "pinia";
import axios from "axios";

export const useMenuStore = defineStore("menu", {
  state: () => ({
    menus: [],
  }),
  actions: {
    async getMenusList() {
      const response = await axios.get(
        "https://28953cd5-1d7d-4987-b0bd-d7c0dc5512be.mock.pstmn.io/menulist"

      );
      this.menus = response.data;
    },
  },
});
  