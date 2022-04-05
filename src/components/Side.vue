<template>
    <div class="side">
        <div id="logo" @click="goToHomePage">
            <img src="../assets/logo.png" alt="logo" />
            <h1>AUDIOFY</h1>
        </div>

        <router-link to="/">
            <h3><ion-icon name="home"></ion-icon> Home</h3>
        </router-link>
        <router-link to="/search">
            <h3><ion-icon name="search-outline"></ion-icon> Search</h3>
        </router-link>
        <router-link to="/library">
            <h3><ion-icon name="musical-notes-outline"></ion-icon> My Library</h3>
        </router-link>
        <router-link to="/wallet">
            <h3><ion-icon name="wallet-outline"></ion-icon> wallet</h3>
        </router-link>
        <router-link to="/profile">
            <h3><ion-icon name="person-outline"></ion-icon> Profile</h3>
        </router-link>
    </div>
</template>

<script>
export default {
    methods: {
        goToHomePage() {
            this.$router.push('/')
        },
    },    
}
</script>

<style scoped>
.side{
    display: none;
}

@media screen and (min-width: 728px){
    #logo {
        width: 100%;
        padding: 55px 0 55px 0;
        cursor: pointer;
    }
    #logo img {
        display: block;
        margin: 0 auto;
        background: no-repeat center;
    }
    #logo h1 {
        text-align: center;
        font-weight: 100;
        letter-spacing: 14px;
        font-size: 14px;
        color: #eeeeee;
        margin-top: 16px;
    }
    .side{
        display: block !important;
        width: 200px;
        height: 100vh;
        background-color: #171715;
    }
    .side h3{
        margin-bottom: 8px;
        height: 56px;
        display: flex;
        align-items: center;
        padding-left: 48px;
        border-left: 3px solid #ffc85700;
        font-size: 14px;
        font-weight: var(--weight-semibold);
    }
    .side h3:hover{
        background-color: #222;
    }
    a h3{
        transition: all 0.3s;
        color: #c1c1c1 !important;
    }
    .router-link-exact-active h3{
        border-left: 3px solid #ffc857;
        color: #fff !important;
        background-color: #222222;
    }
    ion-icon {
        font-size: 20px;
        margin-right: 16px;
    }
}
</style>