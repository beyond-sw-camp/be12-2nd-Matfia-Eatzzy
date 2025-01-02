<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useStoresStore } from "../../stores/useStoresStore";
import ReservationBox from "./components/ReservationBox.vue";
import StoreDescription from "./components/StoreDescription.vue";
import StoreMenuList from "./components/StoreMenuList.vue";
import StoreReviewList from "./components/StoreReviewList.vue";
import ImgCarousel from "./components/ImgCarousel.vue";
import { useLoadingStore } from "../../stores/useLoadingStore";
import { VueSpinner } from "vue3-spinners";

const storeData = ref({
  name: "",
  description: "",
  category: "",
  shortAddress: "",
  address: "",
  call_number: "",
  opening_hours: "",
  start_time: "",
  end_time: "",
  closed_day: "",
  starPoint: 0.0,
  reviewCnt: 0,
  menus: [],
  images: [],
});
const like = ref(false);

const route = useRoute();
const loadingStore = useLoadingStore();
const storesStore = useStoresStore();

const changeTab = (tab) => {
  storesStore.setStoreTab(tab);
};

const likeClick = () => { 
  like.value = !like.value;
}

onMounted(async () => {
  loadingStore.startLoading("storeDetail");
  const storeIdx = route.params.id;
  const result = await storesStore.getStoreDetail(storeIdx);
  storeData.value = result.store;
  setTimeout(() => {
    loadingStore.stopLoading();
  }, 500);
});
</script>

<template>
    <div v-if="loadingStore.getIsLoading('storeDetail')" class="spinner_box">
      <VueSpinner size="30" color="#ff7400"/>
    </div>
  <div v-else class="main">
    <section class="store">
      <div class="store_info">
        <ImgCarousel :images="storeData.images" />

        <div class="title_grade_box">
          <div class="title_box">
            <h1 class="name">{{ storeData.name }}</h1>
            <button class="heart_box" @click="likeClick">
              <img v-if="!like" src="/src/assets/icons/heart_empty.svg" alt="heart" />
              <img v-if="like" src="/src/assets/icons/heart_fill.svg" alt="heart" />
            </button>
          </div>

          <span class="subtitle"
            >{{ storeData.shortAddress }} | {{ storeData.category }}</span
          >
          <div class="grade">
            <img src="/src/assets/icons/star_fill.svg" alt="star" />
            <div class="point">
              <span class="review_point">{{ storeData.starPoint }}</span>
              <span class="review_count"
                >(리뷰 {{ storeData.reviewCnt }}개)</span
              >
            </div>
          </div>
        </div>

        <div class="info_box">
          <ul>
            <li class="info_list">
              <img src="/src/assets/icons/map.svg" alt="장소" />
              <span>{{ storeData.address }}</span>
            </li>
            <li class="info_list">
              <img src="/src/assets/icons/call.svg" alt="전화번호" />
              <span>{{ storeData.call_number }}</span>
            </li>
            <li class="info_list">
              <img src="/src/assets/icons/clock.svg" alt="영업시간" />

              <span>{{ storeData.opening_hours }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="mobile_reservation">
        <ReservationBox />
      </div>

      <ul class="store_tab_list">
        <li
          class="store_tab_item"
          :class="{ picked: storesStore.storeTab === 'description' }"
          @click="changeTab('description')"
        >
          소개
        </li>
        <li
          class="store_tab_item"
          :class="{ picked: storesStore.storeTab === 'menu' }"
          @click="changeTab('menu')"
        >
          메뉴
        </li>
        <li
          class="store_tab_item"
          :class="{ picked: storesStore.storeTab === 'review' }"
          @click="changeTab('review')"
        >
          리뷰
        </li>
      </ul>

      <StoreDescription
        v-if="storesStore.storeTab === 'description'"
        :description="storeData.description"
      />
      <StoreMenuList
        v-if="storesStore.storeTab === 'menu'"
        :menu="storeData.menus"
      />
      <StoreReviewList v-if="storesStore.storeTab === 'review'" />
    </section>

    <aside class="reservation">
      <ReservationBox />
    </aside>
  </div>
</template>

<style scoped>
.spinner_box {
  width: 4rem;
  height: 20rem;
  margin: 10rem auto;
}

.main {
  display: flex;
  justify-content: space-between;
}

.store {
  width: 100%;
}

.store_info > img {
  width: 100%;
  height: 31.25rem;
  object-fit: cover;
  margin-bottom: 2.5rem;
}

.title_grade_box {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2rem;
  margin: 0 0 1.2rem 0.625rem;
}

.title_box {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
}

.title_box .name {
  font-size: 2.2rem;
  color: #202020;
  font-weight: 700;
}

.heart_box {
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  display: grid;
  place-content: center;
}

.heart_box > img {
  width: 1.1rem;
  height: 1.1rem;
}

.subtitle {
  font-size: 1rem;
  color: #7e7e7e;
}

.grade {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 1rem;
}

.grade > img {
  width: 1.8rem;
  height: 1.8rem;
}

.grade .point {
  display: flex;
  align-items: center;
  gap: 0.2rem;
}

.point .review_point {
  color: #202020;
  font-size: 1.25rem;
  font-weight: 500;
}

.point .review_count {
  color: #9e9e9e;
}

/* 가게 세부 정보 */
.info_box {
  padding: 1rem 0.7rem;
}

.info_list {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.info_list > img {
  width: 1rem;
  height: 1rem;
}

.info_list > span {
  color: #1a1a1a;
  font-size: 0.9rem;
}

/* 탭 선택 */
.store_tab_list {
  width: 100%;
  height: 2.5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 1rem 0 2rem;
  border-top: 1px solid #cecece;
  border-bottom: 1px solid #cecece;
}

.store_tab_item {
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: content-box;
  font-size: 1rem;
}

.store_tab_item:active,
.store_tab_item:hover {
  border-bottom: 1px solid #000;
}

.store_tab_item.picked {
  font-weight: 700;
}

/* 예약 */
.reservation {
  width: 20rem;
  margin-left: 3rem;
  z-index: 10;
  display: flex;
  flex-direction: column;
}

.mobile_reservation {
  display: none;
}

@media (max-width: 960px) {
  .main {
    min-width: auto;
    max-width: 35rem;
  }
  .store {
    min-width: 25rem;
  }
  .store_info > img {
    width: 100%;
    height: 18.75rem;
    max-width: 35rem;
  }
  .reservation {
    display: none;
  }
  .mobile_reservation {
    display: block;
  }
  .store_tab_list {
    margin-top: 4rem;
  }
}
</style>
