<template>
    <div class="ssong-wrapper">
        <div class="ssong" id="ssong-single" :data-pic="song.avatar_url" @click="play()">
            <span>
                <ion-icon v-if="!isPlaying" name="play-circle-outline"></ion-icon>
                <ion-icon v-if="isPlaying" name="pause-circle"></ion-icon>
            </span>
        </div>
        <div class="ssong-info">
            <h4>{{song.title}}</h4>
            <router-link class="ssongBy" v-for="artist in song.artists" :key="artist" :to="'/artist/'+artist">{{artist}}</router-link>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    props: ['sid'],
    data(){
        return {
            song: {},
            isPlaying: false
        }
    },
    mounted(){
        let url = `https://audiofy.myren.xyz/api/v1/getSongById?id=${this.sid}`
        axios.get(url, {withCredentials: true}).then( res => {
            if (!res.data.ok) return
            this.song = JSON.parse(res.data.data)
        }).then(()=>{
            if (this.song === {}) return
            this.setInterface()
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
        play: function(){
            var currentSong = this.$store.state.song
            if (this.song._id == currentSong._id) {
                this.$store.commit('changePlayingState')
            }else{
                this.$store.commit('setSong', this.song);
            }
        },

        setInterface() {
            let songPic = this.$el.querySelector('#ssong-single');
            var bgOptions;
            let dataPic = songPic.getAttribute('data-pic')
            if(dataPic != ""){
                bgOptions = `url('${dataPic}')`
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
        }
    }
}
</script>
<style scoped>
.ssong-info {
    margin-left: 10px;
    height: 63px;
    display: flex;
    flex-direction: column;
    place-content: center
}
h4, .ssongBy{
    -moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;-o-user-select:none;
}
h4 {
    font-size: 12px;
    color: #ffffff;
    margin-top: 6px;
}
.ssong-wrapper{
    margin-top: 20px;
    display: flex;
}
.ssong{
    display: flex;
    place-items: center;
    place-content: center;
    width: 63px;
    height: 63px;
    background-size: cover !important;
    border-radius: 5px;
}
.ssongBy{
    font-size: 12px;
    color: #919191;
}
.ssong span{
    display: flex;
    place-content: center;
    place-items: center;
    widows: 58px;
    height: 58px;
}
.ssong span ion-icon{
    font-size: 58px;
}
@media screen and (min-width:728px){
.ssong{
    width: 134px;
    height: 134px;
    background-size: cover !important;
    border-radius: 5px;
}
.ssong-wrapper{
    margin-right: 36px;
}

}
</style>