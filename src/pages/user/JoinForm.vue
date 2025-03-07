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
  userType: ""
});
const signup = async () => {
  await memberStore.signUp(formData.value);
};
</script>

<template>
  <div class="main">
    <h2>회원정보 입력</h2>
    <form
      id="formData"
      name="formData"
      action=""
      method="post"
      class="join_frm"
      autocomplete="off"
      novalidate="novalidate"
    >
      <div class="join_view">
        <section class="join_form_tabarea base_info_box join_common">
          <table>
            <tbody>
              <tr>
                <td>
                  <strong>회원타입</strong>
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
                </td>
              </tr>
              <tr>
                <td>
                  <strong>아이디</strong>
                  <div class="member_warning">
                    <input
                      type="text"
                      id="userId"
                      name="userId"
                      maxlength="40"
                      placeholder="아이디"
                      value=""
                      v-model="formData.userId"
                    />
                  </div>
                </td>
              </tr>

              <tr class="member_password">
                <td>
                  <strong>비밀번호</strong>
                  <div class="member_warning">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      autocomplete="off"
                      placeholder="비밀번호"
                      v-model="formData.password"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td class="re_pw">
                  <div class="member_warning">
                    <input
                      type="password"
                      class="check-id"
                      name="rePassword"
                      autocomplete="off"
                      placeholder="비밀번호 확인"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>이름</strong>
                  <div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      maxlength="40"
                      placeholder="이름"
                      value=""
                      v-model="formData.name"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>생년월일</strong>
                  <div>
                    <input
                      type="text"
                      id="birthDate"
                      name="birthDate"
                      maxlength="40"
                      placeholder="생년월일"
                      value=""
                      v-model="formData.birthDate"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>이메일</strong>
                  <div class="member_email">
                    <div class="member_warning">
                      <input
                        type="text"
                        name="email"
                        id="email"
                        value=""
                        placeholder="이메일"
                        autocomplete="off"
                        tabindex="9"
                        v-model="formData.email"
                      />
                    </div>
                    <div class="member_warning js_email"></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>주소</strong>
                  <div>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      maxlength="40"
                      placeholder="주소"
                      value=""
                      v-model="formData.address"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      id="addressDetail"
                      name="addressDetail"
                      maxlength="40"
                      placeholder="상세주소"
                      value=""
                      v-model="formData.addressDetail"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td class="member_address">
                  <strong>휴대폰 번호</strong>
                  <div class="address_postcode">
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      maxlength="12"
                      placeholder="- 없이 입력하세요."
                      value=""
                      v-model="formData.phone"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <!-- 회원가입/정보 기본정보 -->
      </div>
      <div class="btn_center_box">
        <button type="button" id="btnCancel" class="btn_cancel" tabindex="18">
          취소
        </button>
        <button
          @click="signup"
          type="button"
          class="js_btn_join btn_ok"
          tabindex="17"
        >
          회원가입
        </button>
      </div>
    </form>
  </div>
</template>
<style scoped>
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
