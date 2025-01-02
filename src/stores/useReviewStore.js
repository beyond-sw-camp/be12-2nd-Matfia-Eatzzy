import axios from "axios";
import { defineStore } from "pinia";

export const useReviewStore = defineStore("review", {
  state: () => ({
    store: { reservation: "", review_image: "", store_name: "" },
    product: {},
  }),

  actions: {
    async getStoreReview(storeId = 1) {
      const response = await axios
        .get(`/api/stores/${storeId}/review`)
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
    setStore(newStore) {
      this.store = newStore;
    },
    setProduct(newProduct) {
      this.product = newProduct;
    },
  },
});
