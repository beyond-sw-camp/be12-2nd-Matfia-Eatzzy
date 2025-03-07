<script setup>
import { defineProps, defineEmits } from "vue";
import { useAdminStore } from "../../../stores/useAdminStore";

const adminStore = useAdminStore();

const props = defineProps({
  category: {
    type: Object,
    required: true, // 필수로 전달되어야 하는 값
    default: () => ({ name: "", childrenCategoryList: [] }), // 기본값 설정
  },
  depth: {
    type: Number,
    default: 1,
  },
  parentName: {
    type: String,
    default: "",
  },
});


const updateCategoryName = async (categoryIdx, categoryName) => {
  const isConfirmed = confirm(`'${categoryName}'으로 카테고리명을 수정하시겠습니까?`);
  if (isConfirmed) {
    await adminStore.updateCategoryName(categoryIdx, categoryName);
    location.reload();
  }
};

const deleteCategory = async (categoryIdx) => {
  const isConfirmed = confirm("하위 카테고리까지 전부 삭제됩니다. 계속 하시겠습니까?");
  if (isConfirmed) {
    await adminStore.deleteCategory(categoryIdx);
    location.reload();
  }
};
</script>

<template>
  <div :class="`category_list depth-${depth}`">
    <div>
      <p class="idx">
        {{ parentName ? `${parentName} > ` : "" }}
        <input
          type="text"
          v-model="category.name"
          :placeholder="'카테고리 이름을 입력하세요'"
          :style="{ width: `${Math.max((category.name || '').length * 10, 100)}px` }"
        />
      </p>
      <button class="btn edit" @click="updateCategoryName(category.idx, category.name)">수정</button>
      <button class="btn del" @click="deleteCategory(category.idx)">삭제</button>
    </div>

    <div v-for="(child, childIdx) in category.childrenCategoryList || []" :key="child.idx">
      <CategoryItem
        :category="child"
        :depth="depth + 1"
        :parentName="parentName ? `${parentName} > ${category.name}` : category.name"
        @updateCategoryName="$emit('updateCategoryName', $event)"
        @deleteCategory="$emit('deleteCategory', $event)"
      />
    </div>
  </div>
</template>

<style scoped>
  .idx {
    padding-left: 20px;
    box-sizing: border-box;
    width: calc(100% - 160px);
  }

  .category_list {
    border-top: 1px solid #ccc;
    min-width: max-content;
    color: #666;
  }
  .category_list > div {
    display: flex;
    align-items: center;
    column-gap: 20px;
    min-width: max-content;
  }

  .category_list.depth-1 {
    padding: 10px 0;
  }
  .category_list div {
    width: 100%;
  }

  .category_list > div input[type='text'] {
    border: 0;
    text-decoration: underline;
    padding: 0;
    font-size: 15px;
    font-weight: bold;
    color: #000;
  }
  .category_list > div > button {
    min-width: 80px;
  }

  .category_child {
    border-top: 1px dotted #ddd;
    background-color: #f7f7f7;
  }
  .category_child p {
    display: flex;
    align-items: center;
  }
  .category_child p::before {
    content: "";
    width: 10px;
    height: 1px;
    margin-right: 10px;
    background-color: #666;
  }

  .category_list p,
  .category_list input,
  .category_list button {
    margin: 10px 0;
  }
</style>
