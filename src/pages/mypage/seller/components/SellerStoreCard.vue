<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
  store: {
    type: Object,
    required: true,
  },
});

const editStore = (storeId) => {
  // 해당 가게의 id를 URL 파라미터로 전달하여 editStore 페이지로 이동
  router.push({ name: 'storeEdit', params: { id: storeId } });
};
</script>

<template>
  <main>
    <div class="content">
      <div class="stores_list">
        <div class="stores">
          <div class="store">
            <div class="store_image_box">
              <img :src="store.image" class="store_image" alt="Store image" />
            </div>
            <div class="store_info_box">
              <div class="store_stars">
                <!-- 채워진 별 -->
                <div v-for="n in store.stars" :key="'filled-' + n" class="star_image_box">
                  <img 
                    src="../../../../assets/icons/star_fill.svg" 
                    class="star_image" 
                    alt="Filled star" />
                </div>
                <!-- 비어있는 별 -->
                <div 
                  v-for="n in (5 - store.stars)" 
                  :key="'empty-' + n" 
                  class="star_image_box">
                  <img 
                    src="../../../../assets/icons/star_empty.svg" 
                    class="star_image" 
                    alt="Empty star" />
                </div>
                <div class="review_score_write">{{ store.stars }}</div>
              </div>
              <div class="store_title">{{ store.name }}</div>
              <div class="store_content">
                <p>{{ store.description }}</p>
              </div>
            </div>
            <!-- 수정, 삭제 버튼 추가 -->
            <div class="store_buttons">
              <button class="edit_button" @click="editStore(store.id)">수정</button>
              <button class="delete_button" @click="deleteStore">삭제</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


<style scoped>
.mystore_box {
    width: 37.5rem;
    margin: 0 auto;
    text-align: left;
}

.content{
    width: 100%;
    margin: 1.875rem 0 0 0;
}

.mystore_title_style {
    margin: 5rem 0 1.875rem;
}

.mystore_title {
    font-size: 1.875rem;
    font-weight: 800;
}

.store {
    display: flex;
    /* 왼쪽과 오른쪽 배치 */
    align-items: flex-start;
    /* 수직 정렬 */
    margin-bottom: 1.25rem;
    /* 각 식당 간의 간격 */
    padding: .9375rem;
    border: .0625rem solid #ddd; /* 연한 회색 테두리 추가 */
    border-radius: .5rem; /* 테두리 둥글게 처리 */
    background-color: #fff; /* 배경색 흰색 */
}

.store_image_box {
    flex-shrink: 0;
    /* 이미지 크기 고정 */
    margin-right: 1.25rem;
    /* 이미지와 정보 사이 간격 */
}

.store_image {
    width: 7.5rem; /* 이미지 크기 키우기 */
    height: 7.5rem;
    object-fit: cover;
    /* 비율 맞추기 */
    border-radius: .5rem;
}

.store_info_box {
    flex-grow: 1;
    /* 남은 공간 차지 */
}

.store_stars {
    display: flex;
    align-items: center;
}

.star_image {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: .3125rem;
}

.review_score_write {
    margin-left: .3125rem;
    font-weight: bold;
}

.store_title {
    font-size: 1.25rem; /* 제목 크기 키우기 */
    font-weight: bold;
    margin-top: .625rem;
}

.store_content {
    font-size: 1rem; /* 내용 크기 키우기 */
    color: #666;
    margin-top: .625rem;
}

.store_buttons {
    display: flex;
    justify-content: flex-start;
    /* 왼쪽 정렬 */
    gap: .625rem;
    /* 버튼 사이 간격 */
    margin-top: .9375rem;
}

.edit_button,
.delete_button {
    padding: .5rem 1rem;
    font-size: .875rem;
    cursor: pointer;
    border: none;
    border-radius: .3125rem;
    transition: background-color 0.3s;
}

/* 수정 버튼 스타일 */
.edit_button {
    background-color: #4CAF50;
    /* 초록색 */
    color: white;
}

.edit_button:hover {
    background-color: #45a049;
    /* 마우스 오버 시 더 어두운 초록 */
}

/* 삭제 버튼 스타일 */
.delete_button {
    background-color: #f44336;
    /* 빨간색 */
    color: white;
}

.delete_button:hover {
    background-color: #e53935;
    /* 마우스 오버 시 더 어두운 빨간색 */
}

  </style>