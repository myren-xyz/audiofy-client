<template>
    <nav class="bottom-nav">
        <router-link to="/">
            <span><ion-icon name="home"></ion-icon>
            <p class="sm-lbl">Home</p></span>
        </router-link>

        <router-link to="/search">
            <span><ion-icon name="search"></ion-icon>
            <p class="sm-lbl">Search</p></span>
        </router-link>

        <router-link to="/library">
            <span><ion-icon name="layers"></ion-icon>
            <p class="sm-lbl">Library</p></span>
        </router-link>

        <router-link to="/wallet">
            <span><ion-icon name="wallet"></ion-icon>
            <p class="sm-lbl">Wallet</p></span>
        </router-link>

        <router-link to="/profile">
            <span><ion-icon name="person"></ion-icon>
            <p class="sm-lbl">Account</p></span>
        </router-link>
    </nav>
</template>
<style scoped>
    a,router-link{
    text-decoration: none;
    }
    a, a:visited, router-link:visited{
    color: #c1c1c1;
    }
    .router-link-exact-active {
        color: #ffc857 !important;
    }
    .sm-lbl {
        font-size: 11px;
        margin-top: 3px;
        font-weight: 600;
        /* color: inherit */
    }
    nav{
        background-color: #171715;
        width: 100%;
        height: 54px;
        display: flex;
        justify-content: space-between;
        padding: 0 23px;
        position: fixed;
        bottom: 0;
        place-items: center;
    }
    ion-icon{
        font-size: 18px;
        color: #c1c1c1;
        transition: 0.3s;
    }
    span{
        /* width: 54px; */
        height: 54px;
        flex-direction: column;
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