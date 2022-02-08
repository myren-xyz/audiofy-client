<template>
    <div></div>
</template>

<script>
import {mapState} from 'vuex';
export default {
    computed: mapState(["song","player", "playlist"]),
    mounted() {
        if ('mediaSession' in navigator) {
            this.$store.subscribe((mutation)=>{
                if(mutation.type === 'setSong') {
                    let song = this.$store.state.song
                    console.log(song);
                    navigator.mediaSession.metadata = new window.MediaMetadata({
                        title: song.title,
                        artist: song.artists,
                        album: '',
                        artwork: [
                            { src: song.avatar_url, sizes: '640x640', type: 'image/png' },
                        ]
                    });
                }
                navigator.mediaSession.setActionHandler('play', () => {
                    this.$store.commit('setPlayingState', true)
                })
                navigator.mediaSession.setActionHandler('pause', () => {
                    this.$store.commit('setPlayingState', false)
                })
                navigator.mediaSession.setActionHandler('previoustrack', () => {
                    let currentSongId = this.$store.state.song._id;
                    // get indext of current song in store.state.songs
                    let currentSongIndex = this.playlist.findIndex(song => song._id === currentSongId);
                    // get next song
                    let prevSong = this.playlist[currentSongIndex - 1]
                    if(prevSong !== null && typeof prevSong !== undefined && prevSong !== undefined) {
                        this.$store.commit('setSong', prevSong)
                    }
                })
                navigator.mediaSession.setActionHandler('nexttrack', () => {
                    let currentSongId = this.$store.state.song._id;
                    // get index of current song in store.state.songs
                    let currentSongIndex = this.playlist.findIndex(song => song._id === currentSongId);
                    // get next song
                    let nextSong = this.playlist[currentSongIndex + 1]
                    console.log(nextSong);
                    if(nextSong !== null && typeof nextSong !== undefined && nextSong !== undefined) {
                        this.$store.commit('setSong', nextSong)
                    }
                })
            })// subscribe to store
        } // media session supported
    } // mounted
}
</script>