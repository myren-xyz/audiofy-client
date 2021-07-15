<template>
<div v-show="song.title" class="bplayer" id="wrapper-player">
    <!-- <audio id="aud" ref="audio" controls></audio> -->
    <div id="audiofy-player">
        <div id="gesture">
            <div id="darbar" class="flex" @click="expand">
                <div id="playing--top-nav">
                    <div><ion-icon name="share-outline"></ion-icon></div>
                    <div>
                        <span :class="{typeActive: typeActive}">AUDIO</span>
                        <span :class="{typeActive: !typeActive}">VIDEO</span>
                    </div>
                    <div><ion-icon name="ellipsis-horizontal"></ion-icon></div>
                </div>

                <div class="avatar" id="song--avatar">
                    <img :src="song.picURL" >
                </div>
                <div class="center">
                    <h5 id="song-title">{{song.title}}</h5>
                    <p id="song-by">{{song.by}}</p>
                </div>

                <div id="progressbar-wrapper" @click="seekto">
                    <div id="progressbar">
                        <div id="progressbar-now"></div>
                    </div>
                </div>

                <Control />

                <div id="bottom-actionbar">
                    <div><ion-icon name="heart-outline"></ion-icon></div>
                    <div @click="collapse"><ion-icon name="chevron-down-outline"></ion-icon></div>
                </div>
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
import store from '../store/index'
import {mapState} from 'vuex';
import Hls from 'hls.js';
import Control from '@/components/BottomPlayer/Control.vue'

const au = new Audio();
var hls = new Hls();
au.preload = "metadata";
export default {
    components: {
        Control
    },
    data: function() {
        return {
            typeActive: true,
            collapsed: true
        }
    },
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
        })
    },
    methods:{
        seekto: function(e){
            au.currentTime = au.duration*e.offsetX/this.$el.querySelector('#progressbar-wrapper').clientWidth
        },

        changeRepeatState: function(){
            this.$store.commit('changeRepeatState')
        },

        changePlayingState: function() {
            this.$store.commit('changePlayingState')
        },

        expand: function() {
            if (this.collapsed){
                this.collapsed = false
                let wp = document.getElementById('wrapper-player')
                let avatar = document.getElementById('song--avatar')
                wp.style = "z-index: 1000; bottom: 0; width: 100%; height: 100%;background-color:#1B1A18";
                avatar.style = "width: 80%; height: auto; border-radius: 5px";
                document.getElementById('darbar').classList.add('col')
                document.getElementById('pp').style = "width: 0; height:0;"
                document.getElementById('song-title').style = "font-size: 24px;text-align:center"
                document.getElementById('song-by').style = "text-align:center"
                document.getElementById('player--control--wrapper').style = "display:flex"
                document.getElementById('playing--top-nav').style = "position:relative; display: flex; opacity:1"
                document.getElementById('progressbar-wrapper').style = "display: flex"
                document.getElementById('bottom-actionbar').style = "display: flex"
                document.getElementsByClassName("center")[0].style = "margin-top: 14px"
            }
        },

        collapse: function() {
            let wp = document.getElementById('wrapper-player')
            let avatar = document.getElementById('song--avatar')
            wp.style = ""
            avatar.style = ""
            this.$el.querySelector('#darbar').classList.remove('col')
            document.getElementById('pp').style = " ";
            document.getElementById('song-title').style = " "
            document.getElementById('song-by').style = " "
            document.getElementById('player--control--wrapper').style = " "
            document.getElementById('playing--top-nav').style = " "
            document.getElementById('progressbar-wrapper').style = " "
            document.getElementById('bottom-actionbar').style = ""
            document.getElementsByClassName("center")[0].style = " "
            setTimeout(()=>{
                this.collapsed = true
            },900)
        }
    },
    computed: mapState(["song","player"])
}

au.addEventListener('timeupdate', ()=>{
    document.getElementById('progressbar-now').style.width = `${(au.currentTime/au.duration)*100}%`;
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
    aspect-ratio: 1;
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
#playing--top-nav {
    display: none;
    opacity: 0;
    position: absolute;
    width: 94%;
    display: flex;
    place-content: space-between;
    align-items: center;
    min-height: 46px;
    margin: 10px 0;
}
#playing--top-nav div{
    min-height: 46px;
    min-width: 46px;
    display: flex;
    place-items: center;
    place-content: center;
    font-size: 30px;
}
#playing--top-nav div span{
    font-size: 10px;
    padding: 4px 8px;
    border-radius: 5px;
}
.typeActive {
    border: 1px solid #ffc857;
    color: #ffc857
}

#progressbar-wrapper {
    display: none;
    width: 84%;
    margin: 0px 0;
    padding: 23px 0;
    justify-content: center;
}
#progressbar {
    width: 100%;
    height: 5px;
    border-radius: 2.5px;
    background-color: #D8D8D8;
}
#progressbar-now {
    width: 0%;
    height: 5px;
    background-color: #ffc857;
    border-radius: 2.5px;
}
#bottom-actionbar {
    display: none;
    position: fixed;
    bottom: 18px;
    width: 94%;
    place-content: space-between;
}
#bottom-actionbar div {
    min-width: 46px;
    min-height: 46px;
    font-size: 30px;
    display: flex;
    place-content: center;
    place-items: center;
}
@media screen and (min-width: 728px){
.bplayer{
    bottom: 0px;
}
}
</style>