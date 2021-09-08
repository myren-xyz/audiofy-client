<template>
  <div class="library">
    <h2>Listening History</h2>
    <!-- <div class="slider">
        <Song v-for="song in songs" :song="song" :key="song._id"/>
    </div> -->
    
    <h2 class="sec-title">Library</h2>
    <div class="item">
      <div class="icon"></div>
      <p>Liked Songs</p>
    </div>
    <div class="item">
      <div class="icon"></div>
      <p>Followed Artists</p>
    </div>
    <div class="item">
      <div class="icon"></div>
      <p>Liked Albums</p>
    </div>

    <h2 class="sec-title">Playlists</h2>
    <div class="item">
      <div class="icon"></div>
      <p>Liked Playlists</p>
    </div>
    <div class="item">
      <div class="icon"></div>
      <p>Create Playlist</p>
    </div>

  </div>
</template>
<style scoped>
.library {
  padding: 16px 16px 100px 16px;
}
.library h2 {
  margin-block-start: 16px;
  font-size: 18px;
  font-weight: 600;
}
.item {
  display: flex;
  align-items: center;
  margin: 8px 0;
}
.sec-title {
  margin-top: 44px;
}
.item .icon {
  width: 58px;
  height: 58px;
  background-color: #f2f2f2;
  border-radius: 4px;
}
.item p {
  margin-left: 8px;
  font-size: 12px;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
}
@media screen and (min-width:728px){
  .library {
    padding: 0;
  }
}
</style>

<script>
// import Song from '@/components/Song.vue'
export default {
  components: {
    // Song
  },
  computed: {
    songs: function(){
      return this.$store.state.songs
    },
  }
}
</script>
