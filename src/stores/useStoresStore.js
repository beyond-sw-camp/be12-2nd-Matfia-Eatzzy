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
      const response = await axios.get("/psy/stores", filter).catch((error) => {
        console.error("Error fetching data:", error);
      });
      console.log(response.data);
      return response.data;
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
      const response = await axios
        .get(`/psy/stores/${storeId}`)
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
