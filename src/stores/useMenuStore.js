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
    async deleteMenu(deleteidx) {
      const request = ({
        menuIdx: deleteidx.menuIdx
      })
      const response = await axios.delete(`/api/app/menu/delete`,{
        data: request
      });
      return response.data;
    },
    getMenu(menuId = 1) {
      return this.menus.find((menu) => menu.id === menuId);
    },
  },
});
