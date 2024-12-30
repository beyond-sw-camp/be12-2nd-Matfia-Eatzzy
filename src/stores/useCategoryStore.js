import axios from "axios";
import { defineStore } from "pinia";

export const useCategoryStore = defineStore("category", {
  state: () => ({
    bigCategory: [],
    smallCategory: [],
    bigCate: {
      idx: 0,
      name: "전체",
    },
  }),

  actions: {
    async getBigCategory() {
      await axios
        .get("https://run.mocky.io/v3/411b95ab-4c34-4f25-8e81-bd5dfe5fb153")
        .then((response) => {
          this.bigCategory = response.data.category;
          return response.data.category;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },

    async getSmallCategory(refId = 1) {
      await axios
        .get("https://run.mocky.io/v3/62022424-b24d-4a1f-9454-8c02ae82bc20", {
          ref_id: refId,
        })
        .then((response) => {
          this.smallCategory = response.data.category;
          return response.data.category;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },

    setBigCate(cate) {
      this.bigCate = cate;
    },
  },
});
