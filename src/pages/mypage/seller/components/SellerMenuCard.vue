<script setup>
import { useRouter } from "vue-router";
import { useMenuStore } from "../../../../stores/useMenuStore";

const props = defineProps({
  menu: {
    type: Object,
    required: true,
  },
});

const router = useRouter();
const menuStore = useMenuStore();

const editMenu = (menuId) => {
  console.log('click')
  // 해당 가게의 id를 URL 경로로 전달하여 이동
  router.push(`/mypage/seller/menu_modify/${menuId}`);
};

const deleteMenu = async (menuId) => {
  const conf = confirm("메뉴를 삭제하시겠습니까?");
  console.log(conf);
  if (conf) {
    const result = await menuStore.deleteMenu(menuId);
    if (result.isSuccess) {
      alert("삭제되었습니다.");
    }
  }
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
      <img
        src="/src/assets/icons/edit.svg"
        alt="edit"
        @click="editMenu(menu.id)"
      />
      <img
        src="/src/assets/icons/delete.svg"
        alt="delete"
        @click="deleteMenu(menu.id)"
      />
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
  padding: 0.625rem 1.5rem;
  border-top: 0.0625rem solid #ddd;
  gap: 0.6rem;
  transition: scale 0.5s;
}

.menu_buttons img {
  width: 1.8rem;
  height: 1.8rem;
  cursor: pointer;
}

.menu_buttons img:hover {
  scale: 1.1;
}

.menu_list p {
  font-size: 1rem;
  color: #555;
  text-align: center;
  margin-top: 3.125rem;
}
</style>
