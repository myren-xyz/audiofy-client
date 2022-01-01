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
var au = new Audio();
var hls = new Hls();
au.preload = "metadata";
store.state.el = au;

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

                let stream = newUrl

                this.$store.commit('pushToHistory', this.$store.state.song)

                if(Hls.isSupported()){
                    hls.destroy();
                    hls = new Hls();
                    hls.detachMedia(au)
                    hls.loadSource(stream)
                    hls.attachMedia(au)
                    hls.on(Hls.Events.MANIFEST_PARSED,function() {
                        au.play();
                    });
                }else if(au.canPlayType('application/x-mpegURL') || au.canPlayType('application/vnd.apple.mpegurl')){
                    au.pause();
                    au.src = stream;
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

            if(mutation.type == 'setSongWithoutPlay') {
                if (this.$store.state.liked_songs) {
                    let isLiked = this.$store.state.liked_songs.some(song => song === this.$store.state.song._id)
                    this.$store.commit('setLiked', isLiked)
                }

                let url = this.$store.state.song.track_url
                // change file name to outputlist.m3u8
                let fileName = url.split('/').pop()
                let newUrl = url.replace(fileName, 'outputlist.m3u8')

                let stream = newUrl

                this.$store.commit('pushToHistory', this.$store.state.song)

                if(Hls.isSupported()){
                    hls.destroy();
                    hls = new Hls();
                    hls.detachMedia(au)
                    hls.loadSource(stream)
                    hls.attachMedia(au)
                    hls.on(Hls.Events.MANIFEST_PARSED,function() {
                        console.log('Parsed, ready to play');
                    });
                }else if(au.canPlayType('application/x-mpegURL') || au.canPlayType('application/vnd.apple.mpegurl')){
                    au.pause();
                    au.src = stream;
                }
            }
        })
    },
}

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