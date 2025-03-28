<script setup>
import { computed, onMounted, ref, watch, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { useProductsStore } from "../../../stores/useProductsStore";

const route = useRoute();
const router = useRouter();
const currentPath = computed(() => route.path);

const productsStore = useProductsStore();
const productAction = ref("");
const productData = reactive({
  name: "",
  price: 0,
  stock: 0,
  expiration_date: "",
  cooking_time: 0,
  category: "",
  description: "",
  imagePaths: [],
});

const selectedFiles = ref(null);

const updateProductAction = () => {
  const match = currentPath.value.match(/\/product\/([^/]+)/);
  productAction.value = match ? match[1] : "";
};

const editProduct = async (event) => {
  event.preventDefault();
  if (productAction.value === "register") {
    const result = confirm("상품을 등록하시겠습니까?");
    if (result) {
      await productsStore.addProduct();
      alert("상품이 등록되었습니다.");
    }
  } else {
    const result = confirm("상품을 수정하시겠습니까?");
    if (result) {
      alert("상품이 수정되었습니다.");
    }
  }
};

const cancelEdit = () => {
  router.back();
};

// 경로 변경 감지
watch(
  () => route.path,
  () => {
    updateProductAction();
  }
);

const handleFileChange = (event) => {
  selectedFiles.value = event.target.files;
  const files = Array.from(event.target.files);
  productData.imagePaths = files.map((file) => file.name);

  console.log(selectedFiles.value);
};

onMounted(() => {
  updateProductAction();
  productData.value = productsStore.modifyProduct;
});
const submitForm = async () => {
  try {
    // productData를 전송하여 presigned URLs을 받습니다.
    const response = await axios.post("/api/products/create", productData);
    console.log("Upload successful:", response.data);

    // presigned URLs과 파일 목록을 가져옵니다.
    const presignedUrls = response.data.result.imageUrls;

    // 각 파일을 presigned URL을 사용하여 업로드합니다.
    console.log(selectedFiles.value);
    const uploadPromises = [];
    for (let i = 0; i < selectedFiles.value.length; i++) {
      const file = selectedFiles.value[i];
      const url = presignedUrls[i];

      const uploadPromise = axios.put(url, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      uploadPromises.push(uploadPromise);
    }

    // 모든 파일 업로드가 완료될 때까지 대기합니다.
    await Promise.all(uploadPromises);
    alert("모든 파일 업로드 완료!");

    // 업로드 완료 후 특정 페이지로 이동합니다.
    router.push("/product/" + response.data.result.idx);
  } catch (error) {
    console.error("Upload failed:", error);
  }
};
</script>

<template>
  <div class="edit_wrap">
    <h1>상품 {{ productAction === "register" ? "등록" : "수정" }}</h1>
    <div class="line"></div>
    <form class="form_box">
      <div class="form_group">
        <label for="name">상품명</label>
        <div class="input_box">
          <input
            v-model="productData.name"
            type="text"
            id="name"
            name="name"
            required
            maxlength="50"
            placeholder="상품명을 입력해주세요."
          />
        </div>
      </div>
      <div class="form_group">
        <label for="price">가격</label>
        <div class="input_box">
          <input
            v-model="productData.price"
            type="number"
            id="price"
            name="price"
            required
            min="0"
            step="10"
          />
        </div>
      </div>

      <div class="form_group">
        <label for="stock">재고 수량</label>
        <div class="input_box">
          <input
            v-model="productData.stock"
            type="number"
            id="stock"
            name="stock"
            required
            min="0"
          />
        </div>
      </div>
      <div class="form_group">
        <label for="expiry_date">유통기한</label>
        <div class="input_box">
          <input
            v-model="productData.expiration_date"
            type="date"
            id="expiry_date"
            name="expiry_date"
          />
        </div>
      </div>

      <div class="form_group">
        <label for="cooking_time">조리시간 (분)</label>
        <div class="input_box">
          <input
            v-model="productData.cooking_time"
            type="number"
            id="cooking_time"
            name="cooking_time"
            required
            min="0"
            step="10"
          />
        </div>
      </div>
      <div class="form_group">
        <label for="category">카테고리</label>
        <div id="select" class="input_box">
          <select
            v-model="productData.category"
            id="category"
            name="category"
            required
            class="select_category"
          >
            <option value="" selected disabled>-- 카테고리 선택 --</option>
            <option value="한식">한식</option>
            <option value="중식">중식</option>
            <option value="일식">일식</option>
            <option value="양식">양식</option>
            <option value="아시안">아시안</option>
            <option value="분식">분식</option>
            <option value="패스트푸드">패스트푸드</option>
          </select>
        </div>
      </div>

      <div class="form_group">
        <label for="description">상품 설명</label>
        <div class="textarea_box">
          <textarea
            v-model="productData.description"
            id="description"
            name="description"
            rows="4"
            required
            maxlength="500"
            placeholder="상품 설명을 입력해주세요."
          ></textarea>
        </div>
      </div>
      <div class="form_group">
        <label for="image">상품 이미지</label>
        <div v-if="productData.image" class="image_preview">
          <img :src="productData.image || ''" alt="상품 이미지 미리보기" />
        </div>
        <input name="files" type="file" multiple @change="handleFileChange" />
        <!-- <input type="file" id="image" name="image" accept="image/*" required /> -->
      </div>
    </form>
    <div class="btn_box">
      <button
        @click="submitForm"
        class="btn"
        :class="{ modify: productAction === 'modify' }"
      >
        {{ productAction === "register" ? "등록하기" : "수정" }}
      </button>
      <button
        v-if="productAction === 'modify'"
        @click="cancelEdit"
        class="cancel_btn"
      >
        취소
      </button>
    </div>
  </div>
</template>

<style scoped>
.edit_wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.edit_wrap > h1 {
  font-size: 1.4rem;
  margin-bottom: 1rem;
}

.line {
  width: 100%;
  height: 0.125rem;
  background-color: #ccc;
}

.form_box {
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem 4rem;
}

.form_row {
  display: flex;
  gap: 2rem;
}

.form_group {
  width: 100%;
}

.input_box {
  border-radius: 0.5rem;
  border: 1px solid #9e9e9e;
  padding: 0.3rem 0.8rem;
}

.input_box > input {
  height: 1.9375rem;
  width: 100%;
  border: none;
  padding: 0;
}

.input_box:focus-within {
  border-color: black;
}

label {
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
  display: block;
}

.textarea_box {
  border-radius: 0.5rem;
  border: 1px solid #9e9e9e;
  padding: 0.8rem;
  height: 5rem;
}

.textarea_box:focus-within {
  border-color: #202020;
}

.textarea_box > textarea {
  font-size: 0.8rem;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  resize: none;
  padding: 0;
  color: black;
}

#select {
  padding: 0;
  height: 2.625rem;
}

.select_category {
  width: 100%;
  height: 100%;
  padding: 0.3rem 0.8rem;
  border: none;
  outline: none;
  border-radius: 1rem;
}

.image_preview {
  margin-bottom: 1rem;
}
.image_preview > img {
  width: 6rem;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 0.5rem;
}

.btn_box {
  margin-top: 1.25rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.btn {
  width: 100%;
  padding: 0.6rem 0;
  background-color: #ff7400;
  color: white;
  border-radius: 0.8rem;
  font-size: 1rem;
  font-weight: 700;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #c96208;
}

.btn.modify {
  width: auto;
  padding: 0.6rem 2.3rem;
}

.cancel_btn {
  padding: 0.6rem 2.3rem;
  border-radius: 0.8rem;
  color: #9e9e9e;
  border: 1px solid #ccc;
  font-size: 1rem;
  font-weight: 700;
  transition: background-color 0.3s ease;
}

.cancel_btn:hover {
  background-color: rgba(0, 0, 0, 0.07);
}
</style>
