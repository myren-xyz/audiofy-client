<template>
    <div class="song-wrapper">
        <div class="song" id="song-pic" :data-pic="song.picURL">
            <span @click="play(song)">
                <ion-icon name="play-circle-outline"></ion-icon>
            </span>
        </div>
        <h4>{{song.title}}</h4>
        <a href="#" class="songBy">{{song.by}}</a>
    </div>
</template>
<script>
export default {
    props: ['song'],
    mounted(){
        let songPic = this.$el.querySelector('#song-pic');
        var bgOptions;
        if(songPic.getAttribute('data-pic') != null){
            bgOptions = `url('${songPic.getAttribute("data-pic")}')`
        }else{
            bgOptions = "linear-gradient(45deg, #2a2a2a, rgb(87, 87, 87))";
        }
        songPic.style.background = bgOptions;
    },
    methods: {
        play: function(song){
            this.$store.commit('setSong', song);
            console.log(this.$store.state.song.hlsURL);
        }
    }
}
</script>
<style>
.song-wrapper{
    margin-right: 16px;
}
.song{
    display: flex;
    place-items: center;
    place-content: center;
    width: 120px;
    height: 120px;
    background-size: 120px !important;
}
.songBy{
    font-size: 13px;
    color: #c3c3c3;
}
.song span{
    display: flex;
    place-content: center;
    place-items: center;
    widows: 48px;
    height: 48px;
}
.song span ion-icon{
    font-size: 38px;
}
</style>