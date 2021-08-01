<template>
    <header>
        <div></div>
        <div id="searchbox">
            <input id="box" type="text" placeholder="Search for songs, artists, etc" v-model="search"/>
            <button><ion-icon name="search-outline"></ion-icon></button>
        </div>
        <div class="flex">
            <div id="notification"><ion-icon name="notifications"></ion-icon></div>
            <div id="account"></div>
        </div>
    </header>
</template>
<script>
export default {
    data () {
        return {
            search: ''
        }
    },
}
</script>
<style scoped>
header {
    display: none;
}
@media screen and (min-width:728px){
    .flex {
        display: flex;
    }
    header {
        display: flex;
        transform: translateX(-200px);
        width: calc(100% + 200px);
        padding: 22px 40px;
        justify-content: space-between;
    }
    #searchbox {
        display: flex;
    }
    #box {
        border: none;
        outline: none;
        border-radius: 3px 0 0 3px;
        height: 38px;
        font-family: 'Mulish', sans-serif;
        font-size: 13px;
        background-color: #282828;
        padding: 0 16px;
        width: 25vw;
        min-width: 400px;
        max-width: 500px;
        color: #636060;
    }
    button {
        height: 38px;
        width: auto;
        border: none;
        outline: none;
        display: inline-flex;
        background-color: #282828;
        color: #636060;
        font-size: 22px;
        display: flex;
        place-content: center;
        place-items: center;
        padding: 0 16px;
        border-radius: 0 3px 3px 0;
    }
    #notification {
        width: 38px;
        height: 38px;
        font-size: 22px;
        color: #ffc857;
        display: flex;
        place-items: center;
        margin-right: 10px;
    }
    #account {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background-color: #C4C4C4;
    }
}
</style>