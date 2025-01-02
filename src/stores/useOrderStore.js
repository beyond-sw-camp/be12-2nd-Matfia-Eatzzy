import axios from "axios";
import { defineStore } from "pinia";

export const useOrderStore = defineStore("order", {
  state: () => ({
    modalChecked: false,
  }),

  actions: {
    async getClientOrderList() {
      const response = await axios.get("/api/client/orders").catch((error) => {
        console.error("고객 주문 내역 전체 조회 에러 ", error);
      });
      return response.data;
    },
    async getClientOrderDetail(orderId = 1) {
      const response = await axios
        .get(`/api/client/orders/${orderId}`)
        .catch((error) => {
          console.error("고객 주문 내역 상세 조회 에러", error);
        });
      return response.data;
    },
    modal() {
      this.modalChecked = !this.modalChecked;
    },
  },
});
