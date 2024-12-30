import axios from "axios";
import { defineStore } from "pinia";

export const useStoresStore = defineStore("stores", {
  state: () => ({
    stores: [],
    storeTab: "description",
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
          "https://1846f82f-744f-4069-b790-aea1f893e984.mock.pstmn.io/storeBest",
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

    async getSellerStoresList() {
      const response = await axios.get(
        "https://28953cd5-1d7d-4987-b0bd-d7c0dc5512be.mock.pstmn.io/storeitem"
      );
      this.stores = response.data;
    },

    setStoreTab(tab) {
      this.storeTab = tab;
    },
  },
});
