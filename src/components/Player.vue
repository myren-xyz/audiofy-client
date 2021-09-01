<template>
    <div class="p"></div>
</template>
<style scoped>
.p {
    display: none;
}
</style>
<script>
import Hls from 'hls.js';
import {mapState} from 'vuex';
import store from '../store/index'
const au = new Audio();
var hls = new Hls();
au.preload = "metadata";

export default {
    computed: mapState(["song","player"]),
    mounted() {
        this.$store.subscribe((mutation)=>{
            if(mutation.type === 'setSong') {
                if (this.$store.state.liked_songs) {
                    let isLiked = this.$store.state.liked_songs.some(song => song === this.$store.state.song._id)
                    this.$store.commit('setLiked', isLiked)
                }

                let url = this.$store.state.song.track_url
                // change file name to outputlist.m3u8
                let fileName = url.split('/').pop()
                let newUrl = url.replace(fileName, 'outputlist.m3u8')

                var stream = newUrl
                var audio = au;

                if(Hls.isSupported()){
                    hls.loadSource(stream);
                    hls.attachMedia(audio);
                }else if(audio.canPlayType('application/x-mpegURL') || audio.canPlayType('application/vnd.apple.mpegurl')){
                    audio.src = stream;
                }

                this.$store.commit('setPlayingState', true)
            }

            if(mutation.type == 'changePlayingState' || mutation.type == 'setPlayingState') {
                if (this.player.isPlaying){
                    au.play()
                } else {
                    au.pause()
                }
            }

            if(mutation.type == 'setCurrentTime') {
                au.currentTime = mutation.payload*au.duration
            }
        })
    },
}

au.addEventListener('timeupdate', ()=>{
    store.commit('timeupdate', `${(au.currentTime/au.duration)*100}%`)
})

au.addEventListener('ended', ()=>{
    
    let currentSongId = store.state.song._id;
    // get indext of current song in store.state.songs
    let currentSongIndex = store.state.songs.findIndex(song => song._id === currentSongId);
    // get next song
    let nextSong = store.state.songs[currentSongIndex + 1]
    let repeat = store.state.player.isRepeating;
    console.log(typeof repeat)
    if(!repeat) {
        if (typeof nextSong !== undefined) store.commit('setSong', nextSong)
    }else{
        store.commit('setSong', store.state.song)
    }
})
</script>