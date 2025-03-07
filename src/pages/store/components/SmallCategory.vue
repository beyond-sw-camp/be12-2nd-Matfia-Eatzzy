<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { useCategoryStore } from "../../../stores/useCategoryStore";

const categoryStore = useCategoryStore();

const changeSmallCate = (cate) => {
  categoryStore.setSmallCate(cate);
};

const getSmallCategoryList = async () => {
  await categoryStore.getSmallCategory(categoryStore.bigCate.idx);
};

// Big Category가 변경될 때 처리
watch(
  () => categoryStore.bigCate,
  async () => {
    await getSmallCategoryList();
  }
);

onMounted(async () => {
  await getSmallCategoryList();
});
</script>

<template>
  <ul v-if="categoryStore.bigCate.idx !== 0" class="small_category_list">
    <li
      class="small_category"
      :class="{ picked: categoryStore.smallCate.idx === 0 }"
      @click="changeSmallCate({ idx: 0, name: '전체' })"
    >
      전체
    </li>
    <li
      v-for="cate in categoryStore.smallCategory"
      :key="cate.idx"
      class="small_category"
      :class="{ picked: categoryStore.smallCate.idx === cate.idx }"
      @click="changeSmallCate(cate)"
    >
      {{ cate.name }}
    </li>
  </ul>
</template>

<style scoped>
.small_category_list {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin-bottom: 2.5rem;
  border: 1px solid #c6c6c6;
}

.small_category {
  height: 2.5rem;
  line-height: 2.5rem;
  text-align: center;
  box-sizing: border-box;
  cursor: pointer;
  white-space: nowrap;
}

.small_category:active,
.small_category:hover {
  font-weight: 700;
}

.small_category.picked {
  font-weight: 700;
}
</style>
