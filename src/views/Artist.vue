<template>
    <div class="artist">
        <div class="artist-cover"></div>
        <div class="artist-data-wrapper">
            <div style="background-image: url('https://musico.ir/wp-content/uploads/2019/08/%DB%8C%D8%B3.jpg')" id="artist-avatar"></div>
            <h4 class="artist-title">{{artist.title}}</h4>
            <div class="tracks-wrapper">
                <div class="slider">
                    <Song v-for="song in songs" :song="song" :key="song.id"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Song from '@/components/Song.vue'

export default {
    components: {
        Song
    },
    data: function(){
        return {
            artist: {
                username: this.$route.params.username,
                title: 'Mohammad Reza Shajarian'
            }
        }
    },
    computed: {
        songs(){
            return this.$store.state.songs.filter(song => song.artist_id == 9121010000)
        }
    }
}
</script>



<style scoped>
.artist-data-wrapper{
    padding: 0 16px;
}
.slider{
  width: 100%;
  display: flex;
  overflow-x: scroll;
  padding: 8px 0 16px 0;
  margin-bottom: 16px;
}
.artist-cover{
    height: 200px;
    width: 100%;
    background: linear-gradient(45deg, #5a418a, #3d3d3d);
}
.artist-data-wrapper{
    position: relative;
    top: -80px;
}
#artist-avatar{
    width: 160px;
    height: 160px;
    /* background: linear-gradient(45deg, #2a2a2a, #0d0d0d); */
    border-radius: 50%;
    position: relative;
    margin: 0 auto;
    background-size: 160px;
    border: 1px solid #eee;
}
.artist-title{
    padding-block-start: 16px;
    text-align: center;
}
@media screen and (min-width:728px){
.artist-data-wrapper{
  padding: 0 64px;
}
.slider::-webkit-scrollbar{
  background-color: rgb(12, 11, 11);
  height: 8px;
}
.slider::-webkit-scrollbar-button{
  display: none;
}
.slider::-webkit-scrollbar-track-piece{
  background-color: rgb(31, 29, 43);
}
.slider::-webkit-scrollbar-thumb{
  background-color: #707070;
  border-radius: 4px;
}
}
</style>