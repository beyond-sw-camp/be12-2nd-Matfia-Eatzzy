<script setup>
import { ref, onMounted } from "vue";
import { useLoveStore } from "../../../../stores/useLoveStore";

const loveStore = useLoveStore();

const handleCancelClick = (likeId) => {
  // JavaScript 기본 confirm 대화상자 표시
  const isConfirmed = confirm("정말로 좋아요 항목에서 삭제할까요?");
  if (isConfirmed) {
    alert("삭제되었습니다."); // 확인 시 동작
    // 실제 취소 로직을 여기에 추가 가능
    // 예: API 호출 후 목록 갱신
  }
};
const moveClick = (likeId) => {
  // JavaScript 기본 confirm 대화상자 표시
  location.href = "/stores/1";
};

onMounted(() => {
  loveStore.getloveStores();
});
</script>

<template>
  <tr v-for="(like, index) in loveStore.likeStores" :key="index">
    <td>
      <a href="/stores/1" class="likeStore_info">
        <img :src="like.store_image" class="like_images" />
        <div class="store_name">
          <div class="likeStore_name">{{ like.store_name }}</div>
        </div>
      </a>
    </td>
    <td class="address">{{ like.addresses }}</td>
    <td class = "phone_td">
      <span class="phone">{{ like.call_number }}</span>
    </td>
    <td class="likeStore_buttons">
      <div class="buttons_layout">
      <button @click="moveClick(like.id)">예약하기</button>
      <button class="delete" @click="handleCancelClick(like.id)">삭제하기</button>
    </div>
    </td>
  </tr>
</template>

<style scoped>
.likeStore_info {
  display: flex;
  align-items: center;
  text-align: left;
}
.like_images {
  width: 6.25rem; 
  height: 6.25rem;
  object-fit: fill; 
  margin-right: 0.625rem;
  border: 0.0625rem solid #ddd;
  border-radius: 0.25rem;
}
.likeStore_name {
  font-weight: bold;
  font-size: 1.2rem;
}
.address {
  font-size: 0.9375rem;
}
.phone {
  color: black;
  font-weight: bold;
  font-size: 1rem;
}
.likeStore_buttons button {
  width: 5rem;
  padding: 0.3125rem 0.625rem;
  font-size: 0.875rem;
  cursor: pointer;
  border: 0.0625rem solid #ff7400;
  background-color: #ff7400;
  color: #fff;
  border-radius: 0.25rem;
}

.likeStore_buttons button.delete {
  color: black;
  background-color: white;
  border-color: black;
}

.likeStore_buttons button:hover {
  opacity: 0.8;
}
.buttons_layout {
  height: 100%;
  display: flex; 
  align-items: center;
  justify-content: center; 
  gap: 0.5rem; 
  
}

tr,
td {
  border-top: 1px solid #cecece;
  padding: 1.25rem;
  text-align: center;
  vertical-align: middle;
}
tr {
  display: table-row;
}

td {
  display: table-cell;
}
@media (max-width: 960px) {
  tr {
    display: grid;
    grid-template-columns: 1fr; /* 두 열로 구성 */
    padding: 0;
  }

  td {
    display: block;
    text-align: left;
    border: none;
    padding: 0;
  }
  .likeStore_info {
    display: block;
  }
  .likeStore_buttons button {
    margin: 0 0.625rem 0 0;
  }
}
</style>
