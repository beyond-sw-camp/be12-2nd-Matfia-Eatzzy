<script setup>
import { ref } from 'vue';
import { useProductsStore } from '../../../stores/useProductsStore';

const orderList = ref([]);

const productsStore = useProductsStore();
const getOrderProduct = async () => {
  const result = await productsStore.getOrderProduct();
  orderList.value = result.orders;
}

getOrderProduct();
</script>

<template>
  <div class="mypage_cont">
    <div class="mypage_order_list">
      <div class="mypage_zone_tit">
        <h3>주문 내역</h3>
      </div>
      <div class="mypage_table_type">
        <form id="frmOrder" name="frmOrder" method="post" target="ifrmProcess">
          <input type="hidden" name="mode" value="" />
          <input type="hidden" name="isCart" value="false" />
          <table>
            <colgroup>
              <col style="width: 10%" />
              <col style="width: 30%" />
              <col style="width: 10%" />
              <col style="width: 7%" />
              <col style="width: 10%" />
              <col style="width: 10%" />
              <col style="width: 17%" />
            </colgroup>
            <thead>
              <tr>
                <th>주문번호</th>
                <th>상품명</th>
                <th>상품금액</th>
                <th>수량</th>
                <th>결제상태</th>
                <th>결제수단</th>
                <th>주문상세내역</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="orders in orderList">
                <td>{{ orders.주문번호 }}</td>
                <td>
                  <div class="pick_add_cont">
                    <img
                      src="https://godomall.speedycdn.net/ec5d2a1c8483712efb957784c858b320/goods/1000008350/image/list/1000008350_list_082.jpg"
                      alt="한우대창 순살곱도리탕 490g"
                    />
                    <div class="pick_add_info">
                      <a href="../goods/goods_view.php?goodsNo=1000008350">
                        <em>{{ orders.name }}</em>
                      </a>
                    </div>
                  </div>
                </td>
                <td><strong>{{ orders.price }}</strong><em>원</em></td>
                <td><strong>{{ orders.quantity }}</strong><em>개</em></td>
                <td><strong>{{ orders.status }}</strong></td>
                <td><strong>{{ orders.payment }}</strong></td>
                <td>
                  <div class="btn_box">
                    <router-link to="/mypage/seller/order/:id" class="btn_details"><em>상세보기</em></router-link>
                  </div>
                </td>
              </tr>

      
            </tbody>
          </table>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
}

.mypage_cont {
  margin-top: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.mypage_order_list {
  width: 120%;
  max-width: 1200px;
  background-color: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.mypage_zone_tit h3 {
  font-size: 28px;
  margin-bottom: 30px;
  text-align: center;
  color: #00a7b3;
}

.mypage_table_type {
  width: 100%;
  border-collapse: collapse;
}

.mypage_table_type th,
.mypage_table_type td {
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
}

.mypage_table_type th {
  background-color: #f7f7f7;
  font-size: 16px;
}

.mypage_table_type td {
  font-size: 14px;
  color: #777;
}

.mypage_table_type td .btn_details {
  background-color: #00a7b3;
  color: white;
  padding: 4px 18px; 
  border-radius: 5px;
  font-size: 15px;
  text-decoration: none;
  display: inline-block;
  margin: 5px 0;
}

.mypage_table_type td .btn_details:hover {
  background-color: #007a85;
  transition: background-color 0.3s ease;
}

.mypage_table_type img {
  width: 100px;
  height: auto;
}

.mypage_table_type td .btn_box {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.mypage_table_type colgroup col:nth-child(7) {
  width: 40%;
}
</style>

