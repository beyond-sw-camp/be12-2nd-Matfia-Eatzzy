<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router"; // 라우터에서 params 사용을 위해 추가
import { useMenuStore } from "../../../stores/useMenuStore";


const route = useRoute();
const router = useRouter();
const mode = ref("");
const menuStore = useMenuStore();

const menuData = ref({
  id: "",
  name: "",
  image: "",
  info: "",
  price: null,
})

const updateModeAction = () => {
  const pathSegments = route.path.split("/");
  mode.value = pathSegments.includes("add") ? "add" : "modify";
};

const cancel = () => {
  router.push(`/mypage/seller`);
};

// 이미지 파일 업로드 처리
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    menuImage.value = URL.createObjectURL(file); // 미리보기용 URL 생성
  }
};

// 메뉴 추가 제출 처리
const submitMenu = () => {
  // 유효성 체크 후 메뉴 추가 작업
  if (
    !menuData.value.name ||
    !menuData.value.description ||
    !menuData.value.price ||
    !menuData.value.image
  ) {
    alert("모든 항목을 입력해주세요.");
    return;
  }
};


  // 경로 변경 감지
watch (
  () => route.path,
  () => {
    updateModeAction();
  }
);

onMounted(async () => {
  updateModeAction();
  
  if (mode.value === "modify") {
    if (menuStore.menus.length === 0) {
      await menuStore.getMenuList(); // 데이터 초기화
    }
    const id = Number(route.params.id);
    menuData.value = menuStore.getMenu(id);
  }
})

</script>

<template>
    <section class="insert_menu_box">
      <fieldset>
        <div>
          <label class="insert_menu_title">식당 메뉴 {{ mode === "add" ? "추가" : "수정"}}</label>
        </div>

        <div class="line"></div>
<div class="form_box">
        <!-- 메뉴명 -->
        <div class="form_group">
          <label for="menuName"><strong>메뉴명 (30자 이내)</strong></label>
          <input
            type="text"
            id="menuName"
            maxlength="30"
            v-model="menuData.name"
            required
          />
        </div>

        <div class="image_group">
          <label for="restaurantImages"><strong>메뉴 사진 (1개)</strong></label>
          <div class="image_container">
            <!-- 미리보기 공간 -->
            <div class="preview_container">
              <div v-if="menuData.image" class="preview_box">
                <img :src="menuData.image" alt="Preview" class="preview-img" />
              </div>
              <div v-else class="preview_box">미리보기</div>
            </div>

            <!-- 파일 선택 부분 -->
            <div class="file_input_container">
              <input
                type="file"
                class="store_image"
                @change="handleImageUpload"
                accept="image/*"
                multiple
              />
              <p>1개의 이미지만 선택할 수 있습니다.</p>
            </div>
          </div>
        </div>

        <!-- 메뉴 소개 -->
        <div class="form_group">
          <label for="menuDescription"
            ><strong>메뉴 소개 (150자 이내)</strong></label
          >
          <textarea
            id="menuDescription"
            maxlength="150"
            v-model="menuData.info"
            required
          ></textarea>
        </div>

        <!-- 가격 -->
        <div class="form_group">
          <label for="menuPrice"><strong>가격</strong></label>
          <div class="price_container">
            <input
              type="number"
              id="menuPrice"
              v-model="menuData.price"
              required
            />
            <span class="currency">원</span>
          </div>
        </div>

        <!-- 제출 버튼 -->
        <div class="button_group">
          <button type="button" @click="cancel" class="cancel_button">
            취소
          </button>
          <button type="button" @click="submitMenu" class="submit_menu">
            메뉴 수정
          </button>
        </div>
        </div>
      </fieldset>
    </section>
</template>

<style scoped>
.preview-img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.line{
  width: 100%;
  height: 2px;
  background-color: #ccc;
  margin: 1rem 0 2rem;
}

.insert_menu_box {
  width: 90%;
  text-align: left;
}

.insert_menu_title {
  font-size: 1.4rem;
  font-weight: 800;
}

.form_box {
  padding: 0 2rem ;
}

.form_group {
  margin-bottom: 1.25rem;
}

label {
  font-size: 0.875rem;
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="text"],
input[type="number"] {
  font-size: 1rem;
  height: 3.375rem !important;
  border: 0.0625rem solid #e8e8e8;
  padding: 0 1rem;
  border-radius: 0.5rem;
  background-color: #fff;
  margin: 0 !important;
  font-weight: 400;
  color: #333;
  flex-grow: 1;
  box-sizing: border-box;
  width: 100%;
}

textarea {
  width: 100%;
  height: 12.5rem;
  padding: 0.8rem 1rem !important;
  font-size: 1rem !important;
  border: 0.0625rem solid #ccc;
  font-weight: 400;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
  box-sizing: border-box;
  overflow-y: auto;
  resize: none;
}

.price_container {
  align-items: center;
}

input[type="number"] {
  width: 100%;
  padding-right: 2.1875rem;
}

.currency {
  font-size: 1rem;
  font-weight: 400;
  margin-left: -1.875rem;
  color: #333;
}


.button_group {
  display: flex;
  justify-content: center;
  gap: 0.625rem;
  margin-top: 5rem;
}

.button_group button {
  width: 9rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 0.5rem;
}


.cancel_button {
  border: 0.0625rem solid #ccc;
  color: #777;
}

.submit_menu {
  color: white;
  background: #ff7400;
}

.image_group {
  margin-bottom: 1.25rem;
  border: 0.0625rem solid #ddd;
  padding: 1.25rem;
  border-radius: 0.625rem;
  background-color: #f9f9f9;
  margin-bottom: 1.25rem;
}

.image_container {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.preview_container {
  width: 7.5rem;
  height: 7.5rem;
  border: 0.125rem dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
  color: #999;
  background-color: #f9f9f9;
  border-radius: 0.3125rem;
}

.file_input_container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

input[type="file"] {
  padding: 0.3125rem;
  border: 0.0625rem solid #e8e8e8;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
}

p {
  font-size: 0.875rem;
  color: #888;
  margin-top: 0.3125rem;
}
</style>
