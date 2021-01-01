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
h4, .songBy{
    -moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;-o-user-select:none;
}
.song-wrapper{
    margin-right: 16px;
}
.song{
    display: flex;
    place-items: center;
    place-content: center;
    width: 160px;
    height: 160px;
    background-size: 160px !important;
}
.songBy{
    font-size: 13px;
    color: #c3c3c3;
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
</style>