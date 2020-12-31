<template>
<div v-show="song.title" class="bplayer" @touchmove="touchmove($event)" @touchstart="touchstart($event)" @touchend="touchend($event)">
    <!-- <audio id="aud" ref="audio" controls></audio> -->
    <div id="audiofy-player">
        <div id="len"><div id="len-inner"></div></div>
        <h5 id="song-title">{{song.title}}</h5>
        <p id="song-by">{{song.by}}</p>
    </div>
</div>
</template>
<script>
import {mapState} from 'vuex';
import Hls from 'hls.js';
const au = new Audio();
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
        const audiofyPlayer = this.$el.querySelector('#audiofy-player');

        this.$store.subscribe((mutation)=>{
            if(mutation.type === 'setSong') {
                var hls = new Hls();
                var stream = this.$store.state.song.hlsURL;
                var audio = au;

                if(Hls.isSupported()){
                    hls.loadSource(stream);
                    hls.attachMedia(audio);
                }else if(audio.canPlayType('application/application/x-mpegURL')){
                    audio.src = stream;
                }
                
                // au.addEventListener('loadeddata',()=>{
                //     audiofyPlayer.textContent = getTimeCodeFromNum(au.duration)
                // })
                au.play()
                this.isPlaying = true;
            }
        })
        au.addEventListener('timeupdate', ()=>{
            audiofyPlayer.querySelector('#len-inner').style.width = `${(au.currentTime/au.duration)*100}vw`;
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
                        // console.log(nextSong[0]);
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
        
        }//touch end
    },
    computed: mapState(["song"])
}

// au.addEventListener('playing', e=>{
//     console.log(e);
// })
// setInterval(() => {
//     console.log(au.currentTime/au.duration * 100);
//     // console.log(au.duration);
// }, 1000);

// function getTimeCodeFromNum(num) {
//   let seconds = parseInt(num);
//   let minutes = parseInt(seconds / 60);
//   seconds -= minutes * 60;
//   const hours = parseInt(minutes / 60);
//   minutes -= hours * 60;

//   if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
//   return `${String(hours).padStart(2, 0)}:${minutes}:${String(
//     seconds % 60
//   ).padStart(2, 0)}`;
// }
</script>

<style>
.bplayer{
    position: fixed;
    width: 100%;
    height: 58px;
    bottom: 48px;
    background-color: rgba(255, 255, 255, 0.05);
    display: flex;
    /* align-items: center; */
}
.player{
    width: 100%;
}
.progress--bar{
    transition: all 0.3s ease-in-out;
}
.progress--played{
    background-color: #3aa7ff !important;
    transition: all 0.3s ease-in-out;
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
</style>