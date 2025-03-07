<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useAdminStore } from "../../../stores/useAdminStore";
import { useLoadingStore } from "../../../stores/useLoadingStore";

const route = useRoute();
const loadingStore = useLoadingStore();
const adminStore = useAdminStore();

const storeDetail = ref({});

onMounted(async () => {
  loadingStore.startLoading("storeReview");
  const storeIdx = Number(route.params.id);
  const response = await adminStore.getStoreDetail(storeIdx);
  storeDetail.value = response.result;
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
                    <td>{{ storeDetail.categoryName }}</td>
                  </tr>
                  <tr>
                    <th>식당등록여부</th>
                    <td>{{ storeDetail.allowed }}</td>
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
    </div>
</template>

<style scoped>    
</style>