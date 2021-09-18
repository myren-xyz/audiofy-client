<template>
    <div class="dash">
        <!-- <router-link to="/admin/access"> 
            manage access
        </router-link> -->

        <router-link to="/admin/artists">
            <div class="link-wrapper">
                <ion-icon name="cog-outline"></ion-icon>
                <p>manage artists </p>
            </div>
        </router-link>

        <router-link to="/admin/songs">
            <div class="link-wrapper">
                <ion-icon name="cog-outline"></ion-icon>
                <p>manage songs </p>
            </div>
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
.link-wrapper {
    display: flex;
    place-items: center;
    font-size: 18px;
}
.link-wrapper p {
    margin-left: 10px;
}
.link-wrapper ion-icon {
    color: #ffc857
}
</style>