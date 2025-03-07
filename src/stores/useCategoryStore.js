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
    smallCate: {
      idx: 0,
      name: "전체",
    },
  }),

  actions: {
    async getBigCategory() {
      await axios
        .get("/api/app/category/list")
        .then((response) => {
          console.log(response);
          this.bigCategory = response.data.result;
          return response.data.result;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },

    getSmallCategory() {
      const selectBigCate = this.bigCategory.find(
        (category) => category.idx === this.bigCate.idx
      );
      this.smallCategory = selectBigCate
        ? selectBigCate.childrenCategoryList
        : [];
      console.log(this.smallCategory);
    },

    setBigCate(cate) {
      this.bigCate = cate;
    },

    setSmallCate(cate) {
      this.smallCate = cate;
      console.log(this.smallCate);
    },
  },
});
