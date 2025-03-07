import { defineStore } from "pinia";
import axios from "axios";

export const useMenuStore = defineStore("menu", {
  state: () => ({
    menus: [],
  }),
  actions: {
    async getMenuList(id) {
      const response = await axios.get(`/api/app/menu/list/${id}`);
      console.log(response.data);
      this.menus = response.data.result;
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
