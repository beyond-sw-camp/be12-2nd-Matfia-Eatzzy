import { defineStore } from "pinia";
import axios from "axios";

export const useInformationsStore = defineStore("informations", {
  state: () => ({
    informations: [],
  }),
  actions: {
    async getInformationsList() {
      const response = await axios.get("/api/mypageinfo");
      this.informations = response.data;
    },
  },
});
