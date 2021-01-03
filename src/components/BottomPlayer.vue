<template>
<div v-show="song.title" class="bplayer">
    <!-- <audio id="aud" ref="audio" controls></audio> -->
    <div id="audiofy-player">
        <div id="len" @click="seekto($event)"><div id="len-inner"></div></div>
        <div id="gesture"  @touchmove="touchmove($event)" @touchstart="touchstart($event)" @touchend="touchend($event)">
            <h5 id="song-title">{{song.title}}</h5>
            <p id="song-by">{{song.by}}</p>
        </div>
    </div>
</div>
</template>
<script>
import {mapState} from 'vuex';
import Hls from 'hls.js';
const au = new Audio();
au.preload = "metadata";
export default {
    data: function(){
        return {
            result: [],
            delay: 700,
            clicks: 0,
            timer: null,
            isPlaying: false,

            dist: null,
            startX: null,
            startY: null,
            threshold: 150,
            allowedTime: 200,
            elapsedTime: null,
            startTime: null
        }
    },
    mounted() {
        // const audiofyPlayer = this.$el.querySelector('#gesture');

        this.$store.subscribe((mutation)=>{
            if(mutation.type === 'setSong') {
                var hls = new Hls();
                var stream = this.$store.state.song.hlsURL;
                var audio = au;

                if(Hls.isSupported()){
                    hls.loadSource(stream);
                    hls.attachMedia(audio);
                }else if(audio.canPlayType('application/x-mpegURL') || audio.canPlayType('application/vnd.apple.mpegurl')){
                    audio.src = stream;
                }
                
                au.play()
                this.isPlaying = true;
            }
        })
        au.addEventListener('timeupdate', ()=>{
            this.$el.querySelector('#len-inner').style.width = `${(au.currentTime/au.duration)*100}vw`;
        })
        
    },
    methods:{
        touchstart: function(e){
            var touchobj = e.changedTouches[0]
            this.dist = 0
            this.startX = touchobj.pageX
            this.startY = touchobj.pageY
            this.startTime = new Date().getTime()
            e.preventDefault()
        },
        touchmove: function(e){
            e.preventDefault()
        },
        touchend: function(e){

            var touchobj = e.changedTouches[0]
            this.dist = touchobj.pageX - this.startX
            this.elapsedTime = new Date().getTime() - this.startTime

            // var swiperightBol = (this.elapsedTime <= this.allowedTime && this.dist >= this.threshold && Math.abs(touchobj.pageY - this.startY) <= 100)
            if(this.elapsedTime >= 150) {
                if (this.dist > 0){
                    console.log('prev track');
                    au.play;
                    let currentSongId = this.$store.state.song.id || null;
                    let prevSong = this.$store.state.songs.filter(song => song.id == (currentSongId-1));
                    if(prevSong[0] != null){
                        this.$store.commit('setSong', prevSong[0])
                        // console.log(prevSong[0]);
                        this.isPlaying = true;
                    }
                }else{
                    console.log('next track');
                    au.play;
                    let currentSongId = this.$store.state.song.id || null;
                    let nextSong = this.$store.state.songs.filter(song => song.id == (1+currentSongId));
                    if(nextSong[0] != null){
                        this.$store.commit('setSong', nextSong[0])
                        this.isPlaying = true;
                    }
                }
            }else{
                this.clicks++;
                if(this.clicks === 1) {
                    //one click
                    var self = this
                    this.timer = setTimeout(function() {
                    self.result.push(e.type);
                    self.clicks = 0
                    }, this.delay);
                    
                    if(this.isPlaying){
                        au.pause();
                        this.isPlaying = false;
                    }else{
                        au.play();
                        this.isPlaying = true;
                    }

                } else{
                    //dbl click
                    clearTimeout(this.timer);  
                    this.result.push('dblclick');
                    this.clicks = 0;
                    let area = (e.changedTouches[0].clientX > this.$el.clientWidth/2);
                    au.play();
                    this.isPlaying = true;
                    if (area){
                        au.currentTime = au.currentTime + 7;
                    }else{
                        au.currentTime = au.currentTime - 4;
                    }
                }
            }
            e.preventDefault()
        
        },//touch end
        seekto: function(e){
            au.currentTime = au.duration*e.layerX/this.$el.clientWidth
            // console.log(this.$el.clientWidth);
        }
    },
    computed: mapState(["song"])
}
import store from '../store/index'
au.addEventListener('ended', ()=>{
    let currentSongId = store.state.song.id +1;
    let nextSong = store.state.songs.filter(song => song.id == currentSongId);
    let repeat = store.state.opts.repeat;
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
.bplayer{
    position: fixed;
    width: 100%;
    height: 58px;
    bottom: 48px;
    background-color: rgb(42,41,54);
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
#len{
    width: 100vw;
    height: 10px;
    background-color: rgba(238, 238, 238, 0.15);
    z-index: 150;
}
#len-inner{
    width: 0vw;
    transition: all 0.3s;
    height: 10px;
    background-color: slateblue;
}
#pause {
    width: 48px;
    height: 48px;
}
#pause ion-icon{
    font-size: 25px;
}
#song-by{
    text-align: center;
    opacity: 0.6;
    font-size: 14px;
}
#song-title{
    text-align: center;
    padding-block-start: 5px;
}
#gesture{
    height: 48px;
    width: 100%
}

@media screen and (min-width: 728px){
.bplayer{
    bottom: 0px;
}
}
</style>