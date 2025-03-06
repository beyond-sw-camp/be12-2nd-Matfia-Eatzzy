import { defineStore } from "pinia";
import axios from "axios";

export const useAdminStore = defineStore("admin", {
  state: () => ({
    data: [],
  }),
  actions: {
    async getStoreListAll() {
      try {
        const response = await axios.get("/api/app/admin/store/list");
        return response.data;
      } catch (error) {
        console.error("API 요청 중 오류 발생:", error);
        return null;
      }
    },
    async getStoreDetail(id) {
      const response = await axios
        .get(`/api/app/admin/store/${id}`)
        .catch((error) => {
          console.error("API 요청 중 오류 발생", error);
        });
      return response.data;
    },
  },
});
