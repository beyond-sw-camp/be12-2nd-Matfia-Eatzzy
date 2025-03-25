<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import { useMenuStore } from "../../../stores/useMenuStore";

const router = useRouter();
const route = useRoute();
const menuStore = useMenuStore();

const menuData = reactive({
  name: "",
  price: null,
  info: "",
  storeIdx: null,
  imagePath: "",  // 이미지 경로를 포함하도록 수정
});

const menuImage = ref(null); // 메뉴 이미지 파일

onMounted(() => {
  menuData.storeIdx = Number(route.params.id); // 페이지가 로드될 때 storeIdx 설정
});

const handleFileUpload = (event) => {
  const file = event.target.files[0]; // 단일 파일 선택
  menuImage.value = file;

  // 이미지 미리보기
  const reader = new FileReader();
  reader.onload = () => {
    // 미리보기 이미지 업데이트
    menuImage.preview = reader.result;
  };
  reader.readAsDataURL(file);  // 파일을 DataURL로 읽기

  // imagePath에 파일 경로를 임시로 할당
  menuData.imagePath = file.name;  // 이 부분은 수정될 부분입니다.
};

// 메뉴 제출 함수
const submitMenu = async () => {
  try {
    if (!menuData.name || !menuData.price || !menuData.info || !menuImage.value) {
      alert("모든 항목을 입력해주세요!");
      return;
    }

    // 1️⃣ 서버에서 Presigned URL을 포함한 메뉴 데이터를 요청하여 받기
    const response = await axios.post("/api/app/menu/create", menuData);
    console.log("Presigned URL 응답:", response.data);

    const presignedUrl = response.data.result.imageUrls; // Presigned URL

    if (!presignedUrl) {
      throw new Error("Presigned URL을 받지 못했습니다.");
    }

  // 2️⃣ Presigned URL을 사용하여 이미지를 업로드
  const uploadPromises = []; // 배열로 초기화

  const uploadResponse = axios.put(presignedUrl, menuImage.value, {
    headers: {
      "Content-Type": menuImage.value.type,
    },
  });

  // `uploadPromises` 배열에 업로드 프로미스를 추가
  uploadPromises.push(uploadResponse);

  // 모든 업로드가 완료될 때까지 대기
  await Promise.all(uploadPromises);

    
    alert("메뉴가 추가되었습니다.");
    router.push(`/mypage/seller/store/${menuData.storeIdx}/menu`);
  } catch (error) {
    console.error("메뉴 추가 실패:", error);
    alert("메뉴 추가 중 오류가 발생했습니다. 서버 로그를 확인해주세요.");
  }
};

</script>


<template>
  <main>
    <section class="insert_menu_box">
      <fieldset>
        <div>
          <label class="insert_menu_title">식당 메뉴 추가</label>
        </div>

        <!-- 메뉴명 -->
        <div class="form_group">
          <label for="menuName"><strong>메뉴명 (30자 이내)</strong></label>
          <input
            type="text"
            id="menuName"
            v-model="menuData.name"
            maxlength="30"
            placeholder="메뉴명을 입력하세요"
            required
          />
        </div>

        <!-- 이미지 업로드 -->
        <div class="form_group">
          <label for="menuImage"><strong>메뉴 사진</strong></label>
          <input
            type="file"
            id="menuImage"
            @change="handleFileUpload"
            accept="image/*"
          />
          <div v-if="menuImage">
            <img :src="menuImage" alt="Preview" class="preview-img" />
          </div>
        </div>

        <!-- 메뉴 소개 -->
        <div class="form_group">
          <label for="menuDescription"><strong>메뉴 소개 (150 이내)</strong></label>
          <textarea
            id="menuDescription"
            v-model="menuData.info"
            maxlength="150"
            placeholder="메뉴 소개를 입력하세요"
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
              placeholder="가격을 입력하세요"
              required
            />
            <span class="currency">원</span>
          </div>
        </div>

        <!-- 제출 버튼 -->
        <div class="button_group">
          <button type="button" @click="cancel" class="cancel_button">취소</button>
          <button type="button" @click="submitMenu" class="submit_menu">메뉴 추가</button>
        </div>
      </fieldset>
    </section>
  </main>
</template>


<style scoped>
.preview-img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.insert_menu_box {
  width: 31.25rem;
  margin: 0 auto;
  text-align: left;
}

.insert_menu_title {
  font-size: 1.875rem;
  font-weight: 800;
  margin: 3rem 0 1.875rem;
}


/* 각 폼 그룹 스타일 */
.form_group {
  margin-bottom: 1.25rem;
}

/* 라벨 스타일 */
label {
  font-size: .875rem;
  font-weight: bold;
  display: block;
  margin-bottom: .5rem;
}

/* 입력 필드 스타일 */
input[type="text"],
input[type="number"] {
  font-size: 1rem;
  height: 3.375rem !important;
  border: .0625rem solid #E8E8E8;
  padding: 0 .5rem;
  border-radius: .5rem;
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
  padding: .625rem !important;
  font-size: 1rem !important;
  border: .0625rem solid #ccc;
  font-weight: 400;
  border-radius: .25rem;
  margin-bottom: .5rem;
  box-sizing: border-box;
  overflow-y: auto;
  resize: none;
}

/* 가격 입력 필드 뒤에 원 표시 */
.price_container {
  align-items: center;
}

input[type="number"] {
  width: 100%;
  padding-right: 2.1875rem;
  /* 원 공간 확보 */
}

.currency {
  font-size: 1rem;
  font-weight: 400;
  margin-left: -1.875rem;
  /* 숫자 오른쪽에 원이 붙게 */
  color: #333;
}



/* 메뉴 등록 버튼 스타일 */
.submit_menu {

  font-size: .875rem;
  font-weight: 400;
  width: 13.5rem;
  height: 3.1875rem;
  color: #ffffff;
  border: .0625rem solid #00a7b3;
  background: #00a7b3;
}

.cancel_button {
  border: .0625rem solid #00a7b3;
  width: 13.5rem;
  background: #fff;
  cursor: pointer;
}

.button_group {
  margin: 3.125rem 0 1.875rem;
  display: flex;
  justify-content: center;
  gap: .625rem;
}



/* 이미지 등록 관련 */


/* 이미지 그룹 전체 스타일 */
.image_group {
  margin-bottom: 1.25rem;
  border: .0625rem solid #ddd;
  /* 테두리 색 */
  padding: 1.25rem;
  /* 테두리와 콘텐츠 간의 간격 */
  border-radius: .625rem;
  /* 테두리 둥글게 처리 */
  background-color: #f9f9f9;
  /* 배경색 */
  margin-bottom: 1.25rem;
  /* 하단 여백 */
}

/* 이미지 선택과 미리보기 영역을 가로로 배치 */
.image_container {
  display: flex;
  align-items: center;
  /* 세로 중앙 정렬 */
  gap: 1.25rem;
  /* 간격 조정 */
}

/* 미리보기 사진 스타일 */
.preview_container {
  width: 7.5rem;
  height: 7.5rem;
  border: .125rem dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: .875rem;
  color: #999;
  background-color: #f9f9f9;
  border-radius: .3125rem;
}

/* 파일 선택 버튼 스타일 */
.file_input_container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

/* 파일 선택 버튼 스타일 */
input[type="file"] {
  padding: .3125rem;
  border: .0625rem solid #E8E8E8;
  border-radius: .5rem;
  margin-bottom: .5rem;
}

/* 작은 안내문 스타일 */
p {
  font-size: .875rem;
  color: #888;
  margin-top: .3125rem;
}
</style>