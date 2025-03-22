<script setup>
import { onMounted, ref, computed } from "vue";
import { useAdminStore } from "../../../stores/useAdminStore";
import { useLoadingStore } from "../../../stores/useLoadingStore";
import CategoryItem from "../components/CategoryItem.vue";

const loadingStore = useLoadingStore();
const adminStore = useAdminStore();

const categoryList = ref([]);
const allCategories = computed(() => getAllCategories(categoryList.value));
const categoryIdx = ref(null);
const categoryName = ref('');

// 모든 카테고리를 플랫하게 정리하는 함수
const getAllCategories = (categories, parentPath = "") => {
  return categories.flatMap((category) => {
    const currentPath = parentPath
      ? `${parentPath} > ${category.name}`
      : category.name;

    const currentCategory = { ...category, path: currentPath };
    const children =
      category.childrenCategoryList?.length > 0
        ? getAllCategories(category.childrenCategoryList, currentPath)
        : [];

    return [currentCategory, ...children];
  });
};

const createCategory = async () => {
  const isConfirmed = confirm(`'${categoryName.value}' 카테고리를 추가 하시겠습니까?`);
  if (isConfirmed) {
    try {
      const cateIdx = categoryIdx.value === null ? null : categoryIdx.value; // null 값 처리
      await adminStore.createCategory(cateIdx, categoryName.value);
      alert("카테고리가 추가 되었습니다.");
      location.reload();
    } catch (error) {
      alert(error.response?.data?.message || "카테고리 추가 중 오류가 발생했습니다.");
    }
  }
};


onMounted(async () => {
  loadingStore.startLoading("categoryList");

  try {
    const response = await adminStore.getCategoryListAll();
    categoryList.value = response.result;
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
  <h2 class="admin_title">카테고리 추가/수정/삭제</h2>
  <div class="admin_contents add_category">
    <strong>카테고리 추가</strong>
    <select v-model="categoryIdx">
      <option value="null" selected>최상단 root</option>
      <!-- 모든 카테고리 옵션 출력 -->
      <option
        v-for="(category, index) in allCategories"
        :key="`category-${index}`"
        :value="category.idx"
      >
        {{ category.path }}
      </option>
    </select>
    <input type="text" v-model="categoryName" value="" />
    <button class="btn edit big right_end" @click="createCategory()">추가</button>
  </div>
  <div class="admin_contents">
    <small>밑줄 표시된 카테고리 이름 글자변경 후 '수정' 버튼을 클릭하면 카테고리 이름을 수정할 수 있습니다.</small>
    <small>'삭제' 버튼을 클릭하면 해당 카테고리와 하위 카테고리까지 모두 삭제됩니다.</small>
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
    display: block;
  }
  small::before {
    content: "* ";
    color: #fa2828;
  }
  .add_category {
    display: flex;
    gap: 20px;
    align-items: center;
    flex-wrap: wrap;
  }
  .right_end {
    margin-left: auto;
  }

</style>
