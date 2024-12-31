<script setup>
import ClientSummary from "../client/components/ClientSummary.vue";
import SellerMenu from "./components/SellerMenu.vue";
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <div class="main">
    <SellerMenu></SellerMenu>
    <div class="seller_container">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.main {
  padding: 0;
  display: flex;
}
.seller_container {
  width: 100%;
  padding: 3.125rem 4rem;
}
</style>
