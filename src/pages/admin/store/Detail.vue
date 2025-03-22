<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref, computed } from "vue";
import { useAdminStore } from "../../../stores/useAdminStore";
import { useLoadingStore } from "../../../stores/useLoadingStore";

const route = useRoute();
const loadingStore = useLoadingStore();
const adminStore = useAdminStore();

const storeDetail = ref({});
const categoryList = ref([]);

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

const allCategories = computed(() => getAllCategories(categoryList.value));

const updateStoreStatus = async () => {
  const storeIdx = Number(route.params.id);
  const isConfirmed = confirm("수정하시겠습니까?");
  if (isConfirmed) {
    const { categoryIdx, allowed } = storeDetail.value;
    await adminStore.updateStoreStatus(storeIdx, categoryIdx, allowed);
    location.reload();
  }
};


onMounted(async () => {
  loadingStore.startLoading("storeReview");

  const storeIdx = Number(route.params.id);
  const response = await adminStore.getStoreDetail(storeIdx);
  storeDetail.value = response.result;

  console.log("## : "+storeDetail.categoryIdx)

  const cateRes = await adminStore.getCategoryListAll();
  categoryList.value = cateRes.result;

  loadingStore.endLoading("storeReview");
});
</script>

<template>
  <h2 class="admin_title">식당 상세 정보</h2>
  <div class="admin_contents">
    <div class="table_wrap">
      <table>
        <colgroup>
          <col width="200px" />
          <col width="*" />
        </colgroup>
        <tbody>
          <tr>
            <th>식당명</th>
            <td>{{ storeDetail.name }}</td>
          </tr>
          <tr>
            <th>식당소재지</th>
            <td>{{ storeDetail.shortAddress }}</td>
          </tr>
          <tr>
            <th>카테고리</th>
            <td>
              <select v-model="storeDetail.categoryIdx">
                <!-- 모든 카테고리 옵션 출력 -->
                <option
                  v-for="(category, index) in allCategories"
                  :key="`category-${index}`"
                  :value="category.idx"
                >
                  {{ category.path }}
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <th>식당등록여부</th>
            <td>
              <select v-model="storeDetail.allowed">
                  <option value="YES" :selected="storeDetail.allowed === 'YES'">YES</option>
                  <option value="NO" :selected="storeDetail.allowed === 'NO'">NO</option>
                  <option value="WAITING" :selected="storeDetail.allowed === 'WAITING'">WAITING</option>
                </select>
            </td>
          </tr>
          <tr>
            <th>전화번호</th>
            <td>{{ storeDetail.callNumber }}</td>
          </tr>
          <tr>
            <th>상세내용</th>
            <td>{{ storeDetail.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="btn_area">
      <button @click="updateStoreStatus()" class="btn big edit">수정</button>
      <router-link to="/admin/store/list"><button class="btn big list">목록</button></router-link>
    </div>
  </div>
</template>

<style scoped>
</style>
