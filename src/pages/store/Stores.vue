<script setup>
import { onMounted, ref } from "vue";
import { useStoresStore } from "../../stores/useStoresStore";
import { useLoadingStore } from "../../stores/useLoadingStore";
import OrderBox from "./components/OrderBox.vue";
import StoreCard from "./components/StoreCard.vue";
import BigCategory from "./components/BigCategory.vue";
import SmallCategory from "./components/SmallCategory.vue";
import { VueSpinner } from "vue3-spinners";

const loadingStore = useLoadingStore();
const storesStore = useStoresStore();

const filter = ref({
  sort: storesStore.sort,
  place: "서울",
  category: 1,
});
const storeList = ref([]);

onMounted(async () => {
  loadingStore.startLoading("stores");
  const result = await storesStore.getStoreList(filter);
  storeList.value = result.stores;
  setTimeout(() => {
    loadingStore.stopLoading();
  }, 500);
});
</script>

<template>
  <div class="main">
    <h1>맛집 리스트</h1>
    <BigCategory />
    <SmallCategory />
    <OrderBox />
    <div v-if="loadingStore.isLoading" class="spinner_box">
      <VueSpinner size="30" color="#ff7400" />
    </div>
    <div v-else class="store_list">
      <StoreCard
        v-for="store in storeList || []"
        :key="store.idx"
        :store="store"
      />
    </div>
  </div>
</template>

<style scoped>
.main > h1 {
  margin: 0.625rem 0 1.875rem;
}

.spinner_box {
  width: 4rem;
  height: 20rem;
  margin: 5rem auto 0;
}

.store_list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2.5rem 1.5rem;
  width: 100%;
}

@media (max-width: 960px) {
  .main {
    min-width: 25rem;
    max-width: 35rem;
  }
  .store_list {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
