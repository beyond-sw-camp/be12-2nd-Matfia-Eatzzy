<script setup>
import { useStoresStore } from '../../../stores/useStoresStore';
import SellerStoreCard from './components/SellerStoreCard.vue'; 
import { onMounted } from 'vue';

const props = defineProps({
  store: {
    type: Object,
    required: true,
  },
});

const storesStore = useStoresStore(); 

onMounted(async () => {
  await storesStore.getSellerStoresList(); 
});
</script>

<template>
  <main>
    <section class="mystore_box">
      <div class="mystore_title_style">
        <label class="mystore_title">내 식당 목록</label>
      </div>

      <SellerStoreCard
        v-for="store in storesStore.stores"  
        :key="store.id"  
        :store="store"    
      />
    </section>
  </main>
</template>


<style scoped>
.mystore_box {
    width: 37.5rem;
    margin: 0 auto;
    text-align: left;
}

.content{
    width: 100%;
    margin: 1.875rem 0 0 0;
}

.mystore_title_style {
    margin: 2rem 0 1.875rem;
}

.mystore_title{
    font-size: 1.875rem;
    font-weight: 800;
}

  </style>