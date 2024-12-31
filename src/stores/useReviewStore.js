import axios from "axios";
import { defineStore } from "pinia";

export const useReviewStore = defineStore("review", {
  state: () => ({
    store: {},
    product: {
      name: "마라떡볶이",
      price: 14000,
      orderDate: "24.12.20",
      image:
        "https://thenaum.cdn-nhncommerce.com/data/goods/15/01/26/1000000463/1000000463_magnify_07.jpg",
    },
  }),

  actions: {
    async getStoreReview(storeId = 1) {
      const response = await axios
        .get(`/psy/stores/${storeId}/review`)
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

      return response.data;
    },
  },
});
