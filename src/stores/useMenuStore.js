import { defineStore } from "pinia";
import axios from "axios";

export const useMenuStore = defineStore("menu", {
  state: () => ({
    menus: [],
  }),
  actions: {
    async getMenusList() {
      const response = await axios.get(
        "https://run.mocky.io/v3/072e0c1f-690b-4b4d-a609-45369e1fc386"

      );
      this.menus = response.data;
    },
  },
});
  