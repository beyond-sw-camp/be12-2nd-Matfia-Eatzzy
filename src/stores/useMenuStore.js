import { defineStore } from "pinia";
import axios from "axios";

export const useMenuStore = defineStore("menu", {
  state: () => ({
    menus: [],
  }),
  actions: {
    async getMenusList() {
      const response = await axios.get(
        "https://run.mocky.io/v3/651c1cd7-5a0e-4cda-910f-a0b4483c740e"

      );
      this.menus = response.data;
    },
    async deleteMenu(menuId = 1) { 
      const response = await axios.post(`/store/1/menu/1/delete`);
      return response.data;
    }
    
  },
});
  