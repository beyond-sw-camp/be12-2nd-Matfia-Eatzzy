<script setup>
import { computed, onMounted, ref } from "vue";
import { useMenuStore } from "../../../stores/useMenuStore";
import { useRoute, useRouter } from "vue-router";
import SellerMenuCard from "./components/SellerMenuCard.vue";

const menuStore = useMenuStore();
const route = useRoute(); // 라우터 파라미터 사용
const router = useRouter(); // 라우터 파라미터 사용

const storeId = route.params.id;
const addMenu = () => { 
  router.push(`/mypage/seller/store/${storeId}/menu/add`);
}
onMounted(async () => {
  await menuStore.getMenuList(storeId);
});
</script>

<template>
  <div class="content">
    <h1 class="title">메뉴 목록</h1>
    <button class="add_btn" @click="addMenu">+ 추가</button>
    <div v-if="menuStore.menus.length > 0" class="menu_list">
      <SellerMenuCard
        v-for="menu in menuStore.menus"
        :menu="menu"
      />
    </div>
    <div v-else class="none_menu">등록된 메뉴가 없습니다</div>
  </div>
</template>

<style scoped>
.none_menu {
  text-align: center;
  font-size: 1.5rem;
  color: #888;
  padding: 1.25rem;
  border-radius: 0.3125rem;
  margin-top: 1.25rem;
}

.content {
  width: 100%;
  display: flex;
  flex-direction: column;
}

/* 제목 스타일 */
h1 {
  font-size: 1.4rem;
  font-weight: bold;
  color: #333;
}
.add_btn {
  align-self: flex-end;
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 0.3rem 0.8rem;
  margin: 0 1rem 1rem 0;
}

.add_btn:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.menu_list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 0 1rem 1.25rem 1rem;
}
</style>
