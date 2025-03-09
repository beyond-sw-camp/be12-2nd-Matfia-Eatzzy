<script setup>

</script>

<template>
    <div class="admin_header">
        <div class="admin_header_wrap">
            <div class="logo">Eatzzy</div>
            <ul>
                <router-link to="/admin/store/list">
                    <li>Store</li>
                </router-link>
                <router-link to="/admin/category/list">
                    <li>Category</li>
                </router-link>
            </ul>
            <a href="/">나가기</a>
        </div>
    </div>
</template>

<style scoped>
    .logo {
        display: block;
        background: url("/src/assets/icons/logo.png") no-repeat 0 0;
        background-size: contain;
        font-size: 0;
        width: 150px;
        height: 30px;
    }
    .admin_header_wrap {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        gap: 20px;
        position: relative;
    }

    .admin_header_wrap ul {
        display: flex;
        gap: 40px;
    }

    .admin_header_wrap ul li {
        font-size: 17px;
        font-weight: bold;
        color: #444;
        display: flex;
        align-items: center;
    }

    .admin_header_wrap ul li::before {
        content: "";
        width: 4px;
        height: 20px;
        background-image: linear-gradient(to right, #ddd 0%, #ddd 50%, #f5f5f5 50%, #f5f5f5 100%);
        margin-right: 20px;
    }

    .admin_header_wrap a {
        margin-left: auto;
    }
</style>