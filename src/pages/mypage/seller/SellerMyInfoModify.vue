<script setup>
import { ref, onMounted } from "vue";
import { useInformationsStore } from '../../../stores/useInformationsStore';

const myinfoStore = useInformationsStore();

// 모달 상태 및 관련 변수 정의
const isPostcodeModalVisible = ref(false); // 우편번호 검색 모달 여부
const postcode = ref(""); // 우편번호
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

// 우편번호 검색 모달 열기
const openPostcodeModal = () => {
    isPostcodeModalVisible.value = true;
    new daum.Postcode({
        oncomplete: function (data) {
            postcode.value = data.zonecode; // 우편번호
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

// 비밀번호 도움말 토글
const togglePasswordHelp = () => {
    isPasswordHelpVisible.value = !isPasswordHelpVisible.value;
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
</script>

<template>
    <div id="wrap">
        <div id="contents">
            <div class="mypage_wrap">
                <div class="mypage_cont">
                    <div class="join_base_wrap">
                        <section class="profile_box join_common">
                            <div class="modify_title" style="margin: 3.125rem 0 1.875rem .625rem">
                                <strong>점주 정보 수정</strong>
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
                            </div>

                            <h3>점주 정보</h3>

                            <strong>아이디</strong>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input type="text" name="memId" :value="myinfoStore.informations[0]?.email"
                                                readonly />
                                        </td>
                                    </tr>

                                    <tr class="member_password">
                                        <td>
                                            <strong>비밀번호</strong>
                                            <div class="btn_common_box">
                                                <span class="btn_gray_list">
                                                    <a href="#memberNewPw" class="btn_gray_mid">
                                                        <em>비밀번호 설정</em>
                                                    </a>
                                                </span>
                                                <span class="btn_gray_list">
                                                    <a href="#lyMemberPw" class="btn_gray_mid">
                                                        <em>비밀번호 도움말</em>
                                                    </a>
                                                </span>
                                            </div>

                                            <!-- 비밀번호 도움말-->
                                            <div id="lyMemberPw" class="layer_area" v-show="isPasswordHelpVisible">
                                                <div class="ly_wrap pw_advice_layer">
                                                    <div class="ly_tit">
                                                        <strong>비밀번호 도움말</strong>
                                                    </div>
                                                    <div class="ly_cont">
                                                        <div class="pw_advice_list">
                                                            <ul>
                                                                <li>
                                                                    영문대소문자는 구분이 되며, 한가지 문자로만
                                                                    입력은 위험합니다.
                                                                </li>
                                                                <li>
                                                                    <strong>사용가능 특수문자 :</strong>
                                                                    <strong
                                                                        class="fc_red">!@#$%^&amp;*()-=,.+?/&lt;&gt;”’~;[]{}</strong>
                                                                </li>
                                                                <li>
                                                                    ID/주민번호/생일/전화번호 등의 개인정보와
                                                                    통상 사용 순서대로의 3자 이상 연속 사용은
                                                                    피해주세요.
                                                                    <br />
                                                                    비밀번호는 주기적으로 바꾸어 사용하시는 것이
                                                                    안전합니다.
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <a href="#lyMemberPw" class="ly_close" @click="togglePasswordHelp">
                                                        <img src="https://thenaum.cdn-nhncommerce.com/data/skin/front/moment/img/common/layer/btn_layer_close.png"
                                                            alt="닫기" />
                                                    </a>
                                                </div>
                                            </div>

                                            <!-- 비밀번호 설정-->
                                            <table id="memberNewPw" class="member_pw_change"
                                                v-show="isPasswordChangeVisible">
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
                                                    <input type="text" v-model="emailUsername"
                                                        placeholder="이메일 입력" />
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
                                            <div class="address_postcode">
                                                <input type="text" v-model="postcode" placeholder="우편번호" readonly />
                                                <button type="button" class="btn_post_search"
                                                    @click="openPostcodeModal">
                                                    우편번호검색
                                                </button>
                                            </div>
                                            <div class="address_input">
                                                <div class="member_warning">
                                                    <input type="text" v-model="address" placeholder="도로명 주소"
                                                        readonly />
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
                                <button type="button" class="btn_member_cancel" @click="cancelChanges">
                                    취소
                                </button>
                                <button type="button" class="btn_comfirm" @click="updateUserInfo">
                                    정보수정
                                </button>
                                <button type="button" class="btn_member_out" @click="deleteAccount">
                                    회원탈퇴
                                </button>
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
    border: .0625rem solid #E8E8E8;
    padding: 1.25rem;
    border-radius: .625rem;
    display: flex;
    flex-direction: column;
}

.profile dl {
    display: flex;
}

.profile dl:not(:last-child) {
    margin: 0 0 .9375rem;
}

.profile dt {
    font-size: .875rem;
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
    width: 31.25rem;
    margin: 0 auto;
    text-align: left;
}

.join_common h3 {
    display: block;
    border-bottom: .0625rem solid #555;
    padding: 0 0 1.125rem;
    margin: 0 0 .9375rem;
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
    padding: .9375rem 0;
    gap: .625rem;
}

.join_common table input[type="text"],
.join_common table input[type="password"] {
    font-size: 1rem;
    height: 3.375rem;
    border: .0625rem solid #E8E8E8;
    padding: 0 1.125rem;
    border-radius: .5rem;
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
    gap: .625rem;
    flex-wrap: wrap;
}

#wrap .ly_wrap.pw_advice_layer {
    width: 24.625rem;
    top: 0rem;
    left: 7.375rem;
}

.address_postcode {
    display: flex;
    align-items: center;
    gap: 10px;
    /* 각 항목 사이의 간격을 추가 */
    width: 100%;
}

#contents .member_address .address_postcode .btn_post_search {
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

#contents .member_address .address_postcode {
    display: flex;
    gap: .625rem;
}

#contents .member_address .address_input {
    display: flex;
    flex-direction: column;
    gap: .625rem;
}


.mypage_wrap .mypage_cont .join_base_wrap .btn_center_box {
    margin: 3.75rem 0 0 0;
}

.join_base_wrap .btn_center_box button {
    font-size: 1.125rem;
    font-weight: 400;
    width: 13.5rem;
    height: 3.1875rem;
    margin-right: 1rem;
}

.btn_member_cancel {
    border: .0625rem solid #00a7b3;
    background: #fff;
    cursor: pointer;
}

.btn_comfirm {
    color: #ffffff;
    border: .0625rem solid #00a7b3;
    background: #00a7b3;
    cursor: pointer;
}

.btn_member_out {
    color: #F33;
    border: .0625rem solid #F33;
    background: #fff;
    cursor: pointer;
}

.join_common table .member_email .member_warning input[type="text"] {
    width: 0;
}

.join_common table .member_email {
    display: flex;
    gap: .625rem;
    flex-direction: column;
}

.join_common table .chosen-single span {
    line-height: 3.375rem;
}

.chosen-select {
    border-radius: .5rem;
    font-size: 1rem;
}

.modify_title {
    font-size: 1.875rem;
}
</style>