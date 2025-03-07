import axios from "axios";
import { defineStore } from "pinia";

export const useStoresStore = defineStore("stores", {
  state: () => ({
    stores: [],
    mystores:[],
    storeTab: "description",
    sort: "",
  }),

  actions: {
    async getStoreList(filter) {
      const response = await axios.get("/api/stores", filter).catch((error) => {
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
