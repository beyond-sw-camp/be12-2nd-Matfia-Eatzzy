<script setup>

</script>

<template>
    <div class="admin_left">
        <div class="logo"><router-link to="/">Eatzzy</router-link></div>
        <ul class="depth1">
            <li>
                <strong>Store</strong>
                <ul class="depth2">
                    <router-link to="/admin/store/list">
                        <li>전체 식당 리스트</li>
                    </router-link>
                </ul>
            </li> 
            <li>
                <strong>Category</strong>
                <ul class="depth2">
                    <router-link to="/admin/category/list">
                        <li>카테고리 수정/삭제</li>
                    </router-link>
                </ul>
            </li>       
      </ul>
    </div>
</template>

<style scoped>
    .logo {
        display: block;
        background: url("/src/assets/icons/logo.png") no-repeat 0 0;
        background-size: 65%;
        font-size: 0;
        height: 30px;
        background-position: center top;
        margin-top: 20px;
    }
</style>