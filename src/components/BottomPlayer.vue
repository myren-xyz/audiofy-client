<template>
<div v-show="song.title" class="bplayer" id="wrapper-player">
    <!-- <audio id="aud" ref="audio" controls></audio> -->
    <div id="audiofy-player" @click="expand">
        <div id="gesture">
            <div id="darbar" class="flex">
                <div class="avatar" id="song--avatar">
                    <img :src="song.picURL" >
                </div>
                <div class="center">
                    <h5 id="song-title">{{song.title}}</h5>
                    <p id="song-by">{{song.by}}</p>
                </div>
            </div>
            <div id="pp" @click="pp">
                <ion-icon v-if="!this.isPlaying" name="play"></ion-icon>
                <ion-icon v-if="this.isPlaying" name="pause"></ion-icon>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import {mapState} from 'vuex';
import Hls from 'hls.js';
const au = new Audio();
au.preload = "metadata";
export default {
    data: function(){
        return {
            result: [],
            delay: 700,
            clicks: 0,
            timer: null,
            isPlaying: false,

            dist: null,
            startX: null,
            startY: null,
            threshold: 150,
            allowedTime: 200,
            elapsedTime: null,
            startTime: null
        }
    },
    mounted() {
        this.$store.subscribe((mutation)=>{
            if(mutation.type === 'setSong') {
                var hls = new Hls();
                var stream = this.$store.state.song.hlsURL;
                var audio = au;

                if(Hls.isSupported()){
                    hls.loadSource(stream);
                    hls.attachMedia(audio);
                }else if(audio.canPlayType('application/x-mpegURL') || audio.canPlayType('application/vnd.apple.mpegurl')){
                    audio.src = stream;
                }
                
                au.play()
                this.isPlaying = true;
            }
        })
        // au.addEventListener('timeupdate', ()=>{
        //     this.$el.querySelector('#len-inner').style.width = `${(au.currentTime/au.duration)*100}vw`;
        // })
        
    },
    methods:{
        seekto: function(e){
            au.currentTime = au.duration*e.layerX/this.$el.clientWidth
            // console.log(this.$el.clientWidth);
        },
        pp: function(){
            if (this.isPlaying){
                au.pause()
                this.isPlaying = false
            } else {
                au.play()
                this.isPlaying = true
            }
        },

        expand: function() {
            let wp = document.getElementById('wrapper-player')
            let avatar = document.getElementById('song--avatar')
            wp.style = "z-index: 1000; bottom: 0; width: 100%; height: 100%";
            avatar.style = "width: 80%; height: auto; border-radius: 5px";
            document.getElementById('darbar').classList.add('col')
            document.getElementById('pp').style = "width: 0; height:0;"
            document.getElementById('song-title').style = "font-size: 24px;text-align:center"
            document.getElementById('song-by').style = "text-align:center"
        }
    },
    computed: mapState(["song"])
}
import store from '../store/index'
au.addEventListener('ended', ()=>{
    let currentSongId = store.state.song.id +1;
    let nextSong = store.state.songs.filter(song => song.id == currentSongId);
    let repeat = store.state.opts.repeat;
    if(nextSong[0] != null && repeat == false){
        store.commit('setSong', nextSong[0])
    }
    if(nextSong[0] != null && repeat == true){
        au.currentTime = 0;
        au.play();
    }
    console.log(nextSong);
})

</script>

<style>
#darbar{
    width: 100%;
}
.col {
    flex-direction: column !important;
    place-items: center !important;
}
#audiofy-player {
    width: 100%;
}
.avatar {
    width: 54px;
    height: 54px;
    display: flex;
    place-content: center;
    place-items: center;
    transition: 1s all ease-in-out;
}
.avatar img {
    height: 100%;
    width: 100%;
}
.bplayer{
    transition: 1s all ease-in-out;
    position: fixed;
    width: 100%;
    height: 54px;
    bottom: 48px;
    background-color: #282828;
    display: flex;
    /* align-items: center; */
}
.player{
    width: 100%;
}
audio{
    display: block;
    width: 100%;
    border: none;
    outline: none;
    border-radius: 0;
}
#pause {
    width: 48px;
    height: 48px;
}
#pause ion-icon{
    font-size: 25px;
}
#song-by{
    color: #969696;
    font-size: 12px;
    transition: 1s all ease-in-out;
}
#song-title{
    font-size: 14px;
    transition: 1s all ease-in-out;
}
#gesture{
    height: 54px;
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.flex{
    display: flex;
    flex-direction: row;
}
.center {
    padding: 5px;
}
#pp {
    width: 54px;
    height: 54px;
    display: flex;
    place-items: center;
    place-content: center;
    font-size: 32px;
    color: #ffc857
}
@media screen and (min-width: 728px){
.bplayer{
    bottom: 0px;
}
}
</style>