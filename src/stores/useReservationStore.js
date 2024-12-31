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
        "https://28953cd5-1d7d-4987-b0bd-d7c0dc5512be.mock.pstmn.io/reservationitem"
      );
      this.reservations = response.data;
    },

  },
});
