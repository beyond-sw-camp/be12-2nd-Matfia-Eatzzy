<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from 'vue-router'; 
import { useMenuStore } from "../../../../stores/useMenuStore"; // 스토어 경로 확인

const MenuStore = useMenuStore();
const router = useRouter()
const route = useRoute();  // 라우터 파라미터 사용
const storeId = ref(null);  // URL에서 id 파라미터 저장

// 메뉴 데이터를 가져오기 위한 computed 변수
const menuItems = computed(() => {
  return MenuStore.menus.filter(menu => menu.id === parseInt(storeId.value)); // storeId와 일치하는 메뉴만 필터링
});

onMounted(async () => {
  await MenuStore.getMenusList();
  storeId.value = route.params.id;  // URL에서 id 파라미터 가져오기
});

const editMenu = (menuId) => {
  // 해당 가게의 id를 URL 경로로 전달하여 이동
  router.push(`/mypage/seller/menu_modify/${menuId}`);
};

</script>

<template>
  <div class="content">
    <h1 class="title">메뉴 목록</h1>
    <div v-if="menuItems.length > 0" class="menu_list">
      <div v-for="menu in menuItems" :key="menu.id" class="menu_card">
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
    </div>
    <div v-else class="none_menu">
        등록된 메뉴가 없습니다
    </div>
  </div>
</template>

<style scoped>

.none_menu {
  text-align: center;  /* 텍스트 중앙 정렬 */
  font-size: 1.5rem;    /* 글자 크기 조정 */
  color: #888;          /* 텍스트 색상 */
  padding: 1.25rem;        /* 여백 추가 */
  border-radius: .3125rem;   /* 테두리 둥글게 */
  margin-top: 1.25rem;     /* 위쪽 여백 */
}
/* 기본적인 레이아웃 설정 */
.content {
  width: 43.75rem;
  margin: 0 auto;
  padding: 1.25rem;
  border-radius: .5rem;
}

/* 제목 스타일 */
h1 {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1.25rem;
  text-align: left;
}

/* 메뉴 리스트 레이아웃 */
.menu_list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: 1.25rem;
}

/* 메뉴 카드 스타일 */
.menu_card {
  display: flex;
  background-color: #fff;
  border: .0625rem solid #ddd;
  border-radius: .5rem;
  box-shadow: 0 .25rem .375rem rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  width: 100%;
}


/* 메뉴 이미지 */
.menu_image_box {
  width: 12.5rem; /* 이미지의 고정된 너비 */
  height: 9.375rem;
  overflow: hidden;
}

.menu_image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-right: .0625rem solid #ddd; /* 이미지와 정보 구분선 */
}

/* 메뉴 정보 */
.menu_info_box {
  padding: .9375rem;
  color: #555;
  flex-grow: 1; /* 남은 공간을 차지하도록 설정 */
}

.menu_title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: .625rem;
  color: #333;
}

.menu_price {
  font-size: 1.1rem;
  margin-bottom: .625rem;
}

.menu_description {
  font-size: 0.95rem;
  color: #777;
  line-height: 1.5;
}

/* 버튼 스타일 */
.menu_buttons {
  display: flex;
  justify-content: space-between;
  align-items: center; /* 수직 가운데 정렬 */
  padding: .625rem .9375rem;
  border-top: .0625rem solid #ddd;
}

.edit_button, .delete_button {
  padding: .1875rem .5rem; /* 버튼 높이를 줄임 */
  width: 3.75rem;
  height: 2.5rem;
  border: none;
  border-radius: .25rem; /* 더 작은 버튼 모서리 */
  font-size: 0.8rem; /* 버튼 글자 크기 작게 */
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.edit_button {
  background-color: #007bff; /* 수정 버튼 색상 변경 (파란색) */
  color: white;
}

.edit_button:hover {
  background-color: #0056b3; /* 수정 버튼 hover 색상 (어두운 파란색) */
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
  margin-right: .625rem;
}


.menu_list p {
  font-size: 1rem;
  color: #555;
  text-align: center;
  margin-top: 3.125rem;
}
</style>
