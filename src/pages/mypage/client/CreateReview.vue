<script setup>
import { useRoute, useRouter } from "vue-router";
import { useReviewStore } from "../../../stores/useReviewStore";
import ProductItem from "./components/ProductItem.vue";
import { onMounted, ref, watch } from "vue";

const reviewStore = useReviewStore();
const route = useRoute();
const router = useRouter();

const mode = ref(null);
const reviewData = ref({
  title: "",
  content: "",
  image: "",
  starPoint: "",
});

const createReview = async () => {
  const conf = confirm("리뷰를 등록하시겠습니까?");
  if (conf) {
    alert("리뷰가 등록되었습니다.");

    router.push(`/mypage/client/${mode.value}/review`);
  }
};

const updateModeAction = () => {
  const pathSegments = route.path.split("/");
  mode.value = pathSegments.includes("store") ? "store" : "product";
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  reviewData.value.image = file;
};

// 경로 변경 감지
watch(
  () => route.path,
  () => {
    updateModeAction();
  }
);

onMounted(() => {
  console.log(reviewStore.product);
  updateModeAction();
});
</script>

<template>
  <div>
    <div class="review_container">
      <h1>리뷰 작성</h1>
      <div class="line"></div>
      <div class="review_box">
        <ProductItem v-if="mode === 'product'" :product="reviewStore.product" />
        <div v-if="mode === 'store'" class="store">
          <img :src="reviewStore.store.review_image" alt="식당 이미지" />
          <div class="info_box">
            <p>{{ reviewStore.store.store_name }}</p>
            <p>{{ reviewStore.store.reservation }} 방문</p>
          </div>
        </div>

        <div class="input_box">
          <p>제목</p>
          <input v-model="reviewData.title" type="text" />
        </div>

        <div class="input_box">
          <p>별점</p>
          <select v-model="reviewData.starPoint">
            <option disabled value="">별점을 선택하세요</option>
            <option v-for="n in 5" :key="n" :value="n">{{ n }}점</option>
          </select>
        </div>

        <div class="input_box">
          <p>내용</p>
          <textarea v-model="reviewData.content" name="review"></textarea>
        </div>

        <div class="input_box">
          <p>사진 등록</p>
          <input type="file" @change="handleFileChange" />
        </div>
      </div>
      <div class="button_box">
        <button @click="createReview" class="btn">등록</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.review_container > h1 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.line {
  width: 100%;
  height: 2px;
  background-color: #ccc;
}

.store {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.store > img {
  width: 5rem;
  height: 5rem;
  border-radius: 0.5rem;
  object-fit: cover;
}

.info_box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.3rem;
}

.info_box > p:first-child {
  font-size: 1.2rem;
  font-weight: 700;
}

.review_box {
  width: 100%;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input_box * {
  width: 100%;
}

.input_box > input {
  border-radius: 0.5rem;
  width: 100%;
  height: 3rem;
  padding: 1rem;
}

.input_box > textarea {
  height: 10rem;
  resize: none;
  padding: 1rem;
}

.button_box {
  width: 100%;
  display: grid;
  place-content: center;
}
.btn {
  background-color: #ff7400;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  border-radius: 0.5rem;
  height: 3rem;
  width: 9rem;
  margin: 0 auto;
  transition: all 0.3s;
}

.btn:hover {
  background-color: #c96208;
}
</style>
