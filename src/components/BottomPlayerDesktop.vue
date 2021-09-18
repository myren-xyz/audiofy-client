<template>
    <div v-show="song.title" id="player-container">
        <div id="container">
            <div id="progressbar-container" @click="seekto">
                <div id="progressbar-ds"></div>
            </div>
            <div id="player-controls-container">
                <div class="flex">
                    <img class="avatar-now" :src="song.avatar_url" />
                    <div class="song-data">
                        <h3>{{song.title}}</h3>
                        <p v-for="artist in song.artists" :key="artist">{{artist}}</p>
                    </div>
                    <div class="like-wrapper" @click="like(song._id)">
                        <ion-icon v-if="!this.player.isLiked" name="heart-outline"></ion-icon>
                        <ion-icon v-if="this.player.isLiked" name="heart"></ion-icon>
                    </div>
                </div>
                <div><Control /></div>

                <div class="flex hide">
                    <img class="avatar-now" :src="song.avatar_url" />
                    <div class="song-data">
                        <h3>{{song.title}}</h3>
                        <p v-for="artist in song.artists" :key="artist">{{artist}}</p>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import {mapState} from 'vuex';
import Control from '@/components/BottomPlayer/Control.vue'

export default {
    components: {
        Control
    },
   
    data: function() {
        return {
            typeActive: true,
        }
    },
    methods:{
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
            let currentTime = e.offsetX/this.$el.querySelector('#progressbar-container').clientWidth
            this.$store.commit('setCurrentTime', currentTime)
        },

        changeRepeatState: function(){
            this.$store.commit('changeRepeatState')
        },

        changePlayingState: function() {
            this.$store.commit('changePlayingState')
        },
    },
    computed: mapState(["song","player"]),
    mounted() {
        let au = this.$store.state.el
        au.addEventListener('timeupdate', ()=>{
            this.$el.querySelector('#progressbar-ds').style.width = `${(au.currentTime/au.duration)*100}%`;
        })
    }
}
</script>
<style>
    #player-container {
        display: none;
    }
    .hide {
        opacity: 0;
    }
    @media screen and (min-width: 728px) {
        #player-container {
            position: relative;
            z-index: 56;
            display: block;
        }
        #container {
            position: fixed;
            left: 0;
            bottom: 0;
            height: 92px;
            width: 100%;
            background-color: #282828;
        }
        #progressbar-container {
            cursor: pointer;
            height: 5px;
            width: 100%;
            background: #282828;
        }
        #progressbar-ds {
            width: 0;
            height: 100%;
            background-color: #ffc857;
            transition: 0.2s all ease-in-out;
        }
        #player-controls-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: calc(100% - 5px);
            padding: 0 30px;
        }
        .avatar-now {
            width: 60px;
            height: 60px;
            border-radius: 5px;
        }
        .song-data {
            margin-left: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .song-data h3 {
            font-size: 14px;
            font-weight: 600;
        }
        .song-data p {
            font-size: 12px;
            font-weight: 300;
            color: #969696;
        }
        .like-wrapper {
            width: 46px;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 10px;
        }
        .like-wrapper ion-icon {
            font-size: 20px;
        }
    }
</style>