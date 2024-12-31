import axios from "axios";
import { defineStore } from "pinia";

export const useOrderStore = defineStore("order", {
  state: () => ({}),

  actions: {
    async getClientOrderList() {
      const response = await axios.get("/psy/client/orders").catch((error) => {
        console.error("고객 주문 내역 전체 조회 에러 ", error);
      });
      return response.data;
    },
    async getClientOrderDetail(orderId = 1) {
      const response = await axios
        .get(`/psy/client/orders/${orderId}`)
        .catch((error) => {
          console.error("고객 주문 내역 상세 조회 에러", error);
        });
      return response.data;
    },
  },
});
