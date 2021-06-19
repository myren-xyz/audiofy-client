<template>
  <div class="home">
    <h2>New Songs</h2>
    <div class="slider">
        <Song v-for="song in songs" :song="song" :key="song.id"/>
    </div>

    <Divider/>

    <h2>Top Playlists</h2>
    <div class="slider">
        <Song v-for="song in songs" :song="song" :key="song.id"/>
    </div>
    
    <Divider/>

    <h2>Popular Artists</h2>
    <div class="slider">
      <div v-for="artist in artists" :key="artist.id">
        <router-link to="artist/mrshajarian">
        <Artist :artist="artist"/>
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import Song from '@/components/Song.vue'
import Artist from '@/components/Artist.vue'
import Divider from '@/components/Divider.vue'

export default {
  name: 'Home',
  
  components: {
    Song,
    Artist,
    Divider
  },
  computed: {
    songs: function(){
      return this.$store.state.songs
    },
    artists: function(){
      return this.$store.state.artists
    }
  },
  created(){
    this.$store.commit('setProfile');
  }
}
</script>
<style>
#banner{
  background: linear-gradient(45deg, #2a2a2a, rgb(108, 61, 114));
  padding: 24px;
  border-radius: 24px;
  margin-bottom: 32px;
}
.home{
  padding: 0 16px;
}
.home h2{
  padding-block-start: 16px;
  padding-block-end: 8px;
  font-size: 18px;
}
.slider{
  width: 100%;
  display: flex;
  overflow-x: scroll;
  padding: 8px 0 16px 0;
  margin-bottom: 16px;
}

@media screen and (min-width:728px){
.home{
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
