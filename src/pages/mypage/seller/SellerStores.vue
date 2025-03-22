<script setup>
import { useLoadingStore } from "../../../stores/useLoadingStore";
import { useStoresStore } from "../../../stores/useStoresStore";
import SellerStoreCard from "./components/SellerStoreCard.vue";
import { onMounted } from "vue";

const loadingStore = useLoadingStore();
const storesStore = useStoresStore();

onMounted(async () => {
  loadingStore.startLoading();
  await storesStore.getSellerStoresList();
  loadingStore.stopLoading();
});
</script>

<template>
  <main>
    <section class="mystore_box">
      <h1 class="mystore_title">내 식당 목록</h1>
      <div class="line"></div>
    <div v-if="loadingStore.isLoading" class="spinner_box">
      <VueSpinner size="30" color="#ff7400"/>
    </div>
      <div class="store_list">
        <SellerStoreCard
          v-for="store in storesStore.mystores"
          :store="store"
        />
      </div>
    </section>
  </main>
</template>

<style scoped>
.spinner_box {
  width: 4rem;
  height: 20rem;
  margin: 10rem auto;
}

.mystore_box {
  width: 100%;
  margin: 0 auto;
  text-align: left;
}

.content {
  width: 100%;
  margin: 1.875rem 0 0 0;
}

.mystore_title {
  font-size: 1.4rem;
  font-weight: 800;
  margin-bottom: 2rem;
}

.store_list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
