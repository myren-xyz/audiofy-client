<template>
    <nav class="bottom-nav">
        <router-link to="/">
            <span><ion-icon name="home-outline"></ion-icon></span>
        </router-link>

        <router-link to="/search">
            <span><ion-icon name="search-outline"></ion-icon></span>
        </router-link>

        <router-link to="/wallet">
            <span><ion-icon name="wallet-outline"></ion-icon></span>
        </router-link>

        <router-link to="/library">
            <span><ion-icon name="layers-outline"></ion-icon></span>
        </router-link>

        <router-link to="/profile">
            <span><ion-icon name="person-outline"></ion-icon></span>
        </router-link>
    </nav>
</template>
<style scoped>
    nav{
        background-color: rgb(25,23,34);
        width: 100%;
        height: 48px;
        display: flex;
        justify-content: space-between;
        padding: 0 8px;
        position: fixed;
        bottom: 0;
        place-items: center;
    }
    ion-icon{
        font-size: 25px;
        color: rgb(95, 95, 95);
        transition: 0.3s;
    }
    span{
        width: 48px;
        height: 48px;
        display: flex;
        place-content: center;
        place-items: center;
    }

@media screen and (min-width: 728px){
.bottom-nav{
    display: none;
}
}
</style>