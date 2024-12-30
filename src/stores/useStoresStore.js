import axios from "axios";
import { defineStore } from "pinia";

export const useStoresStore = defineStore("stores", {
  state: () => ({
    stores: [],
    storeTab: "description",
    sort: "",
  }),

  actions: {
    async getStoreList(filter) {
      const response = await axios
        .get(
          "https://2deee6c7-ce64-440b-80cd-b66969cb5b6e.mock.pstmn.io/store",
          filter
        )
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
      return response.data;
    },

    async getStoreBestList() {
      await axios
        .get(
          "https://02bbbbe3-c971-4a76-b853-6bbbc83b2afd.mock.pstmn.io/storeBest",
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

    async getStoreDetail(storeId) {
      const response = await axios
        .get(
          `https://2deee6c7-ce64-440b-80cd-b66969cb5b6e.mock.pstmn.io/store/${storeId}`
        )
        .catch((error) => {
          console.error("getStoreDetail api error", error);
        });
      return response.data;
    },

    setStoreTab(tab) {
      this.storeTab = tab;
    },
  },
});
