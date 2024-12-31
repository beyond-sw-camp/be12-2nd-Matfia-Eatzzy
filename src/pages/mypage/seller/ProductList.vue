<script setup>
import { onMounted, ref } from "vue";
import { useProductsStore } from "../../../stores/useProductsStore";
import { useRouter } from "vue-router";

const productList = ref([]);

const router = useRouter();

const productsStore = useProductsStore();
const getSellerProduct = async () => {
  const result = await productsStore.getSellerProduct();
  productList.value = result.products;
};

const deleteProduct = (event) => {
  event.preventDefault();
  const result = confirm("상품을 삭제하시겠습니까?");
  console.log(result);
  if (result) {
    alert("상품이 삭제되었습니다.");
  }
};

onMounted(() => {
  getSellerProduct();
});
</script>
<template>
  <div class="product_container">
    <h1>내 상품 리스트</h1>
    <div class="line"></div>
    <div class="product_list">
      <div class="mypage_table">
        <table>
          <colgroup>
            <col style="width: 20%" />
            <col style="width: 7%" />
            <col style="width: 5%" />
            <col style="width: 7%" />
            <col style="width: 10%" />
          </colgroup>
          <thead>
            <tr>
              <th>상품명</th>
              <th>상품금액</th>
              <th>재고</th>
              <th>카테고리</th>
              <th>수정/삭제</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in productList">
              <td>
                <div class="product_info">
                  <img
                    src="https://godomall.speedycdn.net/ec5d2a1c8483712efb957784c858b320/goods/1000008350/image/list/1000008350_list_082.jpg"
                    alt="한우대창 순살곱도리탕 490g"
                    width="100"
                  />
                  <div class="product_name">
                    <router-link href="../goods/goods_view.php?goodsNo=1000008350">
                      {{ product.name }}
                    </router-link>
                  </div>
                </div>
              </td>
              <td>
                <strong>{{ product.price }}</strong
                ><em>원</em>
              </td>
              <td>
                <strong>{{ product.stock }}</strong
                ><em>개</em>
              </td>
              <td>
                <strong>{{ product.description }}</strong>
              </td>
              <td>
                <strong>{{ product.category }}</strong>
              </td>
              <td>
                <router-link to="/mypage/seller/modify" class="btn_edit"
                  >수정하기</router-link
                >
                <button @click="deleteProduct" class="btn_delete">
                  삭제하기
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product_container {
  width: 100%;
}

.product_container > h1 {
  font-size: 1.4rem;
  margin-bottom: 1rem;
}

.line {
  width: 100%;
  height: 0.125rem;
  background-color: #ccc;
}

.product_list {
  margin-top: 1rem;
}

.mypage_table {
  width: 100%;
}

.mypage_table th,
.mypage_table td {
  padding: 8px 12px;
  text-align: center;
  border: 2px solid #ddd;
}

.mypage_table th {
  background-color: #f7f7f7;
}

.mypage_table td {
  color: #777;
}

.mypage_table td a {
  color: #00a7b3;
  text-decoration: none;
}

.mypage_table td .btn_edit {
  background-color: #00a7b3;
  color: white;
  padding: 5.5px 15px;
  border-radius: 5px;
  font-size: 12px;
  margin-right: 5px;
  margin-top: 10px;
}

.mypage_table td .btn_delete {
  background-color: #00a7b3;
  color: white;
  padding: 2px 15px;
  border-radius: 5px;
  font-size: 12px;
  margin-right: 5px;
  margin-top: 10px;
}

.mypage_table td .btn_edit:hover,
.mypage_table td .btn_delete:hover {
  background-color: #007a8a;
}

.mypage_title h3 {
  color: #00a7b3;
  text-align: center;
  font-size: 2rem;
}

.product_info {
  display: flex;
  align-items: center;
}

.product_name em {
  font-weight: bold;
}
</style>
