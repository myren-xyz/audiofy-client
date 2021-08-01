<template>
    <div id="player-container">
        <div id="container">
            <div id="progressbar-container">
                <div id="progressbar-ds"></div>
            </div>
            <div id="player-controls-container">
                <div>avatar</div>
                <div><Control /></div>
                <div></div>
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
            let currentTime = e.offsetX/this.$el.querySelector('#progressbar-wrapper').clientWidth
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
        }
    }
</style>