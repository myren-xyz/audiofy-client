<template>
    <div class="song-list">
        <div class="ss-topper">
            <input type="text" id="song-searchbox" v-model="query" placeholder="search for song name"/>
            <p class="ss-create-artist" @click="createSong">New Song</p>
        </div>
        <singleSong v-for="song in songs" :key="song._id" :song="song" />
    </div>
</template>

<script>
import singleSong from '@/components/admin/song.vue'
import axios from 'axios';
export default {
    components: {
        singleSong
    },

    data() {
        return {
            query: '',
            songs: [],
        }
    },
    
    methods: {
        createSong() {
            this.$router.push('/admin/songs/upload')
        }
    },

    mounted() {
        var timer
        let searchbox = document.getElementById('song-searchbox');
        searchbox.addEventListener('keyup', () => {
            if (searchbox.value.length > 2) {
                if(timer){
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    let searchURL = `https://audiofy.myren.xyz/api/v1/search?query=${this.query}&songs=true`;
                    axios.get(searchURL).then(res => {
                        if (res.data.ok) pushSongs(this, res.data.data);
                    })
                }, 369);
            }
        })
    },
}

function pushSongs(vm, data) {
    vm.songs = data.Songs;
}
</script>

<style scoped>
.ss-topper {
    margin: 20px 0 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.ss-create-artist {
    color: #ffc857;
    cursor: pointer;
}
#song-searchbox {
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