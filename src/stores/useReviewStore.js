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
        .get(`https://run.mocky.io/v3/db76d8b3-2699-4ac2-8fd9-699dd091cbb1`)
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

      return response.data;
    },

    async registerReview() {
      const response = await axios.post(
        "https://785d3be0-6ccd-486d-89c2-15310bc84a45.mock.pstmn.io/mypage/review",
        {
          title: "고도식 고깃집",
          content: "너무 맛있어요~",
          image: "",
        }
      );
      return response.data;
    },
  },
});
