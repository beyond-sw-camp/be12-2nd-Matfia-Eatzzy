import axios from "axios";
import { defineStore } from "pinia";

export const useReservationStore = defineStore("reservation", {
  state: () => ({
    reservations: [],
  }),

  actions: {
    async reservation(rsvData) {
      const response = await axios.post("/api/reservation", rsvData);
      return response.data;
    },

    async getSellerReservationsList() {
      const response = await axios.get("/api/reservationitem");
      this.reservations = response.data;
    },
  },
});
