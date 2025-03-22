<script setup>
  import AdminHeader from "./components/AdminHeader.vue";
  import AdminLeft from "./components/AdminLeft.vue";
</script>

<template>
  <AdminHeader />
  <div class="admin_body_layout">
    <div class="admin_wrap">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
  .admin_body_layout {
    display: flex;
    flex-direction: column;
  }
  .admin_body_layout::before {
      content: "";
      background-image: linear-gradient(to right, #ffa200 0%, #ffa200 75%, #ffdd00 80%, #ffdd00 85%,  #6ac800 100%);
      width: 100%;
      height: 5px;
      margin-bottom: 40px;
  }
</style>
