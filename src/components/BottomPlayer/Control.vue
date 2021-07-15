<template>
    <div id="player--control--wrapper">
        <div class="base-1"><ion-icon name="shuffle"></ion-icon></div>
        <div class="base-2"><ion-icon name="play-skip-back"></ion-icon></div>
        <div class="base-3" @click="changePlayingState" :class="{active: player.isPlaying}">
            <ion-icon v-if="!player.isPlaying" name="play"></ion-icon>
            <ion-icon v-if="player.isPlaying" name="pause"></ion-icon>
        </div>
        <div class="base-2"><ion-icon name="play-skip-forward"></ion-icon></div>
        <div class="base-1" @click="changeRepeatingState" :class="{active: player.isRepeating}"><ion-icon name="repeat"></ion-icon></div>
    </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
    computed: mapState(["song","player"]),

    methods: {
        changeRepeatingState: function() {
            this.$store.commit('changeRepeatingState')
        },

        changePlayingState: function() {
            this.$store.commit('changePlayingState')
        }
    },
}
</script>

<style scoped>
.active {
    color: #ffc857
}
</style>