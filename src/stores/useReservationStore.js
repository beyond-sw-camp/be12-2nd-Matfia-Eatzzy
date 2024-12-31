import axios from "axios";
import { defineStore } from "pinia";

export const useReservationStore = defineStore("reservation", {
  state: () => ({
    reservations: [],
  }),

  actions: {
    async reservation(rsvData) {
      const response = await axios.post(
        "/psy/reservation",
        rsvData
      );
      return response.data;
    },

    async getSellerReservationsList() {
      const response = await axios.get(
        "https://run.mocky.io/v3/467592c0-ede3-4f23-ac5a-b9edc22c6e62"
      );
      this.reservations = response.data;
    },

  },
});
