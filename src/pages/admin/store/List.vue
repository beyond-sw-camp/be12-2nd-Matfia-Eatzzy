<script setup>
import { onMounted, ref } from "vue";
import { useAdminStore } from "../../../stores/useAdminStore";
import { useLoadingStore } from "../../../stores/useLoadingStore";

const loadingStore = useLoadingStore();
const adminStore = useAdminStore();

const storeList = ref([]);

onMounted(async () => {
  loadingStore.startLoading("storeList");
  
  try {
    const response = await adminStore.getStoreListAll();
    
    storeList.value = response.result.stores;
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
    <h2 class="admin_title">전체 식당 리스트</h2>
    <div class="admin_contents">
        <strong>All Stores {{ storeList.length }}</strong>
        <div class="table_wrap">
          <table>
              <thead>
                  <tr>
                      <td>No.</td>
                      <td>식당이름</td>
                      <td>위치</td>
                      <td>카테고리명</td>
                      <td></td>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="store in storeList">
                      <td>{{ store.idx }}</td>
                      <td>{{ store.name }}</td>
                      <td>{{ store.shortAddress }}</td>
                      <td>{{ store.categoryName }}</td>
                      <td><router-link :to="`/admin/store/${store.idx}`"><button class="btn edit">상세보기</button></router-link></td>
                  </tr>
              </tbody>
          </table>
        </div>
    </div>
</template>

<style scoped>    
</style>