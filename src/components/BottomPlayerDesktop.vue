<template>
    <div v-show="song.title" id="player-container">
        <div id="container">
            <div id="progressbar-container" @click="seekto">
                <div id="progressbar-ds"></div>
            </div>
            <div id="player-controls-container">
                <div class="flex">
                    <img class="avatar-now" :src="song.picURL" />
                    <div class="song-data">
                        <h3>{{song.title}}</h3>
                        <p>{{song.by}}</p>
                    </div>
                </div>
                <div><Control /></div>
                <div class="flex hide">
                    <img class="avatar-now" :src="song.picURL" />
                    <div class="song-data">
                        <h3>{{song.title}}</h3>
                        <p>{{song.by}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

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
        this.$store.subscribe((mutation)=>{
            if(mutation.type == 'timeupdate'){
                this.$el.querySelector('#progressbar-ds').style.width = mutation.payload;
            }
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
    }
</style>