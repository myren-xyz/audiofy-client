<template>
    <header>
        <ion-icon name=""></ion-icon>
        <h1>AUDIOFY</h1>
        <ion-icon name="notifications"></ion-icon>
    </header>
</template>
<style scoped>
    header{
        height: 48px;
        width: 100%;
        background-color: #1B1A18;
        z-index: 123;
        display: flex;
        padding: 39px 13px;
        place-items: center;
        justify-content: space-between;
        position: fixed;
    }
    header h1 {
        font-size: 11px;
        letter-spacing: 10px;
        text-align: center;
    }
    ion-icon{
        font-size: 22px;
        color: #c1c1c1;
    }
    img{
        height: 48px;
        padding-top: 8px;
    }
    @media screen and (min-width: 728px){
        header{
            display: none;
        }
    }
</style>