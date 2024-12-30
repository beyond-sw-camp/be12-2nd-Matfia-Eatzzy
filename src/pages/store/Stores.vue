<script setup>
import { onMounted, ref } from "vue";
import { useStoresStore } from "../../stores/useStoresStore";
import OrderBox from "./components/OrderBox.vue";
import StoreCard from "./components/StoreCard.vue";
import BigCategory from "./components/BigCategory.vue";
import SmallCategory from "./components/SmallCategory.vue";

const storesStore = useStoresStore();
const filter = ref({
  sort: storesStore.sort,
  place: "서울",
  category: 1,
});
const storeList = ref([]);

onMounted(async () => {
  const result = await storesStore.getStoreList(filter);
  storeList.value = result.stores;
});
</script>

<template>
  <div class="main">
    <h1>맛집 리스트</h1>
    <BigCategory />
    <SmallCategory />
    <OrderBox />
    <div class="store_list">
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
