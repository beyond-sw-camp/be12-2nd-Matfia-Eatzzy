<script setup>
import ClientSummary from "../client/components/ClientSummary.vue";
import SellerMenu from "./components/SellerMenu.vue";
</script>

<template>
  <div class="main">
    <SellerMenu></SellerMenu>
    <div class="SellerContainer">
      <ClientSummary></ClientSummary>
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.main {
  padding: 0;
  display: flex;
}
.SellerContainer {
  width: 100%;
  padding: 3.125rem 3.125rem;
}
</style>
