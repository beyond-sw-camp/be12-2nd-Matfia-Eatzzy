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
        .get("/psy/bigCategory")
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
        .get("/psy/smallCategory", {
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
