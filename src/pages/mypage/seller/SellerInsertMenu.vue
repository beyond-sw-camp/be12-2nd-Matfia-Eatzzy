<script>
export default {
  data() {
    return {
      menuName: '',
      menuImage: null,
      menuDescription: '',
      menuPrice: ''
    };
  },
  methods: {
    // 이미지 파일 업로드 처리
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.menuImage = URL.createObjectURL(file); // 미리보기용 URL 생성
      }
    },
    // 메뉴 추가 제출 처리
    submitMenu() {
      // 유효성 체크 후 메뉴 추가 작업
      if (!this.menuName || !this.menuDescription || !this.menuPrice || !this.menuImage) {
        alert("모든 항목을 입력해주세요.");
        return;
      }

      // 서버에 전송할 데이터 준비
      const menuData = {
        name: this.menuName,
        image: this.menuImage, // 실제 파일 업로드 시 FormData를 사용하여 전송
        description: this.menuDescription,
        price: this.menuPrice
      };

      console.log("메뉴 추가:", menuData);

      // 서버로 데이터 전송 (예: axios POST 요청)
      // axios.post('/menu/add', menuData)
      //   .then(response => {
      //     console.log('메뉴 추가 성공:', response);
      //   })
      //   .catch(error => {
      //     console.error('메뉴 추가 실패:', error);
      //   });

      // 폼 리셋
      this.resetForm();
    },
    // 폼 초기화
    resetForm() {
      this.menuName = '';
      this.menuImage = null;
      this.menuDescription = '';
      this.menuPrice = '';
    }
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
              v-model="menuName"
              maxlength="30"
              placeholder="메뉴명을 입력하세요"
              required
            />
          </div>
  
          <div class="image_group">
            <label for="restaurantImages"><strong>메뉴 사진 (1개)</strong></label>
            <div class="image_container">
              <!-- 미리보기 공간 -->
              <div class="preview_container">
                <div v-if="menuImage" class="preview_box">
                  <img :src="menuImage" alt="Preview" class="preview-img" />
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
            <label for="menuDescription"><strong>메뉴 소개 (150자 이내)</strong></label>
            <textarea
              id="menuDescription"
              v-model="menuDescription"
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
                v-model="menuPrice"
                placeholder="가격을 입력하세요"
                required
              />
              <span class="currency">원</span>
            </div>
          </div>
  
          <!-- 제출 버튼 -->
          <div class="button_group">
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
.insert_menu_title{
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
  input[type="number"]
   {
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
  textarea{
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
    padding-right: 2.1875rem; /* 원 공간 확보 */
  }
  
  .currency {
    font-size: 1rem;
    font-weight: 400;
    margin-left: -1.875rem; /* 숫자 오른쪽에 원이 붙게 */
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
    border: .0625rem solid #ddd;  /* 테두리 색 */
    padding: 1.25rem;  /* 테두리와 콘텐츠 간의 간격 */
    border-radius: .625rem;  /* 테두리 둥글게 처리 */
    background-color: #f9f9f9;  /* 배경색 */
    margin-bottom: 1.25rem;  /* 하단 여백 */
}

/* 이미지 선택과 미리보기 영역을 가로로 배치 */
.image_container {
    display: flex;
    align-items: center; /* 세로 중앙 정렬 */
    gap: 1.25rem; /* 간격 조정 */
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