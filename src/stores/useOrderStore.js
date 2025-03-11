import axios from "axios";
import { defineStore } from "pinia";

export const useOrderStore = defineStore("order", {
  state: () => ({
    modalChecked: false,
    order: {},
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

    // ✅ fetchOrderDetails 추가 (원래 코드 이전)
    async fetchOrderDetails(idx) {
      console.log("📢 fetchOrderDetails 실행됨, orderIdx:", idx);

      try {
        const response = await axios.get(`/api/app/orders/${idx}`);
        console.log(response.data.result);
        this.order = response.data.result;
      } catch (error) {
        console.error("주문 정보를 가져오는 중 오류 발생:", error);
      }
    },
  },
});
