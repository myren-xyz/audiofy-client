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
                var stream = this.$store.state.song.hlsURL;
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
    let currentSongId = store.state.song.id +1;
    let nextSong = store.state.songs.filter(song => song.id == currentSongId);
    let repeat = store.state.player.isRepeating;
    if(nextSong[0] != null && repeat == false){
        store.commit('setSong', nextSong[0])
    }
    if(nextSong[0] != null && repeat == true){
        au.currentTime = 0;
        au.play();
    }
})
</script>