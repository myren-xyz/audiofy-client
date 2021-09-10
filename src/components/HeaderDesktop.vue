<template>
    <header>
        <div></div>
        <div id="searchbox">
            <input id="box" type="text" placeholder="Search for songs, artists, etc" v-model="search"/>
            <button><ion-icon name="search-outline"></ion-icon></button>
        </div>
        <div class="flex">
            <div id="notification"><ion-icon name="notifications"></ion-icon></div>
            <div id="account">{{profile.user_firstname.charAt(0)}}</div>
        </div>
    </header>
</template>
<script>
import axios from 'axios';
import { mapState } from 'vuex';
export default {
    data () {
        return {
            search: '',
            letter: '',
        }
    },
    mounted () {
        var timer
        let searchbox = document.getElementById('box');
        searchbox.addEventListener('keyup', () => {
            // if user is not in /search page then redirect to /search page
            if (this.$route.path !== '/search') {
                this.$router.push('/search');
            }
            // if user is in /search page then search
            if (searchbox.value.length >= 1) {
                if (timer) clearTimeout(timer)
                
                timer = setTimeout(() => {
                    let searchURL = `https://audiofy.myren.xyz/api/v1/search?query=${this.search}&songs=true&artists=true`;
                    axios.get(searchURL).then(res => {
                        console.table(res.data.data);
                        if (res.data.ok) this.$store.commit('setSearchResult', res.data.data);
                    })
                }, 369);
            }
        })
    },

    computed: mapState(['profile'])
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
    #searchbox input:focus {
        color: #fff;
    }
    #box {
        transition: 0.3s color;
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
        color: #282828;
        font-family: 'Poppins', sans-serif;
        font-weight: 900;
        display: flex;
        place-items: center;
        place-content: center;
    }
}
</style>