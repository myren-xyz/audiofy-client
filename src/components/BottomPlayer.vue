<template>
<div v-show="song.title" class="bplayer" id="wrapper-player">
    <div id="audiofy-player">
        <div id="gesture">
            <div id="darbar" class="flex" @click="expand">
                <div id="playing--top-nav">
                    <div @click="share">
                        <ion-icon name="share-outline"></ion-icon>
                    </div>
                    <div>
                        <span :class="{typeActive: typeActive}">AUDIO</span>
                        <span :class="{typeActive: !typeActive}">VIDEO</span>
                    </div>
                    <div @click="showCtx = !showCtx" id="ctxWrapper">
                        <ion-icon name="ellipsis-horizontal"></ion-icon>
                        <div id="ctxMenu" v-show="showCtx">
                            <p @click="addToPlaylist">add to playlist</p>
                        </div>
                    </div>
                </div>

                <div class="avatar" id="song--avatar">
                    <img :src="song.avatar_url" id="insider">
                </div>
                <div class="center">
                    <h5 id="song-title">{{song.title}}</h5>
                    <p id="song-by" v-for="artist in song.artists" :key="artist">{{artist}}</p>
                </div>

                <div id="progressbar-wrapper" @click="seekto">
                    <div id="progressbar">
                        <div id="progressbar-now"></div>
                    </div>
                </div>

                <Control />

                <div id="bottom-actionbar">
                    <div @click="like(song._id)">
                        <ion-icon v-if="!this.player.isLiked" name="heart-outline"></ion-icon>
                        <ion-icon v-if="this.player.isLiked" name="heart"></ion-icon>
                    </div>
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
import axios from 'axios';
import {mapState} from 'vuex';
import Control from '@/components/BottomPlayer/Control.vue'
import eventBus from '@/plugins/eventBus'
export default {
    components: {
        Control
    },
    data: function() {
        return {
            typeActive: true,
            collapsed: true,
            showCtx: false
        }
    },
    methods:{
        share() {
            let songArtists = this.song.artists.join(', ')
            console.log(songArtists);
            navigator.share({
                title: 'Audiofy',
                text: `Listen to ${this.song.title} By ${songArtists} On Audiofy`,
                url: `https://audiofy.myren.xyz/play/${this.song._id}`
            })
        },

        addToPlaylist: function() {
            this.$store.commit('addSongIdToPlaylist', this.song._id);
        },

        like(id){
            if (!this.$store.state.profile.id) {this.$store.commit('setActionPopup', true); return}
            if(!this.player.isLiked){
                let url = `https://audiofy.myren.xyz/api/v1/likeSong?song_id=${id}`;
                axios.get(url, {withCredentials: true}).then(res => {
                    console.log(res.data);
                    this.$store.commit('setLiked', !this.player.isLiked);
                })
            }else{
                let url = `https://audiofy.myren.xyz/api/v1/unlikeSong?song_id=${id}`;
                axios.get(url, {withCredentials: true}).then(res => {
                    console.log(res.data);
                    this.$store.commit('setLiked', !this.player.isLiked);
                })
            }
        },
        seekto: function(e){
            let currentTime = e.offsetX/this.$el.querySelector('#progressbar-wrapper').clientWidth
            this.$store.commit('setCurrentTime', currentTime)
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
                let image = document.getElementById('insider')
                image.style.borderRadius = `5px`;
                wp.style = "z-index: 1000; bottom: 0; width: 100%; height: 100%;background-color:#1B1A18";
                
                avatar.style = "width: 80%; border-radius: 0px;"
                avatar.style.height = `${document.body.clientWidth * 0.8}px`;
                image.style.height = `${document.body.clientWidth * 0.8}px`;
                

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
            let image = document.getElementById('insider')
            image.style.borderRadius = `0px`;
            image.style.height = "";
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
    computed: {
        ...mapState(["song","player"]),
    },
    mounted() {
        let au = this.$store.state.el
        au.addEventListener('timeupdate', ()=>{
            this.$el.querySelector('#progressbar-now').style.width = `${(au.currentTime/au.duration)*100}%`;
        })
        eventBus.$on('expand', ()=>{
            setTimeout(()=>{
                this.expand()
            }, 1500)
        })
    },
}

</script>

<style>
#ctxWrapper {
    position: relative;
}
#ctxMenu {
    position: absolute;
    top: 100%;
    right: 0;
    width: 30vh;
    z-index: 1000;
    background-color: #282828;
    display: flex;
    justify-content: flex-start !important;
    padding: 18px;
    box-shadow: 0px 0px 10px 0px #000000;
}
#ctxMenu p {
    text-align: left;
    font-size: 16px;
}
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
    transition: 0.4s all ease-in-out;
    aspect-ratio: 1;
}
.avatar img {
    height: 100%;
    width: 100%;
    background-size: cover;
    transition: 0.4s all ease-in-out;
}
.bplayer{
    transition: 0.4s all ease-in-out;
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
    transition: 0.4s all ease-in-out;
}
#song-title{
    font-size: 14px;
    transition: 0.4s all ease-in-out;
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
    cursor: pointer;
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
    transition: 0.2s all ease-in-out;
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
    display: none;
}
}
</style>