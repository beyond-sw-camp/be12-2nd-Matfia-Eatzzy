<script setup>
import { onMounted, ref } from "vue";
import { useAdminStore } from "../../../stores/useAdminStore";
import { useLoadingStore } from "../../../stores/useLoadingStore";
import CategoryItem from "../components/CategoryItem.vue";

const loadingStore = useLoadingStore();
const adminStore = useAdminStore();

const categoryList = ref([]);

onMounted(async () => {
  loadingStore.startLoading("categoryList");

  try {
    const response = await adminStore.getCategoryListAll();
    categoryList.value = response;
  } catch (error) {
    console.error("데이터를 가져오는 중 오류 발생:", error);
  } finally {
    setTimeout(() => {
      loadingStore.stopLoading();
    }, 500);
  }
});
</script>

<template>
  <h2 class="admin_title">카테고리 수정 삭제</h2>
  <div class="admin_contents">
    <small>밑줄 표시된 카테고리 이름 글자변경 후 '수정' 버튼을 클릭하면 카테고리 이름을 수정할 수 있습니다.</small>
    <div class="table_wrap">
      <CategoryItem
        v-for="(category, cateIdx) in categoryList"
        :key="category.idx"
        :category="category"
        :depth="1"
        :parentName="''"
      />
    </div>
  </div>
</template>

<style scoped>
  small {
    font-size: 12px;
    margin-bottom: 10px;
    display: block;
  }
  small::before {
    content: "* ";
    color: #fa2828;
  }
</style>
