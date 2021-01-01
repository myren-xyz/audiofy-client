<template>
    <header>
        <ion-icon name=""></ion-icon>
        <img src="@/assets/logo.svg"/>
        <ion-icon name=""></ion-icon>
    </header>
</template>
<style scoped>
    header{
        height: 48px;
        width: 100%;
        z-index: 123;
        background-color:  rgb(25,23,34);
        display: flex;
        padding: 0 8px;
        place-items: center;
        justify-content: space-between;
        position: fixed;
    }
    ion-icon{
        font-size: 25px;
    }
    img{
        height: 48px;
        padding-top: 8px;
    }
</style>