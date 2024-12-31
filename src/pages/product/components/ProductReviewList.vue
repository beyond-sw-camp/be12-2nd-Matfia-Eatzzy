<template>
  <div id="review_box" class="content_box">
    <div class="review_header">
      <img src="/src/assets/icons/star_fill.svg" alt="star" />
      <div>
        <p>4.7</p>
        <span>53개의 리뷰</span>
      </div>
    </div>

    <ul class="review_list">
      <li class="review_item">
        <div class="star_box">
          <img src="/src/assets/icons/star_fill.svg" alt="star" />
          <img src="/src/assets/icons/star_fill.svg" alt="star" />
          <img src="/src/assets/icons/star_fill.svg" alt="star" />
          <img src="/src/assets/icons/star_fill.svg" alt="star" />
          <img src="/src/assets/icons/star_empty.svg" alt="star" />
        </div>
        <div class="review_user">
          <span id="userName">박**</span>
          <span id="createdAt">24.12.17</span>
        </div>
        <div class="review_image_box">
          <img
            src="https://d12zq4w4guyljn.cloudfront.net/750_750_20241123105001_photo1_394db3cb2fa0.jpg"
            alt="review image1"
          />
          <img
            src="https://d12zq4w4guyljn.cloudfront.net/750_750_20241123105001_photo1_394db3cb2fa0.jpg"
            alt="review image2"
          />
        </div>
        <p>
          세트메뉴로 나름 저렴하게 먹었습니다! 직원분들이 고기 부위 설명해주시고
          다 구워주십니다. 두툼한 고기가 정말 맛있었어요! 송리단길 고기집으로
          추천드립니다!
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup></script>

<style>
.review_header {
  display: flex;
  justify-content: center;
  gap: 1rem;
  border: 1px solid #ccc;
  padding: 1.5rem 0;
}

.review_header > img {
  width: 3rem;
  height: 3rem;
}

.review_header > div > p {
  font-size: 1.2rem;
  font-weight: 700;
}

/* 리뷰 아이템 */
.review_item {
  padding: 1.5rem 1rem;
  border-bottom: 1px solid #d8dde5;
}

.star_box {
  display: flex;
  margin: 0 0 0.2rem -0.2rem;
}

.review_user {
  color: #7e7e7e;
  font-size: 0.8rem;
  margin-bottom: 1rem;
}

.review_user > #userName::after {
  content: "•";
  margin-left: 0.3rem;
  color: #ccc;
}

.review_image_box {
  width: 30rem;
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  margin: 1rem 0;
}

.review_image_box > img {
  width: 10rem;
  border-radius: 1rem;
}
</style>
