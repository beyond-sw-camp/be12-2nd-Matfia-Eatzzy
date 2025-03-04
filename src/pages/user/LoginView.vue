<script setup>
import { ref } from "vue";
import { useMemberStore } from "../../stores/useMemberStore";
import { useRouter } from "vue-router";
const router = useRouter();
const memberStore = useMemberStore();
const loginData = ref({
  userId: "",
  password: "",
});

const login = async () => {
  await memberStore.login(loginData.value);
};
</script>
<template>
  <div class="main">
    <div class="location_wrap">
      <div class="location_cont">
        <em><a href="/" class="local_home">HOME</a> &gt; 로그인</em>
      </div>
    </div>
    <div class="content_wrap">
      <div class="member_wrap">
        <div class="member_cont">
          <div class="member_tit">
            <h2>로그인</h2>
          </div>
          <div class="member_login_box">
            <div class="login_input_sec">
              <input
                type="text"
                id="userId"
                name="userId"
                value=""
                placeholder="ID"
                v-model="loginData.userId"
              />
              <input
                type="password"
                id="password"
                name="password"
                value=""
                placeholder="PASSWORD"
                v-model="loginData.password"
              />
            </div>
            <button class="btn_submit" @click="login">로그인</button>
            <ul class="btn_login_box">
              <li>
                <a href="./Join" class="btn_member_join_new"> 회원가입 </a>
              </li>
              <!-- <li>
                <a href="./login/kakao" class="btn_member_join_new">카카오로 가입/로그인 </a>
              </li> -->
            </ul>
          </div>
          <!-- //login_box -->

          <!-- <div class="easy_login">
            <h3>SNS 간편 로그인</h3>
            <div class="sns_list">
              <a
                href="#"
                class="kakao_login js_btn_kakao_login"
                data-kakao-type="login"
                data-return-url="https%3A%2F%2Fwww.foodingfactory.com%2Fgoods%2Fbest.php"
              >
                <img
                  src="https://thenaum.cdn-nhncommerce.com/data/skin/front/moment/img/member/icon_kakao.png"
                  alt="카카오 아이디 로그인"
                />
              </a>
              <a
                href="#"
                class="naver_login js_btn_naver_login"
                data-naver-url="https://socialmember.godo.co.kr/NaverLogin/naver_api.php?mode=login&amp;response_type=code&amp;client_id=JFIziYYgMBSYpY5KjrY9&amp;redirect_uri=https%3A%2F%2Fwww.foodingfactory.com%2Fgoods%2Fbest.php&amp;state=9cd077e6ebb76da5ccf25819b39b6736"
              >
                <img
                  src="https://thenaum.cdn-nhncommerce.com/data/skin/front/moment/img/member/icon_naver.png"
                  alt="naver 아이디 로그인"
                />
              </a>

              <a href="#" class="btn_apple_login js_btn_apple_login">
                <img
                  id="apple_btn"
                  src="https://thenaum.cdn-nhncommerce.com/data/skin/front/moment/img/member/icon_apple.png"
                  alt="Apple 아이디 로그인"
                />
              </a>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.main {
  width: 90%;
}
input[type="checkbox"] + label:before,
input[type="radio"] + label:before {
  display: inline-block;
  position: static;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.25rem;
  border: 0.0625rem solid #ff7400;
  margin: 0 0.5rem 0 0;
  box-sizing: border-box;
  vertical-align: top;
}

input[type="checkbox"] + label:after,
input[type="radio"] + label:after {
  left: 0.375rem;
  margin-top: -0.25rem;
}

input[type="checkbox"] + label,
input[type="radio"] + label {
  font-size: 0.875rem;
  line-height: 170%;
  padding: 0;
  user-select: none;
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
  padding-bottom: 0.625rem;
  color: #777777;
  font-size: 0.7813rem;
}

.location_cont .local_home {
  color: #777777;
}

.location_wrap .location_cont:after {
  display: block;
  clear: both;
  content: "";
}

.content_wrap {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  max-width: 25rem;
}
.member_wrap {
  margin: 0;
  width: 46.875rem;
  display: flex;
  gap: 2.4375rem;
}
.member_cont {
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  border: none;
  flex-grow: 1;
}
.member_wrap * {
  letter-spacing: -0.05em !important;
}

.member_tit h2 {
  font-size: 1.625rem;
  line-height: 1.625rem;
  font-weight: 500;
  margin: 0 0 0 0;
}

.login_frm {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}
.member_login_box {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.member_cont .member_login_box .login_input_sec {
  overflow: hidden;
}
.login_input_sec {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.member_cont .member_login_box .login_input_sec input {
  margin: 0;
  border: none;
  width: 100%;
  padding: 0 1rem;
  height: 3.5rem;
  background-color: #f2f2f2;
  border-radius: 0.5rem;
  font-size: 1rem;
  display: block;
  color: #979d9d;
}

.member_cont .member_login_box .id_chk {
  display: flex;
  gap: 0.75rem;
  padding: 0 0.5rem;
}
.member_cont .member_login_box .id_chk span {
  display: inline-block;
}
.member_cont .member_login_box .id_chk input {
  display: none;
}

.member_cont .member_login_box .id_chk p {
  padding: 0.375rem 0 0 0;
}

.member_login_box button.btn_submit {
  height: 3.5rem;
  background-color: #ff7400;
  border-radius: 0.5rem;
  color: #fff;
  font-size: 1.125rem;
  font-weight: 500;
}

.member_cont .btn_login_box {
  margin: 0;
  border: none;
  padding: 0;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  overflow: hidden;
}

.member_cont .btn_login_box li {
  float: none;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.member_cont .btn_login_box li:first-child {
  margin: 0;
}

.member_cont .btn_login_box button {
  display: inline-block;
  font-size: 0.875rem;
  line-height: 1.875rem;
  font-weight: 400;
  color: #595959;
}

.member_cont .btn_login_box li:not(:last-child):after {
  content: "";
  display: block;
  width: 0.0625rem;
  height: 0.75rem;
  background-color: #d9d9d9;
}

.easy_login {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.easy_login h3 {
  font-size: 1rem;
  line-height: 170%;
  color: #595959;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: normal;
}

.easy_login h3:before,
.easy_login h3:after {
  content: "";
  display: block;
  width: 0.0625rem;
  height: 0.0625rem;
  flex-grow: 1;
  background-color: #d9d9d9;
}

.easy_login .sns_list {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

.easy_login .sns_list img {
  width: 3.25rem;
  height: 3.25rem;
}

.sub_content:after {
  display: block;
  clear: both;
  content: "";
}
</style>
