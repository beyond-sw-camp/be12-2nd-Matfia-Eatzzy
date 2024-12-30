<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';  // 라우터에서 params 사용을 위해 추가
import { useStoresStore } from '../../../stores/useStoresStore';

const previewImages = ref([]);  // 미리보기 이미지들을 저장할 배열
const StoresStore = useStoresStore();
const route = useRoute();  // 라우터 파라미터 사용

const store = ref(null);  // 현재 수정할 식당 정보

const isPostcodeModalVisible = ref(false); // 우편번호 검색 모달 여부
const address = ref(""); // 주소
const detailAddress = ref(""); // 상세주소

// 파일 변경 시 미리보기 이미지 처리
const handleFileChange = (event) => {
  const files = event.target.files;
  previewImages.value = []; // 초기화
  if (files) {
    // 파일을 순차적으로 처리하고 미리보기 이미지를 생성
    Array.from(files).slice(0, 4).forEach(file => {
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
    }
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
  await StoresStore.getSellerStoresList();  // 식당 리스트 가져오기
  const storeId = route.params.id;  // URL에서 id 파라미터 가져오기
  store.value = StoresStore.stores.find(s => s.id === parseInt(storeId));  // 해당 id에 맞는 식당 정보 찾기
  loadPostcodeScript();  // 우편번호 스크립트 로드
});

// 모달 닫기 함수
const closePostcodeModal = () => {
  isPostcodeModalVisible.value = false;
};

// 폼 제출 시 처리
const submitForm = () => {
  console.log("식당 수정 폼이 제출되었습니다.");
};

</script>

<template>
<main>
  <div id="contents">
    <section class="insert_store_box">
      <form @submit.prevent="submitForm" enctype="multipart/form-data">
        <fieldset>
          <div><label class="insert_store_info">식당 정보 수정</label></div>

          <!-- 대표 사진 (최대 4개) -->
          <div class="image_group">
            <label for="restaurantImages"><strong>대표 사진 (최대 4개)</strong></label>
            <input type="file" class="store_image" id="restaurantImages" name="restaurantImages" accept="image/*"
              multiple @change="handleFileChange">
            <p>최대 4개의 이미지를 선택할 수 있습니다.</p>

            <!-- 미리보기 공간 -->
            <div class="preview_container">
              <div v-for="(image, index) in previewImages" :key="index" class="preview_box">
                <img :src="image" alt="preview" class="preview_image" />
              </div>

              <div v-for="index in 4 - previewImages.length" :key="'empty' + index" class="preview_box">
                미리보기 {{ previewImages.length + index }}
              </div>
            </div>
          </div>

          <!-- 식당 이름 (최대 30자) -->
          <div class="form_group">
            <label for="restaurantName"><strong>식당 이름</strong></label>
            <input type="text" id="restaurantName" name="restaurantName" :value="store?.name" maxlength="30" required>
          </div>

          <!-- 소개 (최대 200자) -->
          <div class="form_group">
            <label for="restaurantDescription"><strong>식당 소개</strong></label>
            <textarea id="restaurantDescription" name="restaurantDescription" :value="store?.description"
              maxlength="200" rows="4" required></textarea>
          </div>

          <div class="form_group">
            <label for="restaurantPhone"><strong>식당 전화번호</strong></label>
            <input type="text" id="restaurantPhone" name="restaurantPhone" :value="store?.call_number"
              maxlength="13" required>
          </div>

          <!-- 영업시간 (최대 50자) -->
          <div class="form_group">
            <label for="restaurantHours"><strong>영업시간</strong></label>
            <input type="text" id="restaurantHours" name="restaurantHours" :value="store?.opening_hours"
              maxlength="50" required>
          </div>

          <!-- 예약 가능 시간 (최대 50자) -->
          <div class="form_group">
            <label for="reservationHours"><strong>예약 가능 시간</strong></label>
            <input type="text" id="reservationHours" name="reservationHours"
              :value="`${store?.start_time} ~ ${store?.end_time}`" maxlength="50" required>
          </div>

          <div class="address_box">
            <strong>주소</strong>

            <div class="address_input">
              <div class="member_warning">
                <input type="text" :value="store?.address" readonly />
                <button type="button" class="btn_post_search" @click="openPostcodeModal">
                  우편번호검색
                </button>
              </div>
              <div class="detail_address_input">
                <input type="text" v-model="detailAddress" placeholder="상세 주소" />
              </div>
            </div>

            <!-- 제출 버튼 -->
            <div class="button_group">
              <button type="button" class="cancel_store">취소</button>
              <button type="submit" class="submit_store">식당 수정</button>
            </div>
          </div>
        </fieldset>
      </form>
    </section>
  </div>

  <div class="layer_wrap" v-show="isPostcodeModalVisible" @click="closePostcodeModal">
    <div class="layer_area">
      <!-- 우편번호 모달 내용 -->
    </div>
  </div>
</main>

</template>


<style scoped>
.address_box {
  display: flex;
  flex-direction: column;
  gap: .625rem;
}

.address_input {
  display: flex;
  flex-direction: column;
  gap: .625rem;
}


.btn_post_search {
  margin: 0 0 0 0.625rem;
  height: 3.375rem;
  border-radius: .5rem;
  padding: 0 1.125rem;
  font-size: 1rem;
  color: #00a7b3;
  box-shadow: none;
  display: flex;
  align-items: center;
  border: .0625rem solid #00a7b3;
  flex-shrink: 0;
}


/* 폼 스타일 */
form {
  background-color: white;
  padding: 1.875rem;
}

/* 필드셋 및 레전드 스타일 */
fieldset {
  border: none;
}

.insert_store_info {
  font-size: 1.875rem;
  font-weight: 800;
  margin: 0 0 1.875rem;
}



/* 각 폼 그룹 스타일 */
.button_group {
  margin: 3.125rem 0 1.875rem;
  display: flex;
  justify-content: center;
  gap: .625rem;
}

/* 라벨 스타일 */
label {
  display: block;
  margin: 0 0 0 .125rem;
  font-size: .875rem;
  margin-bottom: .5rem;
}




/* 입력 필드 스타일 */
input[type="text"],
input[type="tel"] {
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

select {
  width: 100%;
  height: 3.125rem;
  border-radius: .5rem;
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

.member_warning {
  display: flex;
  justify-content: space-between;
  /* 요소들 사이에 일정 간격을 둡니다. */
  align-items: center;
  /* 세로 방향으로 가운데 정렬 */
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

input[type="file"] {
  padding-bottom: .625rem;
}

/* 버튼 스타일 */
.cancel_store {
  font-size: .875rem;
  font-weight: 400;
  width: 13.5rem;
  height: 3.1875rem;
  border: .0625rem solid #00a7b3;
}

.submit_store {
  font-size: .875rem;
  font-weight: 400;
  width: 13.5rem;
  height: 3.1875rem;
  color: #ffffff;
  border: .0625rem solid #00a7b3;
  background: #00a7b3;
}


/* 작은 안내문 스타일 */
p {
  font-size: .875rem;
  color: #888;
  margin-top: .3125rem;
}

.insert_store_box {
  width: 31.25rem;
  margin: 0 auto;
  text-align: left;
}

/* 폼 그룹 */
.form_group {
  margin-bottom: 1.25rem;
}

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

.preview_container {
  display: flex;
  /* Flexbox 사용 */
  justify-content: space-between;
  /* 박스 간격을 일정하게 분배 */
  align-items: center;
  /* 세로 중앙 정렬 */
  gap: .625rem;
  /* 각 박스 간의 간격 */
  flex-wrap: wrap;
  /* 여러 줄로 감쌀 수 있게 설정 */
  margin-top: .625rem;
}

.preview_box {
  flex-grow: 1;
  /* 각 박스가 동일한 크기로 확장되도록 설정 */
  width: 0;
  /* 기본 너비 0 */
  height: 6.25rem;
  /* 고정된 높이 */
  border: .125rem dashed #ccc;
  /* 테두리 스타일 */
  display: flex;
  /* Flexbox 사용 */
  justify-content: center;
  /* 텍스트 수평 중앙 정렬 */
  align-items: center;
  /* 텍스트 수직 중앙 정렬 */
  font-size: .875rem;
  color: #999;
  background-color: #f9f9f9;
  border-radius: .3125rem;
  margin-right: .625rem;
  /* 박스 간의 간격 */
}

.preview_image {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}
</style>
