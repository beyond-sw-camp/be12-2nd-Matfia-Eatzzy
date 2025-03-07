<script setup>
import { ref, watch } from "vue";
import { useStoresStore } from "../../../stores/useStoresStore";

const storesStore = useStoresStore();

watch(
  () => storesStore.sort,
  async () => {
    await storesStore.getStoreList(page.value, size.value, categoryIdx.value);
  }
);

const setOrder = (newOrder) => {
  storesStore.sort = newOrder;
};
</script>

<template>
  <div class="order_box">
    <ul class="orderby">
      <li
        class="orderby_list"
        :class="{ picked: storesStore.sort === 'likecount' }"
        @click="setOrder('likecount')"
      >
        좋아요순
      </li>
      <li
        class="orderby_list"
        :class="{ picked: storesStore.sort === 'starPoint' }"
        @click="setOrder('starPoint')"
      >
        평점순
      </li>
      <li
        class="orderby_list"
        :class="{ picked: storesStore.sort === 'reviewCount' }"
        @click="setOrder('reviewCount')"
      >
        리뷰 많은 순
      </li>
    </ul>
  </div>
</template>

<style scoped>
.order_box {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.25rem;
}

.orderby {
  display: flex;
  gap: 0.625rem;
}

.orderby_list {
  height: 1.5rem;
  display: grid;
  place-content: center;
  color: #ff7400;
  background-color: #fff;
  font-size: 0.75rem;
  border: 1px solid #ff7400;
  border-radius: 6.25rem;
  padding: 0 0.625rem;
  line-height: 0;
  cursor: pointer;
}

.orderby .picked {
  background-color: #ff7400;
  color: white;
  border-color: #ff7400;
}
</style>
