<script setup>
import { ref, onMounted } from "vue";
import { useStoresStore } from "../../../stores/useStoresStore";
import { useRouter } from "vue-router";
const router = useRouter();

const previewImages = ref([]); // 미리보기 이미지들을 저장할 배열
const StoresStore = useStoresStore();

const isPostcodeModalVisible = ref(false); // 우편번호 검색 모달 여부
const address = ref(""); // 주소
const detailAddress = ref(""); // 상세주소

const cancel = () => {
  router.push(`/mypage/seller`);
};

// 파일 변경 시 미리보기 이미지 처리
const handleFileChange = (event) => {
  const files = event.target.files;
  previewImages.value = []; // 초기화
  if (files) {
    // 파일을 순차적으로 처리하고 미리보기 이미지를 생성
    Array.from(files)
      .slice(0, 4)
      .forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          previewImages.value.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
  }
};

const openPostcodeModal = () => {
  isPostcodeModalVisible.value = true;
  new daum.Postcode({
    oncomplete: function (data) {
      address.value = data.roadAddress; // 도로명 주소
      isPostcodeModalVisible.value = false; // 모달 닫기
    },
  }).open();
};

// 우편번호 스크립트 로드
const loadPostcodeScript = () => {
  const script = document.createElement("script");
  script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  script.async = true;
  document.head.appendChild(script);
};

onMounted(async () => {
  await StoresStore.getSellerStoresList();
  loadPostcodeScript(); // 우편번호 스크립트 로드
});

// 모달 닫기 함수
const closePostcodeModal = () => {
  isPostcodeModalVisible.value = false;
};
// 폼 제출 시 처리
const submitForm = () => {
  alert("등록되었습니다.");
  router.push("/mypage/seller/store");
};
</script>

<template>
  <main>
    <div id="contents">
      <section class="insert_store_box">
        <form @submit.prevent="submitForm" enctype="multipart/form-data">
          <fieldset>
            <div><label class="insert_store_info">식당 정보 입력</label></div>

            <!-- 대표 사진 (최대 4개) -->
            <div class="image_group">
              <label for="restaurantImages"
                ><strong>대표 사진 (최대 4개)</strong></label
              >
              <input
                type="file"
                class="store_image"
                id="restaurantImages"
                name="restaurantImages"
                accept="image/*"
                multiple
                @change="handleFileChange"
              />
              <p>최대 4개의 이미지를 선택할 수 있습니다.</p>

              <!-- 미리보기 공간 -->
              <div class="preview_container">
                <!-- 이미지를 표시 -->
                <div
                  v-for="(image, index) in previewImages"
                  :key="index"
                  class="preview_box"
                >
                  <img :src="image" alt="preview" class="preview_image" />
                </div>

                <!-- 빈 칸을 채우기 위한 "미리보기" 텍스트 -->
                <div
                  v-for="index in 4 - previewImages.length"
                  :key="'empty' + index"
                  class="preview_box"
                >
                  미리보기 {{ previewImages.length + index }}
                </div>
              </div>
            </div>

            <!-- 식당 이름 (최대 30자) -->
            <div class="form_group">
              <label for="restaurantName"><strong>식당 이름</strong></label>
              <input
                type="text"
                id="restaurantName"
                name="restaurantName"
                placeholder="최대 30자 입력 가능"
                maxlength="30"
                required
              />
            </div>

            <!-- 식당 카테고리 -->
            <div class="form_group">
              <label for="restaurantCategory"
                ><strong>식당 카테고리</strong></label
              >
              <select
                id="restaurantCategory"
                v-model="selectedCategory"
                required
              >
                <option value="" disabled>카테고리를 선택하세요</option>
                <option value="korean">한식</option>
                <option value="western">양식</option>
                <option value="chinese">중식</option>
                <option value="japanese">일식</option>
                <option value="cafe">카페</option>
                <option value="fastfood">패스트푸드</option>
                <option value="other">기타</option>
              </select>
            </div>

            <!-- 소개 (최대 200자) -->
            <div class="form_group">
              <label for="restaurantDescription"
                ><strong>식당 소개</strong></label
              >
              <textarea
                id="restaurantDescription"
                name="restaurantDescription"
                placeholder="최대 200자 입력 가능"
                maxlength="200"
                rows="4"
                required
              ></textarea>
            </div>

            <div class="form_group">
              <label for="restaurantPhone"
                ><strong>식당 전화번호</strong></label
              >
              <input
                type="text"
                id="restaurantPhone"
                name="restaurantPhone"
                placeholder="예: 010-1234-5678"
                maxlength="13"
                required
              />
            </div>

            <!-- 영업시간 (최대 50자) -->
            <div class="form_group">
              <label for="restaurantHours"><strong>영업시간</strong></label>
              <input
                type="text"
                id="restaurantHours"
                name="restaurantHours"
                placeholder="예: 10:00 ~ 22:00"
                maxlength="50"
                required
              />
            </div>

            <!-- 예약 가능 시간 (최대 50자) -->
            <div class="form_group">
              <label for="reservationHours"
                ><strong>예약 가능 시간</strong></label
              >
              <input
                type="text"
                id="reservationHours"
                name="reservationHours"
                placeholder="예: 10:00 ~ 20:00"
                maxlength="50"
                required
              />
            </div>

            <!-- 나머지 입력 필드들 ... -->

            <div class="address_box">
              <strong>주소</strong>
              <div class="address_input">
                <div class="member_warning">
                  <input type="text" :value="address" readonly />
                  <button
                    type="button"
                    class="btn_post_search"
                    @click="openPostcodeModal"
                  >
                    우편번호검색
                  </button>
                </div>
                <div class="detail_address_input">
                  <input
                    type="text"
                    v-model="detailAddress"
                    placeholder="상세 주소"
                  />
                </div>
              </div>
            </div>
            <!-- 제출 버튼 -->
            <div class="button_group">
              <button type="button" class="cancel_store" @click="cancel">
                취소
              </button>
              <button type="submit" class="submit_store">식당 등록</button>
            </div>
          </fieldset>
        </form>
      </section>
    </div>
    <div
      class="layer_wrap"
      v-show="isPostcodeModalVisible"
      @click="closePostcodeModal"
    >
      <div class="layer_area">
        <!-- 우편번호 모달 내용 -->
      </div>
    </div>
  </main>
</template>

<style scoped>
.member_warning {
  display: flex;
  justify-content: space-between;
  /* 요소들 사이에 일정 간격을 둡니다. */
  align-items: center;
  /* 세로 방향으로 가운데 정렬 */
}

.address_box {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.address_input {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.btn_post_search {
  margin: 0 0 0 0.625rem;
  height: 3.375rem;
  border-radius: 0.5rem;
  padding: 0 1.125rem;
  font-size: 1rem;
  color: #ff7400;
  box-shadow: none;
  display: flex;
  align-items: center;
  border: 0.0625rem solid #ff7400;
  flex-shrink: 0;
}

/* 폼 스타일 */
form {
  background-color: white;
  padding: 0 1.875rem;
}

/* 필드셋 및 레전드 스타일 */
fieldset {
  border: none;
}

.insert_store_info {
  font-size: 1.4rem;
  font-weight: 800;
  margin: 0.5rem 0 2rem 0;
}

/* 각 폼 그룹 스타일 */
.button_group {
  margin: 3.125rem 0 1.875rem;
  display: flex;
  justify-content: center;
  gap: 0.625rem;
}

.button_group > button {
  width: 11rem;
  height: 3.1875rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.5rem;
}

/* 라벨 스타일 */
label {
  display: block;
  margin: 0 0 0 0.125rem;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.address_postcode {
  display: flex;
  align-items: center;
  gap: 10px;
  /* 각 항목 사이의 간격을 추가 */
  width: 100%;
}

/* 입력 필드 스타일 */
select,
input[type="text"],
input[type="tel"] {
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

select {
  width: 100%;
  height: 3.125rem;
  border-radius: 0.5rem;
  font-size: 1rem;
}

.store_image {
  display: flex;
  flex-direction: column;
  /* 세로 방향으로 정렬 */
  justify-content: center;
  /* 수평으로 가운데 정렬 */
  align-items: center;
  /* 세로로 가운데 정렬 */
  height: 100%;
  /* 필요한 높이 설정 */
}

textarea {
  width: 100%;
  height: 12.5rem;
  padding: 0.625rem !important;
  font-size: 1rem !important;
  border: 0.0625rem solid #e8e8e8;
  font-weight: 400;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
  box-sizing: border-box;
  overflow-y: auto;
  resize: none;
}

input[type="file"] {
  padding-bottom: 0.625rem;
}

/* 버튼 스타일 */
.cancel_store {
  border: 0.0625rem solid #ccc;
  color: #777;
  transition: background-color 0.3s;
}

.cancel_store:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.submit_store {
  font-size: 0.875rem;
  font-weight: 400;
  width: 13.5rem;
  height: 3.1875rem;
  color: #ffffff;
  border: 0.0625rem solid #ff7400;
  background: #ff7400;
  transition: background-color 0.3s;
}

.submit_store:hover {
  background-color: #c96208;
}

p {
  font-size: 0.875rem;
  color: #888;
  margin-top: 0.3125rem;
}

.insert_store_box {
  width: 90%;
  margin: 0 auto;
  text-align: left;
}

.form_group {
  margin-bottom: 1.25rem;
}

.image_group {
  margin-bottom: 1.25rem;
  border: 0.0625rem solid #ddd;
  padding: 1.25rem;
  border-radius: 0.625rem;
  background-color: #f9f9f9;
  margin-bottom: 1.25rem;
}

.preview_container {
  display: flex;
  justify-content: space-between;
  gap: 0.625rem;
  flex-wrap: wrap;
  margin-top: 0.625rem;
}

.preview_box {
  flex-grow: 1;
  width: 0;
  height: 6.25rem;
  border: 0.125rem dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
  color: #999;
  background-color: #f9f9f9;
  border-radius: 0.3125rem;
  margin-right: 0.625rem;
}

.preview_image {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}
</style>
