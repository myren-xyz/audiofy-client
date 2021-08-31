<template>
    <div class="song-wrapper">
        <div class="song" id="song-pic" :data-pic="song.avatar_url">
            <span @click="play(song)">
                <ion-icon v-if="!this.isPlaying" name="play-circle-outline"></ion-icon>
                <ion-icon v-if="this.isPlaying" name="pause-circle"></ion-icon>
            </span>
        </div>
        <h4>{{song.title}}</h4>
        <a href="#" class="songBy" v-for="artist in song.artists" :key="artist">{{artist}}</a>
    </div>
</template>
<script>
export default {
    props: ['song'],
    data(){
        return {
            isPlaying: false
        }
    },
    mounted(){
        let songPic = this.$el.querySelector('#song-pic');
        var bgOptions;
        if(songPic.getAttribute('data-pic') != null){
            bgOptions = `url('${songPic.getAttribute("data-pic")}')`
        }else{
            bgOptions = "linear-gradient(45deg, #2a2a2a, rgb(87, 87, 87))";
        }
        songPic.style.background = bgOptions;

        this.$store.subscribe((mutation)=>{
            if(mutation.type === 'setSong') {
                let currentSongId = this.$store.state.song._id
                if ((this.song._id == currentSongId)) {
                    this.isPlaying = true
                }else{
                    this.isPlaying = false
                }
            }else if(mutation.type == 'changePlayingState') {
                let currentSongId = this.$store.state.song._id
                if ((this.song._id == currentSongId)) {
                    this.isPlaying = this.$store.state.player.isPlaying
                }else if (!this.$store.state.player.isPlaying) {
                    this.isPlaying = false
                }
            }else if(mutation.type == 'setPlayingState'){
                let currentSongId = this.$store.state.song._id
                if ((this.song._id == currentSongId)) {
                    this.isPlaying = this.$store.state.player.isPlaying
                }else if (!this.$store.state.player.isPlaying) {
                    this.isPlaying = false
                }
            }
        })
    },

    created() {
        if (this.song._id == this.$store.state.song._id){
            if(this.$store.state.player.isPlaying){
                this.isPlaying = true
            }else{
                this.isPlaying = false
            }
        }
    },
    methods: {
        play: function(song){
            var currentSong = this.$store.state.song
            if (song._id == currentSong._id) {
                this.$store.commit('changePlayingState')
            }else{
                this.$store.commit('setSong', song);
            }
        }
    }
}
</script>
<style>
h4, .songBy{
    -moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;-o-user-select:none;
}
h4 {
    font-size: 12px;
    color: #ffffff;
    margin-top: 6px;
}
.song-wrapper{
    margin-right: 16px;
}
.song{
    display: flex;
    place-items: center;
    place-content: center;
    width: 116px;
    height: 116px;
    background-size: 116px !important;
    border-radius: 5px;
}
.songBy{
    font-size: 12px;
    color: #919191;
}
.song span{
    display: flex;
    place-content: center;
    place-items: center;
    widows: 58px;
    height: 58px;
}
.song span ion-icon{
    font-size: 58px;
}
@media screen and (min-width:728px){
  .song{
    width: 134px;
    height: 134px;
    background-size: 134px !important;
    border-radius: 5px;
}
}
</style>