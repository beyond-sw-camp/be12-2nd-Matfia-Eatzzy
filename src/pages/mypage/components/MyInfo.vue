<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useInformationsStore } from '../../../stores/useInformationsStore';
import { useRoute, useRouter } from 'vue-router'

const myinfoStore = useInformationsStore();

const route = useRoute();
const router = useRouter();

const userType = computed(() => {
    const pathSegments = route.path.split("/");
    if (pathSegments[2] === "seller") return "사업자";
    else return "일반";
});


// 모달 상태 및 관련 변수 정의
const isPostcodeModalVisible = ref(false); // 우편번호 검색 모달 여부
const address = ref(""); // 주소
const detailAddress = ref(""); // 상세주소

// 비밀번호 관련 상태
const currentPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");

const isPasswordHelpVisible = ref(false);
const isPasswordChangeVisible = ref(false);

// 이메일 관련 상태
const emailUsername = ref("");
const selectedEmailDomain = ref("self");

const placeholderText = computed(() => {
    return selectedEmailDomain.value === 'self'
        ? '이메일 입력'
        : `이메일 입력 (예: 아이디@${selectedEmailDomain.value})`;
});

// selectedEmailDomain 변경 시 emailUsername에 도메인 추가
watch(selectedEmailDomain, (newDomain) => {
    if (newDomain !== 'self') {
        const username = emailUsername.value.split('@')[0]; // '@' 제거 후 아이디만 추출
        emailUsername.value = `${username}@${newDomain}`;
    }
});
// 우편번호 검색 모달 열기
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

// 컴포넌트가 마운트되었을 때
onMounted(async () => {
    await myinfoStore.getInformationsList();
    loadPostcodeScript();  // 우편번호 스크립트 로드
});

const toggleHelpChange = () => {
  isPasswordHelpVisible.value = !isPasswordHelpVisible.value;
};

// 비밀번호 변경 div 숨기기 함수
const PasswordChange = () => {
  isPasswordChangeVisible.value = !isPasswordChangeVisible.value;
};

// 모달 닫기 함수
const closePostcodeModal = () => {
    isPostcodeModalVisible.value = false;
};

// 이메일 주소 업데이트
const updateEmail = () => {
    if (selectedEmailDomain.value === 'self') {
        myinfoStore.email = emailUsername.value;
    } else {
        myinfoStore.email = `${emailUsername.value}@${selectedEmailDomain.value}`;
    }
};

const updateUserInfo = (() => { 
    const result = confirm("정보를 수정하시겠습니까?");
    if (result) {
        alert("수정되었습니다.");
    }
})

const deleteAccount = (() => { 
    const result = confirm("탈퇴하시겠습니까? 계정과 관련된 모든 정보는 삭제됩니다.");
    if (result) {
        alert("탈퇴되었습니다.");
        router.push({ path: "/" }).then(() => {
            history.pushState(null, "", "/"); // 브라우저 히스토리 대체
        });
    }
})
</script>
<template>
    <div id="wrap">
      <div id="contents">
        <div class="mypage_wrap">
          <div class="mypage_cont">
            <div class="join_base_wrap">
              <section class="profile_box join_common">
                <div class="modify_title">
                  <strong>내 정보 수정</strong>
                </div>
  
                <div class="profile" style="margin: 1.25rem 0 1.875rem">
                  <strong>기본 정보</strong>
                  <dl>
                    <dt>이름</dt>
                    <dd>{{ myinfoStore.informations[0]?.name }}</dd>
                  </dl>
                  <dl>
                    <dt>휴대폰번호</dt>
                    <dd>{{ myinfoStore.informations[0]?.phone }}</dd>
                  </dl>
                  <dl>
                    <dt>유형</dt>
                    <dd>{{ userType }} 회원</dd>
                  </dl>
                </div>
  
                <h3>내 정보</h3>
  
                <strong>아이디</strong>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <input type="text" name="memId" :value="myinfoStore.informations[0]?.email" readonly />
                      </td>
                    </tr>
  
                    <tr class="member_password">
                      <td>
                        <strong>비밀번호</strong>
                        <div class="btn_common_box">
                          <span class="btn_gray_list">
                            <button @click="PasswordChange"><em>비밀번호 설정</em><span class="arrow">▼</span></button>
                          </span>
                          <span class="btn_gray_list">
                            <button @click="toggleHelpChange"><em>비밀번호 도움말</em><span class="arrow">▼</span></button>
                          </span>
                        </div>
  
                        <!-- 비밀번호 도움말-->
                        <div v-if="isPasswordHelpVisible" class="ly_parent">
                          <div class="ly_wrap pw_advice_layer">
                            <div class="ly_tit">
                              <div class="password_help">비밀번호 도움말</div>
                              <button class="x_button" @click="toggleHelpChange">&times;</button>
                            </div>
                            <div class="ly_cont">
                              <div class="pw_advice_list">
                                <ul class="paddings">
                                  <li class="paddings_li">영문대소문자는 구분이 되며, 한가지 문자로만 입력은 위험합니다.</li>
                                  <li class="paddings_li li_fontSize">
                                    <strong>사용가능 특수문자 :</strong>
                                    <strong class="fc_red">!@#$%^&amp;*()-=,.+?/&lt;&gt;”’~;[]{}</strong>
                                  </li>
                                  <li class="paddings_li">
                                    ID/주민번호/생일/전화번호 등의 개인정보와 통상 사용 순서대로의 3자 이상 연속 사용은 피해주세요.
                                    <br />
                                    비밀번호는 주기적으로 바꾸어 사용하시는 것이 안전합니다.
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
  
                        <!-- 비밀번호 설정-->
                        <table v-if="isPasswordChangeVisible">
                          <tbody>
                            <tr>
                              <td>
                                <strong>현재 비밀번호</strong>
                                <div class="member_warning">
                                  <input type="password" v-model="currentPassword" />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>새 비밀번호</strong>
                                <div class="member_warning">
                                  <input type="password" v-model="newPassword" />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>새 비밀번호 확인</strong>
                                <div class="member_warning">
                                  <input type="password" v-model="confirmPassword" />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
  
                    <!-- 이메일 칸 -->
                    <tr>
                      <td>
                        <strong>이메일</strong>
                        <div class="member_email">
                          <div class="member_warning">
                            <input type="text" v-model="emailUsername" :placeholder="placeholderText" />
                            <select v-model="selectedEmailDomain" class="chosen-select">
                              <option value="self">직접입력</option>
                              <option value="naver.com">naver.com</option>
                              <option value="hanmail.net">hanmail.net</option>
                              <option value="daum.net">daum.net</option>
                              <option value="nate.com">nate.com</option>
                              <option value="hotmail.com">hotmail.com</option>
                              <option value="gmail.com">gmail.com</option>
                              <option value="icloud.com">icloud.com</option>
                            </select>
                          </div>
                        </div>
                      </td>
                    </tr>
  
                    <!-- 주소 칸 -->
                    <tr>
                      <td class="member_address">
                        <strong>주소</strong>
                        <div class="address_input">
                          <div class="member_post">
                            <input type="text" :value="address" readonly />
                            <button type="button" class="btn_post_search" @click="openPostcodeModal">우편번호검색</button>
                          </div>
                          <div class="detail_address_input">
                            <input type="text" v-model="detailAddress" placeholder="상세 주소" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
  
              <div class="btn_center_box">
                <button type="button" class="btn_comfirm" @click="updateUserInfo">정보수정</button>
                <button type="button" class="btn_member_out" @click="deleteAccount">회원탈퇴</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- 우편번호 모달 -->
      <div class="layer_wrap" v-show="isPostcodeModalVisible" @click="closePostcodeModal">
        <div class="layer_area">
          <!-- 우편번호 모달 내용 -->
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .li_fontSize {
    font-size: 0.9375rem;
    border-top: 1px solid #e8e8e8;
    border-bottom: 1px solid #e8e8e8;
  }
  .ly_parent {
    position: relative;
  }
  .paddings {
    padding: 0.9375rem;
  }
  .paddings_li {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
  .ly_tit {
    display: flex;
    justify-content: space-between;
    font-size: 1.25rem;
    background: #f4f4f4;
  }
  .password_help {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 0.9375rem;
  }
  .x_button {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.5rem;
    width: 3.125rem;
    height: 3.125rem;
  }
  .member_post {
    display: flex;
    justify-content: space-between;
    /* 요소들 사이에 일정 간격을 둡니다. */
    align-items: center;
    /* 세로 방향으로 가운데 정렬 */
  }
  
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* 어두운 배경 */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: background 0.3s ease; /* 배경색 전환을 부드럽게 */
  }
  
  .modal.hidden {
    background: rgba(0, 0, 0, 0); /* 모달이 닫히면 배경색을 투명으로 */
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 500px;
    text-align: center;
  }
  
  .profile {
    border: 0.0625rem solid #e8e8e8;
    padding: 1.25rem;
    border-radius: 0.625rem;
    display: flex;
    flex-direction: column;
  }
  
  .profile dl {
    display: flex;
  }
  
  .profile dl:not(:last-child) {
    margin: 0 0 0.9375rem;
  }
  
  .profile dt {
    font-size: 0.875rem;
    color: #777;
    font-weight: 400;
    flex-basis: 5rem;
  }
  
  .profile strong {
    font-size: 1rem;
    font-weight: 500;
    margin: 0 0 1.25rem;
  }
  
  section {
    display: block;
    unicode-bidi: isolate;
  }
  
  .join_common {
    width: 34rem;
    margin: 0 auto;
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
  
  table {
    display: table;
    border-collapse: separate;
    box-sizing: border-box;
    text-indent: initial;
    unicode-bidi: isolate;
    border-color: gray;
  }
  
  td {
    vertical-align: inherit;
    unicode-bidi: isolate;
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
  
  .join_common table input[type="text"],
  .join_common table input[type="password"] {
    font-size: 1rem;
    height: 3.375rem;
    border: 0.0625rem solid #e8e8e8;
    padding: 0 1.125rem;
    border-radius: 0.5rem;
    background-color: #fff;
    margin: 0 !important;
    font-weight: 400;
    color: #333;
    flex-grow: 1;
    box-sizing: border-box;
    width: 100%;
  }
  
  .join_common table .member_warning {
    display: flex !important;
    gap: 0.625rem;
    flex-wrap: wrap;
  }
  
  #wrap .ly_wrap.pw_advice_layer {
    position: absolute;
    width: 24.625rem;
    top: -9px;
    left: 143px;
    border: 0.0625rem solid black;
    background-color: white;
    z-index: 10;
  }
  
  .address_postcode {
    display: flex;
    align-items: center;
    gap: 10px;
    /* 각 항목 사이의 간격을 추가 */
    width: 100%;
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
  
  #contents .member_address .address_postcode .btn_post_search {
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
  
  #contents .member_address .address_postcode {
    display: flex;
    gap: 0.625rem;
  }
  
  #contents .member_address .address_input {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }
  
  .mypage_wrap .mypage_cont .join_base_wrap .btn_center_box {
    margin-top: 3rem;
  }
  
  .join_base_wrap .btn_center_box button {
    font-size: 1rem;
    width: 11rem;
    height: 3.1875rem;
    margin-right: 1rem;
    font-weight: 600;
    border-radius: 0.5rem;
  }
  
  .btn_member_cancel {
    border: 0.0625rem solid #ccc;
    background: #fff;
    cursor: pointer;
    color: #777;
      transition: background-color 0.3s;
  }

  .btn_member_cancel:hover{
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  .btn_comfirm {
    color: #ffffff;
    border: 0.0625rem solid #ff7400;
    background: #ff7400;
    cursor: pointer;
      transition: background-color 0.3s;
  }

  .btn_comfirm:hover {
    background-color: #c96208;
  }
  
  .btn_member_out {
    color: #f33;
    border: 0.0625rem solid #f33;
    background: #fff;
    cursor: pointer;
      transition: background-color 0.3s;
  }

  .btn_member_out:hover {
    background-color: rgba(255, 51, 51, 0.1);
  }
  
  .join_common table .member_email .member_warning input[type="text"] {
    width: 0;
  }
  
  .join_common table .member_email {
    display: flex;
    gap: 0.625rem;
    flex-direction: column;
  }
  
  .join_common table .chosen-single span {
    line-height: 3.375rem;
  }
  
  .chosen-select {
    border-radius: 0.5rem;
    font-size: 1rem;
    padding: 0 0.5rem;
  }
  
  .modify_title {
    font-size: 1.4rem;
  }
  .btn_gray_list {
    padding: 0.3125rem 0.6875rem 0.3125rem 0.6875rem;
    border: 1px solid #dbdbdb;
    margin-right: 20px;
  }
  .arrow {
    padding-left: 10px;
  }
  </style>