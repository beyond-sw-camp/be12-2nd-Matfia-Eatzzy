<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const userId = 1;
const apiUrl = `https://abc5b35f-117e-49a2-9442-364017e60701.mock.pstmn.io/my/like/stores/?userId=${userId}`;
const likes = ref([]);
const fetchLikes = async () => {
  try {
    const response = await axios.get(apiUrl);
    likes.value = response.data.stores;
  } catch (error) {
    console.error("리뷰 데이터를 가져오는 중 오류 발생:", error);
  }
};
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
onMounted(fetchLikes);
</script>

<template>
  <tr v-for="(like, index) in likes" :key="index">
    <td>
      <a href="/stores/1" class="likeStore_info">
        <img src="https://thenaum.cdn-nhncommerce.com/data/goods/15/01/26/1000000463/1000000463_magnify_07.jpg" />
        <div>
          <div class="likeStore_name">{{ like.store_name }}</div>
        </div>
      </a>
    </td>
    <td class="address">{{ like.store_address }}</td>
    <td>
      <span class="phone">{{ like.call_number }}</span>
    </td>
    <td class="likeStore_buttons">
      <button @click="moveClick(like.id)">예약하기</button>
      <button class="delete" @click="handleCancelClick(like.id)">삭제하기</button>
    </td>
  </tr>
</template>

<style scoped>
.likeStore_info {
  display: flex;
  align-items: center;
  text-align: left;
}
.likeStore_info img {
  width: 6.25rem;
  height: 6.25rem;
  object-fit: cover;
  margin-right: 0.625rem;
  border: 0.0625rem solid #ddd;
  border-radius: 0.25rem;
}
.likeStore_name {
  font-weight: bold;
  font-size: 1.25rem;
}
.address {
  font-size: 1.125rem;
}
.phone {
  color: #28a745;
  font-weight: bold;
  font-size: 1.25rem;
}
.likeStore_buttons button {
  padding: 0.3125rem 0.625rem;
  margin: 0.3125rem;
  font-size: 0.875rem;
  cursor: pointer;
  border: 0.0625rem solid #ff7400;
  background-color: #ff7400;
  color: #fff;
  border-radius: 0.25rem;
}

.likeStore_buttons button.delete {
  background-color: #dc3545;
  border-color: #dc3545;
}

.likeStore_buttons button:hover {
  opacity: 0.8;
}
tr,
td {
  border-top: 0.0625rem solid #cecece;
  padding: 1.875rem;
  text-align: center;
  vertical-align: middle;
}
</style>
