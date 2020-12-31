<template>
  <div class="home">
    <h2>Hot in Audiofy!</h2>
    <div class="slider">
      <div class="slider-inner">
        <Song v-for="song in songs" :song="song" :key="song.id"/>
      </div>
    </div>

    <h2>New Uploads</h2>
    <div class="slider">
      <div class="slider-inner">
        <Song v-for="song in songs" :song="song" :key="song.id"/>
      </div>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import Song from '@/components/Song.vue'

export default {
  name: 'Home',
  
  components: {
    // HelloWorld
    Song
  },
  computed: {
    songs: function(){
      return this.$store.state.songs
    }
  },
  created(){
    this.$store.commit('setProfile');
  }
}
</script>
<style>
.home{
  padding: 0 16px;
}
.home h2{
  padding-block-start: 16px;
  padding-block-end: 8px;
}
.slider{
  width: 100%;
  overflow-x: scroll;
}
.slider::-webkit-scrollbar {
  height: 0px;
}
.slider-inner{
  display: flex;
}
</style>
