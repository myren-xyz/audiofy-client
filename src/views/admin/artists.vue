<template>
    <div class="artists-list">
        <div class="su-topper">
            <input type="text" id="artist-searchbox" v-model="query" placeholder="search for username or name"/>
            <p class="su-create-artist" @click="createArtist">New Artist</p>
        </div>
        <singleArtist v-for="artist in artists" :key="artist._id" :artist="artist" />
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