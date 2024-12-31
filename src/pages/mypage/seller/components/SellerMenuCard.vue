<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  menu: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

const editMenu = (menuId) => {
  // 해당 가게의 id를 URL 경로로 전달하여 이동
  router.push(`/mypage/seller/menu_modify/${menuId}`);
};
</script>

<template>
  <div class="menu_card">
    <div class="menu_image_box">
      <img :src="menu.image" class="menu_image" alt="Menu image" />
    </div>
    <div class="menu_info_box">
      <div class="menu_title">{{ menu.name }}</div>
      <div class="menu_price">{{ menu.price.toLocaleString() }}원</div>
      <div class="menu_description">{{ menu.info }}</div>
    </div>
    <div class="menu_buttons">
      <button class="edit_button" @click="editMenu(menu.id)">수정</button>
      <button class="delete_button" @click="deleteMenu(menu.id)">삭제</button>
    </div>
  </div>
</template>

<style scoped>
/* 메뉴 카드 스타일 */
.menu_card {
  display: flex;
  background-color: #fff;
  border: 0.0625rem solid #ddd;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  width: 100%;
}

/* 메뉴 이미지 */
.menu_image_box {
  width: 9rem; /* 이미지의 고정된 너비 */
  height: 8rem;
  overflow: hidden;
}

.menu_image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-right: 0.0625rem solid #ddd; /* 이미지와 정보 구분선 */
}

/* 메뉴 정보 */
.menu_info_box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1.5rem;
  color: #555;
  flex-grow: 1; /* 남은 공간을 차지하도록 설정 */
  gap: 0.3rem;
}

.menu_title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
}

.menu_price {
  font-size: 1rem;
}

.menu_description {
  font-size: 0.8rem;
  color: #777;
  line-height: 1.5;
}

/* 버튼 스타일 */
.menu_buttons {
  display: flex;
  justify-content: space-between;
  align-items: center; /* 수직 가운데 정렬 */
  padding: 0.625rem 0.9375rem;
  border-top: 0.0625rem solid #ddd;
}

.edit_button,
.delete_button {
  padding: 0.1875rem 0.5rem; /* 버튼 높이를 줄임 */
  width: 3.75rem;
  height: 2rem;
  border: none;
  border-radius: 0.25rem; /* 더 작은 버튼 모서리 */
  font-size: 0.8rem; /* 버튼 글자 크기 작게 */
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.edit_button {
  border: 1px solid black;
}

.edit_button:hover {
  background-color: rgba(0, 0, 0, 0.1); /* 수정 버튼 hover 색상 (어두운 파란색) */
}

.delete_button {
  background-color: #dc3545; /* 삭제 버튼 색상 변경 (빨간색) */
  color: white;
}

.delete_button:hover {
  background-color: #c82333; /* 삭제 버튼 hover 색상 (어두운 빨간색) */
}
/* 버튼 간격 띄우기 */
.menu_buttons button {
  margin-right: 0.625rem;
}

.menu_list p {
  font-size: 1rem;
  color: #555;
  text-align: center;
  margin-top: 3.125rem;
}
</style>
