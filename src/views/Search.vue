<template>
    <div class="search">
        <div id="search-action">
            <input type="text" id="searchbox" placeholder="Search for Songs, Artists, etc" v-model="search">
            <div id="search-btn"><ion-icon name="search-outline"></ion-icon></div>
        </div>

        <Aslider v-if="searchResult">
            <Song v-for="song in this.searchResult.Songs" :song="song" :key="song._id"/>
        </Aslider>

        <Aslider v-if="searchResult">
            <div v-for="artist in searchResult.Artists" :key="artist._id">
                <router-link :to="`artist/`+artist.username">
                <Artist :artist="artist"/>
                </router-link>
            </div>
        </Aslider>

        <div class="item">
            <p>Set Genre</p>
            <div class="icon"><ion-icon name="chevron-forward"></ion-icon></div>
        </div>
        <div class="item">
            <p>Set Mood</p>
            <div class="icon"><ion-icon name="chevron-forward"></ion-icon></div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Song from '@/components/Song.vue'
import Aslider from '@/components/others/Aslider.vue'
import Artist from '@/components/Artist.vue'
import { mapState } from 'vuex'
export default {
    components: {
        Aslider,
        Song,
        Artist
    },

    data() {
        return {
            search: '',
        }
    },

    computed: mapState(['searchResult']),

    mounted() {
        var timer
        let searchbox = this.$el.querySelector('#searchbox');
        searchbox.addEventListener('keyup', () => {
            // if user is not in /search page then redirect to /search page
            if (this.$route.path !== '/search') this.$router.push('/search')
            
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
    }
}
</script>

<style scoped>
.search{
    padding: 12px 12px 100px 12px;
}
#search-action {
    display: flex;
    margin-bottom: 46px;
}
#searchbox {
    border: none;
    outline: none;
    font-size: 14px;
    padding: 10px;
    height: 48px;
    width: calc(100% - 48px);
    border-radius: 3px 0 0 3px;
    background-color: #F2F2F2;
    color: #2a2a2a;
}
#search-btn {
    width: 48px;
    height: 48px;
    display: flex;
    place-content: center;
    place-items: center;
    background-color: #F2F2F2;
    border-radius: 0 3px 3px 0;
    color: #6b6b6b;
}

.item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 48px;
}
.item .icon {
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 20px;
}
.item p {
    font-family: 'Poppins', sans-serif;
    font-weight: normal;
}
@media screen and (min-width: 728px){
  .search {
    padding: 0;
  }
  #search-action {
      display: none;
  }
}
</style>