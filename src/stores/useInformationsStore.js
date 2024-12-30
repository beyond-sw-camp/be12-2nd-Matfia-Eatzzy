import { defineStore } from "pinia";
import axios from "axios";

export const useInformationsStore = defineStore("informations", {
  state: () => ({
    informations: [],
  }),
  actions: {
    async getInformationsList() {
      const response = await axios.get(
        "https://28953cd5-1d7d-4987-b0bd-d7c0dc5512be.mock.pstmn.io/mypageinfo"

      );
      this.informations = response.data;
    },
  },
});
