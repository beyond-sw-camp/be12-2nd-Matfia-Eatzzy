import axios from "axios";
import { defineStore } from "pinia";

export const useStoresStore = defineStore("stores", {
  state: () => ({
    stores: [],
    storeTab: "description",
    sort: ""
  }),

  actions: {
    async getStoreList(filter) {
      const response = await axios
        .get(
          "https://run.mocky.io/v3/c4012d8c-a313-494d-b215-88fcaa7a99d8",
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
          "https://run.mocky.io/v3/f453ad42-cf9a-474f-a9d4-15509a769963",
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
        .get(`https://run.mocky.io/v3/762d58f3-4f9a-46b2-b371-149cc8dde27f`)
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
