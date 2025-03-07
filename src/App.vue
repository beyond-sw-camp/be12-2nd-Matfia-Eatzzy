<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import Header from "./pages/common/components/Header.vue";
import Footer from "./pages/common/components/Footer.vue";

const route = useRoute();
const layout = ref(true);

watch(
  () => route.path,
  (newPath) => {
    layout.value = !newPath.startsWith("/admin");
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <Header v-if="layout"></Header>
    <div class="container">
      <router-view></router-view>
    </div>
    <Footer v-if="layout"></Footer>
  </div>
</template>

<style scoped></style>
