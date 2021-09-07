<template>
    <div class="dash">
        <!-- <router-link to="/admin/access"> 
            manage access
        </router-link> -->

        <router-link to="/admin/artists">
            manage artists
        </router-link>

        <router-link to="/admin/songs">
            manage songs
        </router-link>
    </div>
</template>
<style scoped>
.dash a {
    display: block;
    color: #eee;
    padding: 10px;
    text-decoration: none;
}
</style>