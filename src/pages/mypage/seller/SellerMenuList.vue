<script setup>
import { computed, onMounted, ref } from "vue";
import { useMenuStore } from "../../../stores/useMenuStore";
import { useRoute } from "vue-router";
import SellerMenuCard from "./components/SellerMenuCard.vue";

const MenuStore = useMenuStore();
const route = useRoute(); // 라우터 파라미터 사용
const storeId = ref(null); // URL에서 id 파라미터 저장

// 메뉴 데이터를 가져오기 위한 computed 변수
const menuItems = computed(() => {
  return MenuStore.menus.filter((menu) => menu.id === parseInt(storeId.value)); // storeId와 일치하는 메뉴만 필터링
});

onMounted(async () => {
  await MenuStore.getMenusList();
  storeId.value = route.params.id;
});
</script>

<template>
  <div class="content">
    <h1 class="title">메뉴 목록</h1>
    <div v-if="menuItems.length > 0" class="menu_list">
      <SellerMenuCard v-for="menu in menuItems" :key="menu.id" :menu="menu" />
    </div>
    <div v-else class="none_menu">등록된 메뉴가 없습니다</div>
  </div>
</template>

<style scoped>
.none_menu {
  text-align: center; /* 텍스트 중앙 정렬 */
  font-size: 1.5rem; /* 글자 크기 조정 */
  color: #888; /* 텍스트 색상 */
  padding: 1.25rem; /* 여백 추가 */
  border-radius: 0.3125rem; /* 테두리 둥글게 */
  margin-top: 1.25rem; /* 위쪽 여백 */
}
/* 기본적인 레이아웃 설정 */
.content {
  width: 100%;
}

/* 제목 스타일 */
h1 {
  font-size: 1.4rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1.25rem;
}

/* 메뉴 리스트 레이아웃 */
.menu_list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.25rem 1rem;
}
</style>
