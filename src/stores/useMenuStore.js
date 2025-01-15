import { defineStore } from "pinia";
import axios from "axios";

export const useMenuStore = defineStore("menu", {
  state: () => ({
    menus: [],
  }),
  actions: {
    async getMenuList() {
      const response = await axios.get(
        "/api/menulist"
      );
      this.menus = response.data;
    },
    async deleteMenu(menuId = 1) {
      const response = await axios.post(`/store/menu/1/delete`);
      return response.data;
    },
    getMenu(menuId = 1) {
      return this.menus.find((menu) => menu.id === menuId);
    },
  },
});
