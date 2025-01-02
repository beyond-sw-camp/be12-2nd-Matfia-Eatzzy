<script setup>
import SellerMenu from "./components/SellerMenu.vue";
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
  border-left: 0.0625rem solid #cecece;
}
</style>
