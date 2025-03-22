import axios from "axios";
import { defineStore } from "pinia";

export const useStoresStore = defineStore("stores", {
  state: () => ({
    stores: [],
    mystores: [],
    storeTab: "description",
    page: 0,
    size: 10,
    sort: "",
  }),

  actions: {
    async getStoreList(page, size, categoryIdx) {
      try {
        let params = `page=${page}&size=${size}`;

        // categoryIdx와 sort 값이 있으면 추가
        if (categoryIdx) params += `&categoryIdx=${categoryIdx}`;
        if (this.sort !== "") params += `&sort=${this.sort}`;

        const response = await axios.get(`/api/app/store/list?${params}`);

        console.log(response.data);
        return response.data.result;
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    },

    async getStoreBestList() {
      await axios
        .get(
          "/api/storeBest",
          {
            sort: "HOT",
            place: "서울",
            category: 1,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          this.stores = response.data.stores;
          return response.data.stores;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },

    async getStoreDetail(storeId = 1) {
      const response = await axios.get(`/api/stores/1`).catch((error) => {
        console.error("getStoreDetail api error", error);
      });
      return response.data;
    },

    async getSellerStoresList() {
      const response = await axios.get("/api/app/store/mypage/storelist");
      console.log(response.data);
      this.mystores = response.data.result;
    },

    setStoreTab(tab) {
      this.storeTab = tab;
    },
  },
});
