<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const props = defineProps({
  store: {
    type: Object,
    required: true,
  },
});

const editStore = (storeIdx) => {
  // 해당 가게의 id를 URL 경로로 전달하여 이동
  router.push(`/mypage/seller/store/modify/${storeIdx}`);
};

const insertMenu = () => {
  // 해당 가게의 id를 URL 경로로 전달하여 이동
  router.push(`/mypage/seller/menu/insert`);
};

const menuStore = (storeIdx) => {
  // 해당 가게의 id를 URL 경로로 전달하여 이동
  router.push(`/mypage/seller/store/${storeIdx}/menu`);
};

const deleteStore = (menuIdx) => {
  const conf = confirm("가게를 삭제하시겠습니까?")
  if (conf) {
    alert("삭제되었습니다.");
  }
}
</script>

<template>
  <div class="store">
    <div class="store_image_box">
      <img :src="store.imagePath" class="store_image" alt="Store image" />
    </div>
    <div class="store_info_box">
      <router-link :to="`/stores/${store.id}`" class="store_title">{{ store.name }}</router-link>
      <div class="store_stars">
        <!-- 채워진 별 -->
        <div
          v-for="n in store.starPoint"
          :key="'filled-' + n"
          class="star_image_box"
        >
          <img
            src="../../../../assets/icons/star_fill.svg"
            class="star_image"
            alt="Filled star"
          />
        </div>
        <!-- 비어있는 별 -->
        <div
          v-for="n in 5 - store.starPoint"
          :key="'empty-' + n"
          class="star_image_box"
        >
          <img
            src="../../../../assets/icons/star_empty.svg"
            class="star_image"
            alt="Empty star"
          />
        </div> 
        <div class="review_score_write">{{ store.stars }}</div> 
      </div>
      <p>{{ store.address }}</p>
    </div>
    <div class="store_buttons">
      <button class="edit_button" @click="menuStore(store.idx)">메뉴조회</button>
      <button class="edit_button" @click="editStore(store.idx)">가게수정</button>
      <button class="delete_button" @click="deleteStore">가게삭제</button>
    </div>
  </div>
</template>

<style scoped>
.store {
  display: flex;
  align-items: flex-start;
  padding: 1.4rem;
  border: 0.0625rem solid #ddd; /* 연한 회색 테두리 추가 */
  border-radius: 0.5rem; /* 테두리 둥글게 처리 */
  background-color: #fff; /* 배경색 흰색 */
  gap: 1rem;
}

.store_image_box {
  flex-shrink: 0;
  /* 이미지 크기 고정 */
}

.store_image {
  width: 5.5rem; /* 이미지 크기 키우기 */
  height: 5.5rem;
  object-fit: cover;
  border-radius: 0.5rem;
}

.store_info_box {
  height: 5.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.store_info_box > p {
  color: #666;
  font-size: 0.8rem;
}

.store_stars {
  display: flex;
}

.star_image {
  width: 1.25rem;
  height: 1.25rem;
}

.review_score_write {
  margin-left: 0.3125rem;
  font-weight: bold;
}

.store_title {
  font-size: 1.13rem; /* 제목 크기 키우기 */
  font-weight: bold;
  margin-bottom: 0.3rem;
  cursor: pointer;
}

.store_title:hover {
  text-decoration: underline;
}
.store_content {
  font-size: 1rem; /* 내용 크기 키우기 */
  color: #666;
}

.store_buttons {
  height: 5.5rem;
  display: flex;
  align-items: center;
  /* 왼쪽 정렬 */
  gap: 0.625rem;
  /* 버튼 사이 간격 */
}

.edit_button,
.delete_button {
  padding: 0.3rem 0.8rem;
  font-size: 0.875rem;
  cursor: pointer;
  border: none;
  border-radius: 0.3125rem;
  transition: background-color 0.3s;
}

/* 수정 버튼 스타일 */
.edit_button {
  background-color: white;
  color: black;
  border: 1px solid #666;
  font-weight: 500;
}

.edit_button:hover {
  background-color: rgba(0, 0, 0, 0.07);
  /* 마우스 오버 시 더 어두운 초록 */
}

/* 삭제 버튼 스타일 */
.delete_button {
  color: rgb(244, 67, 54);
  background-color: white;
  border: 1px solid #f44336;
}

.delete_button:hover {
  background-color: rgba(244,67,54,0.1);
  /* 마우스 오버 시 더 어두운 빨간색 */
}
</style>
