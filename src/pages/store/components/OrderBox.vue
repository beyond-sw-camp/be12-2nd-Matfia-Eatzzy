<script setup>
import { ref } from 'vue';
import { useStoresStore } from '../../../stores/useStoresStore';

const storesStore = useStoresStore();

const setOrder = (newOrder) => {
  storesStore.sort = newOrder;
};
</script>

<template>
  <div class="order_box">
    <ul class="orderby">
      <li
        class="orderby_list"
        :class="{ picked: storesStore.sort === 'HOT' }"
        @click="setOrder('HOT')"
      >
        좋아요순
      </li>
      <li
        class="orderby_list"
        :class="{ picked: storesStore.sort === 'STAR' }"
        @click="setOrder('STAR')"
      >
        평점순
      </li>
      <li
        class="orderby_list"
        :class="{ picked: storesStore.sort === 'REVIEW' }"
        @click="setOrder('REVIEW')"
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
