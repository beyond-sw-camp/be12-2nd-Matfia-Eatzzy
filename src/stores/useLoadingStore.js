import { defineStore } from "pinia";

export const useLoadingStore = defineStore("loading", {
  state: () => ({ component: "", isLoading: false }),

  actions: {
    startLoading(component) {
      this.component = component;
      this.isLoading = true;
    },
    stopLoading() {
      this.component = "";
      this.isLoading = false;
    },
    getIsLoading(component) {
      if (this.component === component && this.isLoading) {
        return true;
      }
      return false;
    },
  },
});
