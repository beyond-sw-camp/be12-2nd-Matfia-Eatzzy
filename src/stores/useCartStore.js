import { defineStore } from "pinia";
import axios from "axios";

// localStorage에서 데이터 불러오기
const loadCartFromStorage = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : { items: [], totalPrice: 0 };
};

export const useCartStore = defineStore("carts", {
  state: () => ({
    deliveryFee: 4000,
    isMadal: false,
    isAllChecked: true,
    cartChecked: {},
    ...loadCartFromStorage(),
  }),
  //상태 접근 함수
  //상태는 localStorage...
  //localStorage 에 접근하는 함수를 피니아에
  //상태를 관리하는 중앙 저장소이기 때문에 상태를 localStorage 라고 정의하면
  //localStorage 에 대한 접근을 피니아에서 하는게 맞는거 같다.
  getters: {
    cartCount: (state) => state.items.length,
    //items.isChecked 확인 하는 메서드

    // ✅ 체크된 상품들의 총 가격 계산
    checkedTotalPrice: (state) => {
      return state.items
        .filter((item) => item.isChecked) // 체크된 상품만 계산
        .reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
  },

  //직접 state를 변경하는 것이 아니라, actions를 통해 비즈니스 로직을 캡슐화하여 상태를 변경
  actions: {
    // 장바구니 상태를 localStorage에 저장
    saveToLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.$state));
    },

    // 상품 추가
    addItem(item) {
      const existingItem = this.items.find((i) => i.idx === item.idx);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        //상품의 quantity 가
        this.items.push({ ...item, quantity: 1, isChecked: true });
      }
      this.totalPrice = this.items.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );
      this.saveToLocalStorage();
    },

    // ✅ `productCnt`만큼 추가하는 새로운 addItemWithCount 메서드
    addItemWithCount(item, productCnt) {
      const existingItem = this.items.find((i) => i.idx === item.idx);
      if (existingItem) {
        // ✅ 장바구니에 이미 있으면 `productCnt`만큼 추가
        existingItem.quantity += productCnt;
      } else {
        // ✅ 장바구니에 없으면 `productCnt`로 새 상품 추가
        this.items.push({ ...item, quantity: productCnt, isChecked: true });
      }
      this.updateTotalPrice(); // ✅ 총 가격 업데이트
      this.saveToLocalStorage(); // ✅ localStorage 저장
    },

    async orderCreate() {
      try {
        // ✅ isChecked가 true인 상품만 필터링
        const selectedItems = this.items.filter((item) => item.isChecked);

        // ✅ 선택된 상품이 없으면 주문 진행 X
        if (selectedItems.length === 0) {
          alert("선택된 상품이 없습니다. 주문할 상품을 선택해주세요.");
          return;
        }

        // ✅ 필요한 데이터만 포함한 배열 (idx, price)
        const orderItems = selectedItems.map((item) => ({
          quantity: item.quantity,
          productIdx: item.idx,
          price: item.price,
        }));

        // ✅ 총 가격 계산
        const totalPrice = selectedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        console.log("보내는 데이터:", JSON.stringify(orderItems));

        // ✅ 서버에서 예상하는 데이터 형식에 맞춰 요청 데이터 생성
        const requestData = {
          orderProductRegisterRequest: [...orderItems], // ✅ 반드시 리스트로 전달해야 함
          totalPrice: totalPrice,
        };

        // ✅ 서버로 주문 요청 보내기
        const response = await axios.post(
          `/api/app/orderproducts/orderregister`,
          requestData
        );

        return response.data.result.orderIdx;
      } catch (error) {
        console.error("주문 생성 중 오류 발생:", error);
        alert("주문 처리 중 문제가 발생했습니다. 다시 시도해주세요.");
        throw error;
      }
    },

    // 상품 삭제
    removeItem(idx) {
      this.items = this.items.filter((item) => item.idx !== idx);
      this.totalPrice = this.items.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );
      this.saveToLocalStorage();
    },

    // 장바구니 초기화
    clearCart() {
      this.items = [];
      this.totalPrice = 0;
      localStorage.removeItem("cart");
    },

    // ✅ 수량 증가 함수
    increaseQuantity(idx) {
      const item = this.items.find((i) => i.idx === idx);
      if (item) {
        item.quantity += 1;
        this.updateTotalPrice();
        this.saveToLocalStorage();
      }
    },

    // ✅ 수량 감소 함수 (최소 1개)
    decreaseQuantity(idx) {
      const item = this.items.find((i) => i.idx === idx);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        this.updateTotalPrice();
        this.saveToLocalStorage();
      }
    },

    // ✅ 선택된 상품만 합산하여 총 가격 업데이트
    updateTotalPrice() {
      this.totalPrice = this.items
        .filter((item) => item.isChecked) // ✅ 체크된 상품만 포함
        .reduce((sum, i) => sum + i.price * i.quantity, 0);
    },

    // ✅ 체크 상태 토글
    toggleCheck(idx) {
      const item = this.items.find((i) => i.idx === idx);
      if (!item) return;

      item.isChecked = !item.isChecked; // ✅ 체크 여부 토글
      this.updateTotalPrice(); // ✅ 체크된 상품만 총 가격에 포함
      this.saveToLocalStorage();
    },

    // ✅ 선택된 상품만 삭제
    removeSelectedItems() {
      // 선택된 상품만 삭제
      this.items = this.items.filter((item) => !item.isChecked);

      // 총 가격 업데이트
      this.updateTotalPrice();

      // 변경된 장바구니를 localStorage에 저장
      this.saveToLocalStorage();
    },

    openModal() {
      this.isMadal = true;
    },
    closeModal() {
      this.isMadal = false;
    },
  },
});
