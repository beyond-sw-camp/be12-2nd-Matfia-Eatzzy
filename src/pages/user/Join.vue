<script setup></script>
<template>
  <div class="main">
    <div class="location_wrap">
      <div class="location_cont">
        <em
          ><a href="/" class="local_home">HOME</a> &gt; 회원가입 &gt; 가입방법
          선택</em
        >
      </div>
    </div>
    <div class="content_wrap">
      <div class="member_wrap">
        <div class="member_tit">
          <h2>회원가입</h2>
        </div>
        <div class="join_tit">
          Eatzzy 회원가입하고<br />할인, 이벤트 등 다양한 혜택을 만나보세요!
        </div>
        <div class="member_cont">
          <div class="member_login_box">
            <!-- <a
              href="#"
              class="js_btn_kakao_login"
              data-kakao-type="join_method"
              data-return-url="/member/join_method.php"
            >
              <span class="left">
                <img
                  src="/src/assets/icons/icon_kakao.png"
                  alt="카카오"
                />
                <span> 카카오톡 회원가입</span>
              </span>
              <img
                src="/src/assets/icons/arrow_right_b.svg"
                class="right_arrow"
              />
            </a> -->
            <!-- <a
              href="/join_agreement"
              class="js_btn_naver_login"
              data-naver-type="join_method"
              data-naver-url=""
            >
              <span class="left">
                <img
                  src="/src/assets/icons/icon_naver.png"
                  alt="네이버"
                />
                <span>네이버 회원가입</span>
              </span>
              <img
                src="/src/assets/icons/arrow_right_b.svg"
                class="right_arrow"
              />
            </a> -->

            <a href="/join_form" id="btnJoin" class="login_box">
              <span class="left">
                <img
                  src="/src/assets/icons/fd_gom.svg"
                  alt="쇼핑몰"
                />
                <span>쇼핑몰 회원가입</span>
              </span>
              <img
                src="/src/assets/icons/arrow_right_b.svg"
                class="right_arrow"
              />
            </a>
          </div>
        </div>
        <div class="member_guide_txt">
          <p>
            이미 쇼핑몰 회원이신가요?
            <router-link to="/login" class="login_btn">로그인</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
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
.main {
  width: 50%;
  min-width: 600px;
  margin: 0 auto;
}
.content_wrap {
  width: 100%;
}

.content_wrap .member_wrap .member_tit h2 {
  font-size: 26px;
  line-height: 26px;
  letter-spacing: -0.05em;
  font-weight: 500;
}

.content_wrap .member_wrap .join_tit {
  margin: 20px 0 0 0;
  font-size: 15px;
  line-height: 22px;
  letter-spacing: -0.05em;
  color: #777;
}

.content_wrap .member_wrap .member_cont {
  padding: 30px 0;
  border: none;
}

.content_wrap .member_wrap .member_cont .member_login_box {
  display: flex;
  flex-direction: column;
}

.content_wrap .member_wrap .member_cont .member_login_box a {
  flex-grow: 1;
  height: 65px;
  padding: 0 25px;
  border-radius: 12px;
  border: 1px solid #e8e8e8;
  display: flex;
  align-items: center;
  font-size: 15px;
  line-height: 15px;
  letter-spacing: -0.05em;
  color: #555;
  justify-content: space-between;
}

.content_wrap .member_wrap .member_cont .member_login_box a .left {
  display: flex;
  align-items: center;
}

.content_wrap .member_wrap .member_cont .member_login_box a .left img {
  margin: 0 12px 0 0;
  width: 35px;
}

.content_wrap .member_wrap .member_cont .member_login_box a {
  font-size: 15px;
  line-height: 15px;
  letter-spacing: -0.05em;
  color: #555;
}

.content_wrap .member_wrap .member_cont .member_login_box a .right_arrow {
  width: 6px;
  height: 11px;
  opacity: 0.2;
}

.content_wrap
  .member_wrap
  .member_cont
  .member_login_box
  > *:not(:first-child) {
  margin: 12px 0 0 0;
}

@media (max-width: 960px) {
  .main {
    min-width: 25rem;
    max-width: 35rem;
  }
}
</style>
