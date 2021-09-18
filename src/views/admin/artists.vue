<template>
    <div class="artists-list">
        <div class="left-side">
            <div class="su-topper">
                <input type="text" id="artist-searchbox" v-model="query" placeholder="search for username or name"/>
                <p class="su-create-artist" @click="createArtist">New Artist</p>
            </div>
            <singleArtist v-for="artist in artists" :key="artist._id" :artist="artist" />
        </div>
    
        <div class="right-side">
            
        </div>
    </div>
</template>

<script>
import singleArtist from '@/components/admin/artist.vue'
import axios from 'axios';
export default {
    components: {
        singleArtist
    },

    data() {
        return {
            query: '',
            artists: [],
        }
    },
    
    methods: {
        createArtist() {
            this.$router.push('/admin/artists/create')
        }
    },

    mounted() {
        var timer
        let searchbox = document.getElementById('artist-searchbox');
        searchbox.addEventListener('keyup', () => {
            if (searchbox.value.length > 2) {
                if(timer){
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    let searchURL = `https://audiofy.myren.xyz/api/v1/search?query=${this.query}&artists=true`;
                    axios.get(searchURL).then(res => {
                        if (res.data.ok) pushArtists(this, res.data.data);
                    })
                }, 369);
            }
        })
    },
}

function pushArtists(vm, data) {
    vm.artists = data.Artists;
}
</script>

<style scoped>
.artists-list {
    display: flex;
}
.left-side {
    width: 66%;
    height: calc(100vh - 102px);
    border-right: 2px solid rgba(71,71,71,0.22);
    padding-right: 20px;
}
.right-side {
    width: 34%;
    padding-left: 20px;
}
.su-topper {
    margin: 20px 0 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.su-create-artist {
    color: #ffc857;
    cursor: pointer;
}
#artist-searchbox {
    display: block;
    width: 240px;
    height: 38px;
    padding: 10px;
    border-radius: 5px;
    border: none;
    outline: none;
    background-color: #282828;
    color: #fff;
}
</style>