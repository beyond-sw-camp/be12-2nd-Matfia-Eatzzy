<script setup>
import { useStoresStore } from "../../../stores/useStoresStore";
import SellerStoreCard from "./components/SellerStoreCard.vue";
import { onMounted } from "vue";

const storesStore = useStoresStore();

onMounted(async () => {
  await storesStore.getSellerStoresList();
});
</script>

<template>
  <main>
    <section class="mystore_box">
      <h1 class="mystore_title">내 식당 목록</h1>
      <div class="line"></div>
      <div class="store_list">
        <SellerStoreCard
          v-for="store in storesStore.stores"
          :key="store.id"
          :store="store"
        />
      </div>
    </section>
  </main>
</template>

<style scoped>
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
