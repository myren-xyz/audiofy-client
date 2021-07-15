<template>
<div v-show="song.title" class="bplayer" id="wrapper-player">
    <!-- <audio id="aud" ref="audio" controls></audio> -->
    <div id="audiofy-player">
        <div id="gesture">
            <div id="darbar" class="flex" @click="expand">
                <div class="avatar" id="song--avatar">
                    <img :src="song.picURL" >
                </div>
                <div class="center">
                    <h5 id="song-title">{{song.title}}</h5>
                    <p id="song-by">{{song.by}}</p>
                </div>
                <Control />
            </div>
            <div id="pp" @click="changePlayingState">
                <ion-icon v-if="!player.isPlaying" name="play"></ion-icon>
                <ion-icon v-if="player.isPlaying" name="pause"></ion-icon>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {mapState} from 'vuex';
import Hls from 'hls.js';
import Control from '@/components/BottomPlayer/Control.vue'

const au = new Audio();
au.preload = "metadata";
export default {
    components: {
        Control
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
                
                // au.play()
                this.$store.commit('changePlayingState')
            }

            if(mutation.type == 'changePlayingState') {
                if (this.player.isPlaying){
                    au.play()
                } else {
                    au.pause()
                }
            }
        })
        // au.addEventListener('timeupdate', ()=>{
        //     this.$el.querySelector('#len-inner').style.width = `${(au.currentTime/au.duration)*100}vw`;
        // })
        
    },
    methods:{
        seekto: function(e){
            au.currentTime = au.duration*e.layerX/this.$el.clientWidth
        },

        changeRepeatState: function(){
            this.$store.commit('changeRepeatState')
        },

        changePlayingState: function() {
            this.$store.commit('changePlayingState')
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
            document.getElementById('player--control--wrapper').style = "display:flex"
        }
    },
    computed: mapState(["song","player"])
}
import store from '../store/index'

au.addEventListener('ended', ()=>{
    let currentSongId = store.state.song.id +1;
    let nextSong = store.state.songs.filter(song => song.id == currentSongId);
    let repeat = store.state.player.repeat;
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
    transition: 0.6s all ease-in-out;
}
.avatar img {
    height: 100%;
    width: 100%;
}
.bplayer{
    transition: 0.6s all ease-in-out;
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
    transition: 0.6s all ease-in-out;
}
#song-title{
    font-size: 14px;
    transition: 0.6s all ease-in-out;
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
#player--control--wrapper {
    display: none;
    width: 86%;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    color: #c1c1c1
}
#player--control--wrapper div {
    min-width: 46px;
    min-height: 46px;
    display: flex;
    place-content: center;
    place-items: center;
}
.base-1 {
    font-size: 24px;
}
.base-2 {
    font-size: 30px;
}
.base-3 {
    font-size: 36px;
}
.active {
    color: #ffc857
}
@media screen and (min-width: 728px){
.bplayer{
    bottom: 0px;
}
}
</style>