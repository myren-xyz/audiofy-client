<template>
  <div class="home">
    <h2>New Songs</h2>
    <Aslider>
        <Song v-for="song in songs" :song="song" :key="song._id"/>
    </Aslider>

    <Divider/>

    <h2>Top Albums</h2>
    <div class="slider">
        <!-- <Song v-for="song in songs" :song="song" :key="song._id"/> -->
    </div>
    
    <Divider/>

    <h2>Popular Artists</h2>
    <Aslider>
      <div v-for="artist in artists" :key="artist._id">
        <router-link :to="`artist/`+artist.username">
        <Artist :artist="artist"/>
        </router-link>
      </div>
    </Aslider>

  </div>
</template>

<script>
import axios from 'axios'
import Song from '@/components/Song.vue'
import Artist from '@/components/Artist.vue'
import Divider from '@/components/Divider.vue'
import Aslider from '@/components/others/Aslider.vue'

export default {
  name: 'Home',
  
  components: {
    Song,
    Artist,
    Divider,
    Aslider
  },
  mounted() {
    if (this.$route.params.song_identifier) {
      let url = `https://audiofy.myren.xyz/api/v1/getSongById?id=${this.$route.params.song_identifier}`
      axios.get(url, {withCredentials: true}).then( res => {
          if (!res.data.ok) return
          let song = JSON.parse(res.data.data)
          let songArtists = song.artists.map(artist => artist).join(', ')
          window.document.title = `Listen to ${song.title} By ${songArtists} On Audiofy`
          this.$store.commit('setSong', song);
      })
    }
  },
  computed: {
    songs: function(){
      return this.$store.state.songs
    },
    artists: function(){
      return this.$store.state.artists
    }
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

@media screen and (min-width:728px){
  .home{
    padding: 0;
  }
}
</style>
