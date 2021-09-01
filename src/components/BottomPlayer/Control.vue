<template>
    <div id="player--control--wrapper">
        <div class="base-1"><ion-icon name="shuffle"></ion-icon></div>
        <div class="base-2" @click="previous"><ion-icon name="play-skip-back"></ion-icon></div>
        <div class="base-3" @click="changePlayingState" :class="{active: player.isPlaying}">
            <ion-icon v-if="!player.isPlaying" name="play"></ion-icon>
            <ion-icon v-if="player.isPlaying" name="pause"></ion-icon>
        </div>
        <div class="base-2" @click="next"><ion-icon name="play-skip-forward"></ion-icon></div>
        <div class="base-1" @click="changeRepeatingState" :class="{active: player.isRepeating}"><ion-icon name="repeat"></ion-icon></div>
    </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
    computed: mapState(["song","player"]),

    methods: {
        changeRepeatingState() {
            this.$store.commit('changeRepeatingState')
        },

        changePlayingState() {
            this.$store.commit('changePlayingState')
        },

        next() {
           let currentSongId = this.$store.state.song._id;
            // get index of current song in store.state.songs
            let currentSongIndex = this.$store.state.songs.findIndex(song => song._id === currentSongId);
            // get next song
            let nextSong = this.$store.state.songs[currentSongIndex + 1]
            console.log(nextSong);
            if(nextSong !== null && nextSong !== undefined) {
                this.$store.commit('setSong', nextSong)
            }
        },

        previous() {
            let currentSongId = this.$store.state.song._id;
            // get indext of current song in store.state.songs
            let currentSongIndex = this.$store.state.songs.findIndex(song => song._id === currentSongId);
            // get next song
            let prevSong = this.$store.state.songs[currentSongIndex - 1]
            if(prevSong !== null && prevSong !== undefined) {
                this.$store.commit('setSong', prevSong)
            }
        }
    },
}
</script>

<style scoped>
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
@media screen and (min-width: 728px) {
    #player--control--wrapper {
        display: flex;
    }
}
</style>