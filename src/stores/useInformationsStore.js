import { defineStore } from "pinia";
import axios from "axios";

export const useInformationsStore = defineStore("informations", {
  state: () => ({
    informations: [],
  }),
  actions: {
    async getInformationsList() {
      const response = await axios.get(
        "https://run.mocky.io/v3/f79fe920-ccf3-4dd5-91e6-a706ec06c2da"

      );
      this.informations = response.data;
    },
  },
});
