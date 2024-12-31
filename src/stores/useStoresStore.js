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
          "https://run.mocky.io/v3/1dafc773-b286-4735-ac99-62ab0a08bc64",
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
        "https://run.mocky.io/v3/f005ed62-b04d-4ec9-a30a-02941d649b79"
      );
      this.stores = response.data;
    },

    setStoreTab(tab) {
      this.storeTab = tab;
    },
  },
});
