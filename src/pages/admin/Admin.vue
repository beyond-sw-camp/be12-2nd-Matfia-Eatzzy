<script setup>
  import AdminHeader from "./components/AdminHeader.vue";
  import AdminLeft from "./components/AdminLeft.vue";
</script>

<template>
  <div class="page_admin">
    <AdminLeft />
    <div class="admin_body_layout">
      <AdminHeader />
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped></style>
