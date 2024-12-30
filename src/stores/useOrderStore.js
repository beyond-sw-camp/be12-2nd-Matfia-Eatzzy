import axios from "axios";
import { defineStore } from "pinia";

export const useOrderStore = defineStore("order", {
  state: () => ({}),

  actions: {
    async getClientOrderList() {
      const response = await axios
        .get("https://run.mocky.io/v3/534f645d-2021-4841-8d3f-433b257bbd93")
        .catch((error) => {
          console.error("고객 주문 내역 전체 조회 에러 ", error);
        });
      return response.data;
    },
    async getClientOrderDetail(orderId) {
      const response = await axios
        .get(`https://run.mocky.io/v3/b51e2dce-142b-4d80-b93b-f2ff5e6aa6db`)
        .catch((error) => {
          console.error("고객 주문 내역 상세 조회 에러", error);
        });
      return response.data;
    },
  },
});
