<template>
    <nav>
        <span><ion-icon name="home-outline"></ion-icon></span>
        <span><ion-icon name="search-outline"></ion-icon></span>
        <span><ion-icon name="wallet-outline"></ion-icon></span>
        <span><ion-icon name="layers-outline"></ion-icon></span>
        <span><ion-icon name="person-outline"></ion-icon></span>
    </nav>
</template>
<style scoped>
    nav{
        background-color: rgba(0, 0, 0, 0.2);
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
    }
    span{
        width: 48px;
        height: 48px;
        display: flex;
        place-content: center;
        place-items: center;
    }
</style>