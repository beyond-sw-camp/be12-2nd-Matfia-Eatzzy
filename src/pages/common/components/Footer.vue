<script setup></script>

<template>
  <footer>
    <div class="ft_sec_2">
      <div class="ft_contents_wrap_2">
        <address>
          <span class="company">Eatzzy</span><br />대표 :
          홍길동&nbsp;&nbsp;&nbsp;&nbsp;사업자 등록번호 :
          123-45-78901&nbsp;&nbsp;&nbsp;&nbsp;통신판매업 신고 :
          제2024-동작-0000호 본사 : 서울특별시 동작구
          신대방동&nbsp;&nbsp;&nbsp;&nbsp;<br />고객센터 :
          1599-0000&nbsp;&nbsp;&nbsp;&nbsp;개인정보관리책임자 :
          홍길동&nbsp;&nbsp;&nbsp;&nbsp;<br />Copyright 2014. www.eatzzy.com All
          rights reserved.
        </address>
        <div class="ft_sec_2_r">
          <div class="ft_cs">
            <h3>고객상담센터</h3>
            <h4>1599-0000</h4>
            <p>
              평일 10:00 ~ 18:00 (점심시간 12:00 ~ 13:00)<br />주말&nbsp;&nbsp;·&nbsp;&nbsp;공휴일
              휴무
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="ft_sec_3">
      <div class="ft_contents_wrap_3">
        <div class="payment">
          <div>
            고객님은 안전거래를 위해 현금 등으로 결제시 저희 쇼핑몰에서 가입한
            PG 사의 구매안전서비스를 이용하실 수 있습니다.<br />NHN KCP
            에스크로<button>
              <router-link to="/">서비스가입사실확인</router-link>
            </button>
          </div>
          <img
            src="/src/assets/icons/fee4e47f3e4c529b1f2c751035a4492c_42374.gif"
            alt="KGINISIS KB국민은행 롯데택배 공정거래위원회인증 표준약관사용 COMODO"
            title="KGINISIS KB국민은행 롯데택배 공정거래위원회인증 표준약관사용 COMODO"
          />
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  text-align: left;
}

footer .ft_contents_wrap_1 {
  max-width: 78.75rem;
  width: 90%;
  margin: 0 auto;
  min-height: 2.875rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

footer .ft_sec_2 {
  width: 100%;
  border-top: 1px solid #ccc;
}

footer .ft_sec_2 .ft_sec_2_r {
  min-width: 22.1875rem;
}

footer .ft_contents_wrap_2 {
  max-width: 78.75rem;
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 2.125rem 0;
  row-gap: 1rem;
}

footer .ft_sec_2 address {
  color: #555;
  font-size: 0.8125rem;
  font-weight: 400;
  line-height: 1.25rem;
  word-break: keep-all;
}

footer .ft_sec_2 address .company {
  color: #333;
  font-size: 0.9375rem;
  font-weight: 500;
}

footer .ft_sec_2 .ft_sec_2_r .ft_cs h3 {
  color: #333;
  font-size: 1.25rem;
  font-weight: 500;
  display: inline-block;
  vertical-align: top;
  margin: 0.25rem 0 0 0;
  line-height: 1.25rem;
}

footer .ft_sec_2 .ft_sec_2_r .ft_cs h4 {
  font-family: "Open Sans";
  font-size: 1.5rem;
  color: #ff7400;
  font-weight: 700;
  display: inline-block;
  vertical-align: top;
  margin: 0.0625rem 0 0 0.5rem;
  line-height: 1.5rem;
}

footer .ft_sec_2 .ft_sec_2_r .ft_cs button {
  width: 7rem;
  height: 1.4375rem;
  border: 0.0625rem solid #c5c5c5;
  box-sizing: border-box;
  margin: 0.125rem 0 0 0.6875rem;
}

footer .ft_sec_2 .ft_sec_2_r .ft_cs button a {
  font-size: 0.6875rem;
  font-weight: 500;
  color: #707070;
  display: inline-block;
  width: 6.875rem;
  height: 1.3125rem;
  line-height: 1.375rem;
}

footer .ft_sec_2 .ft_sec_2_r .ft_cs p {
  font-size: 0.875rem;
  font-weight: 400;
  color: #555;
  line-height: 1.25rem;
  margin: 0.5625rem 0 0 0;
}

footer .ft_sec_3 {
  width: 100%;
  background: #363636;
}

footer .ft_contents_wrap_3 {
  max-width: 78.75rem;
  width: 90%;
  margin: 0 auto;
  padding: 1.25rem 0;
  box-sizing: border-box;
}

footer .ft_sec_3 p {
  max-width: 78.75rem;
  width: 100%;
  min-height: 4.3125rem;
  background: #2a2a2a;
  color: #fff;
  padding: 1.0625rem 1.625rem;
  box-sizing: border-box;
  font-size: 0.8125rem;
  font-weight: 300;
  line-height: 1.125rem;
}

footer .ft_sec_3 .payment {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

footer .ft_sec_3 .payment > div {
  color: #afafaf;
  margin: 1.1875rem 0 0 0.0625rem;
  font-size: 0.8125rem;
  font-weight: 400;
  line-height: 1.1875rem;
}
footer .ft_sec_3 .payment > div button {
  width: 7rem;
  height: 1.1875rem;
  border: 0.0625rem solid #6a6a6a;
  box-sizing: border-box;
  margin: 0 0 0.125rem 0.25rem;
}

footer .ft_sec_3 .payment > div button a {
  color: #cfcfcf;
  font-size: 0.6875rem;
  display: inline-block;
  width: 6.875rem;
  height: 1.0625rem;
  vertical-align: top;
  line-height: 1.1875rem;
}

footer .ft_sec_3 .payment img {
  max-width: 100%;
}

@media (min-width: 1200px) {
  footer .ft_sec_2 .ft_sec_2_r {
    width: 31.75rem;
  }
}
</style>
