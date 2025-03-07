<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useMemberStore } from "../../stores/useMemberStore";

const router = useRouter();
const memberStore = useMemberStore();
const formData = ref({
  userId: "",
  password: "",
  birthDate: "",
  name: "",
  email: "",
  address: "",
  addressDetail: "",
  phone: "",
  userType: "CLIENT"
});

const errors = ref({
  userId: "",
  password: "",
  birthDate: "",
  name: "",
  email: "",
  address: "",
  addressDetail: "",
  phone: "",
  userType: ""
});

// 유효성 검사 함수
const validateForm = () => {
  errors.value = {}; // 에러 초기화

  let isValid = true;

  // 아이디 검증 (영어, 숫자만 허용)
  if (!formData.value.userId) {
    errors.value.userId = "아이디는 필수 입력값입니다.";
    isValid = false;
  } else if (!/^[a-zA-Z0-9]{4,20}$/.test(formData.value.userId)) {
    errors.value.userId = "아이디는 4~20글자, 영어와 숫자만 가능합니다.";
    isValid = false;
  }

  // 비밀번호 검증
  if (!formData.value.password) {
    errors.value.password = "비밀번호는 필수 입력값입니다.";
    isValid = false;
  } else if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.value.password)) {
    errors.value.password = "비밀번호는 영어, 숫자, 특수문자를 모두 포함하여 8자 이상이어야 합니다.";
    isValid = false;
  }

  // 생년월일 검증 (8자리)
  if (!formData.value.birthDate) {
    errors.value.birthDate = "생년월일은 필수 입력값입니다.";
    isValid = false;
  } else if (!/^\d{8}$/.test(formData.value.birthDate)) {
    errors.value.birthDate = "생년월일은 8자리 숫자로 입력해주세요.";
    isValid = false;
  }

  // 이름 검증 (한글만 허용)
  if (!formData.value.name) {
    errors.value.name = "이름은 필수 입력값입니다.";
    isValid = false;
  } else if (!/^[가-힣]{2,17}$/.test(formData.value.name)) {
    errors.value.name = "이름은 2~17글자 한글만 가능합니다.";
    isValid = false;
  }

  // 이메일 검증
  if (!formData.value.email) {
    errors.value.email = "이메일은 필수 입력값입니다.";
    isValid = false;
  } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.value.email)) {
    errors.value.email = "유효한 이메일을 입력해주세요.";
    isValid = false;
  }

  // 주소 검증
  if (!formData.value.address) {
    errors.value.address = "주소는 필수 입력값입니다.";
    isValid = false;
  }

  // 상세주소 검증
  if (!formData.value.addressDetail) {
    errors.value.addressDetail = "상세주소는 필수 입력값입니다.";
    isValid = false;
  }

  // 전화번호 검증 (숫자만, 최대 13자리)
  if (!formData.value.phone) {
    errors.value.phone = "전화번호는 필수 입력값입니다.";
    isValid = false;
  } else if (!/^\d{10,13}$/.test(formData.value.phone)) {
    errors.value.phone = "전화번호는 숫자만 입력해주세요.";
    isValid = false;
  }

  // 회원타입 검증
  if (!formData.value.userType) {
    errors.value.userType = "회원타입은 필수 입력값입니다.";
    isValid = false;
  }

  return isValid;
};

const signup = async () => {
  if (validateForm()) {
    // 검증이 성공하면 회원가입 진행
    await memberStore.signUp(formData.value);
  }
};
</script>

<template>
  <div class="main">
    <h2>회원정보 입력</h2>
    <form
      id="formData"
      name="formData"
      @submit.prevent="signup"
      class="join_frm"
      autocomplete="off"
    >
      <div class="join_view">
        <section class="join_form_tabarea base_info_box join_common">
          <table>
            <tbody>
              <tr>
                <td>
                  <strong class="essential">회원타입</strong>
                  <div class="user_type_area">
                    <input
                      type="radio"
                      id="userType_client"
                      name="userType"
                      value="CLIENT"
                      v-model="formData.userType"
                    />
                    <label for="userType_client">소비자</label>
                    <input
                      type="radio"
                      id="userType_seller"
                      name="userType"
                      value="SELLER"                       
                      v-model="formData.userType"                      
                    />
                    <label for="userType_seller">점주</label>
                  </div>
                  <div v-if="errors.userType" class="error-message">{{ errors.userType }}</div>
                </td>
              </tr>
              <tr>
                <td>
                  <strong class="essential">아이디</strong>
                  <div class="member_warning">
                    <input
                      type="text"
                      id="userId"
                      name="userId"
                      maxlength="40"
                      placeholder="4~20글자, 영어와 숫자"
                      v-model="formData.userId"
                    />
                    <div v-if="errors.userId" class="error-message">{{ errors.userId }}</div>
                  </div>
                </td>
              </tr>

              <tr class="member_password">
                <td>
                  <strong class="essential">비밀번호</strong>
                  <div class="member_warning">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      autocomplete="off"
                      placeholder="영어, 숫자, 특수문자를 모두 포함하여 8자 이상"
                      v-model="formData.password"
                    />
                    <div v-if="errors.password" class="error-message">{{ errors.password }}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <strong class="essential">이름</strong>
                  <div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      maxlength="40"
                      placeholder="2~17글자 한글"
                      v-model="formData.name"
                    />
                    <div v-if="errors.name" class="error-message">{{ errors.name }}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <strong class="essential">생년월일</strong>
                  <div>
                    <input
                      type="text"
                      id="birthDate"
                      name="birthDate"
                      maxlength="40"
                      placeholder="8자리 숫자"
                      v-model="formData.birthDate"
                    />
                    <div v-if="errors.birthDate" class="error-message">{{ errors.birthDate }}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <strong class="essential">이메일</strong>
                  <div class="member_email">
                    <div class="member_warning">
                      <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="이메일"
                        autocomplete="off"
                        v-model="formData.email"
                      />
                      <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <strong class="essential">주소</strong>
                  <div>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      maxlength="40"
                      placeholder="주소"
                      v-model="formData.address"
                    />
                    <div v-if="errors.address" class="error-message">{{ errors.address }}</div>
                  </div>
                  <div>
                    <input
                      type="text"
                      id="addressDetail"
                      name="addressDetail"
                      maxlength="40"
                      placeholder="상세주소"
                      v-model="formData.addressDetail"
                    />
                    <div v-if="errors.addressDetail" class="error-message">{{ errors.addressDetail }}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="member_address">
                  <strong class="essential">휴대폰 번호</strong>
                  <div class="address_postcode">
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      maxlength="13"
                      placeholder="-없이 숫자"
                      v-model="formData.phone"
                    />
                    <div v-if="errors.phone" class="error-message">{{ errors.phone }}</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
      <div class="btn_center_box">
        <button type="button" id="btnCancel" class="btn_cancel">취소</button>
        <button type="submit" class="js_btn_join btn_ok">회원가입</button>
      </div>
    </form>
  </div>
</template>
<style scoped>
.error-message {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}
.essential::before {
  content: '*';
  color: red;
  font-size: 12px;
}
.main {
  width: 50%;
  min-width: 600px;
  margin: 0 auto;
}

.location_wrap {
  position: relative;
  width: 100%;
}

.location_wrap .location_cont {
  width: 100%;
  margin: 0;
  text-align: right;
}

.location_cont em {
  display: inline-block;
  padding: 12px 0 10px 0;
  color: #777777;
  font-size: 12.5008px;
}

.location_cont .local_home {
  color: #777777;
}

.location_wrap .location_cont:after {
  display: block;
  clear: both;
  content: "";
}

.restriction {
  background-color: #f9f9f9;
  padding: 1.25rem;
  border-radius: 0.625rem;
  text-align: left;
  font-size: 1rem;
  line-height: 1.625rem;
  margin-bottom: 1.875rem;
}

.restriction strong {
  color: #da0000;
  font-weight: 500;
}

h2 {
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0 0 1.875rem;
}

.join_frm {
  display: flex;
  flex-direction: column;
  gap: 1.875rem;
}

.join_view {
  padding: 1.25rem 0;
  display: flex;
  flex-direction: column;
  gap: 3.125rem;
}

.join_common {
  width: 100%;
  text-align: left;
}

.join_common h3 {
  display: block;
  border-bottom: 0.0625rem solid #555;
  padding: 0 0 1.125rem;
  margin: 0 0 0.9375rem;
  font-size: 1.25rem;
  font-weight: 500;
  color: #333;
}

.join_common table {
  width: 100%;
  border-spacing: 0;
}

.join_common table td {
  display: flex;
  flex-direction: column;
  padding: 0.9375rem 0;
  gap: 0.625rem;
}

.join_common table strong {
  font-size: 1rem;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 0.4375rem;
}

.join_common table td select {
  width: 100%;
}

.member_warning {
  display: inline;
  position: relative;
}

.join_common table .member_warning {
  display: flex !important
;
  gap: 0.625rem;
}

.join_common table .chosen-select {
  width: 30%;
}

.join_common table input[type="text"],
.join_common table input[type="password"] {
  font-size: 1rem;
  width: 100%;
  height: 3.375rem;
  border: 0.0625rem solid #e8e8e8;
  padding: 0 1.125rem;
  border-radius: 0.5rem;
  background-color: #fff;
  margin: 0 !important;
  font-weight: 400;
  color: #333;
  flex-grow: 1;
}

.join_common table td.busi_no_caution {
  border-radius: 0.5rem;
  padding: 1.125rem;
  background-color: #fff0f1;
  color: #fa3848;
  font-size: 1rem;
  line-height: 1.625rem;
}

.join_common table td.busi_no_caution strong {
  display: inline;
  font-weight: 700;
}

.join_common table strong .btn_service_detail {
  height: 2rem;
  border: none;
  background-color: #f4f4f4;
  padding: 0 0.75rem;
  border-radius: 1rem;
  color: #555;
  font-size: 0.8438rem;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 0.3125rem;
  letter-spacing: -0.05em;
}

.join_common table strong .btn_service_detail:hover {
  background-color: #e8e8e8;
}

.join_common table strong .btn_service_detail img {
  opacity: 0.4;
}

.join_common table select:required:invalid {
  color: #aaa;
}

.join_common table select {
  font-size: 1rem;
  height: 3.375rem;
  border: 0.0625rem solid #e8e8e8;
  padding: 0 1.125rem;
  border-radius: 0.5rem;
  background-color: #fff;
  margin: 0;
  width: 100%;
  color: #333;
  background: url("/src/assets/icons/arrow_down_wide.svg")
    no-repeat;
  background-size: 0.75rem 0.375rem;
  background-position: right 1.5rem center;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.join_common table select option {
  color: #333;
}

.join_common table .friend_benefit {
  background: rgba(31, 158, 222, 0.1);
  border-radius: 0.5rem;
  padding: 1.125rem;
  color: #1f9ede;
  font-size: 1rem;
  line-height: 1.625rem;
  display: flex;
  flex-direction: column;
}

.join_common table .friend_benefit strong {
  font-weight: 700;
  line-height: 1.625rem;
}

.join_common table #smsFl + label .sub {
  color: #1f9ede;
  font-size: 0.875rem;
  display: block;
  text-indent: 0;
  line-height: 1.5rem;
}

.join_common table input[type="checkbox"] + label {
  font-size: 1rem;
  line-height: 1.5rem;
  text-indent: -2rem;
  padding-left: 2rem;
  display: inline-block;
  cursor: pointer;
}

.join_common table input[type="checkbox"] + label:before {
  position: static;
  width: 1.5rem;
  height: 1.5rem;
  background-color: #fff;
  border: 0.0625rem solid #e8e8e8;
  border-radius: 0.1875rem;
  margin: 0 0.5rem 0 0;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: top;
}

.btn_center_box {
  display: flex;
  gap: 1.25rem;
}

.btn_center_box button {
  flex-grow: 1;
  flex-basis: 0;
  height: 3.5rem;
  border-radius: 0.5rem;
  font-size: 1.125rem;
  font-weight: 500;
}

.btn_center_box .btn_cancel {
  border: 0.0625rem solid #e8e8e8;
}

.btn_center_box .btn_ok {
  background-color: var(--point-color);
  color: #fff;
}

.user_type_area {
  display: flex;
  column-gap: 1.25rem;
  font-size: 1rem;
}

@media (max-width: 960px) {
  .main {
    min-width: 25rem;
    max-width: 35rem;
  }

  .join_common table .member_warning {
    flex-direction: column;
  }
  .join_common table .member_warning select {
    width: 100%;
  }
}
</style>
