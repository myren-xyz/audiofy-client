<template>
  <div class="library">
    <div class="library-inner">
      <h2>Listening History</h2>
      <Aslider>
          <Song v-for="song in listening_history" :song="song" :key="song._id"/>
      </Aslider>
      
      <h2 class="sec-title">Library</h2>

      <div class="item" @click="toLiked">
        <div class="icon">
          <ion-icon name="heart"></ion-icon>
        </div>
        <p>Liked Songs</p>
      </div>
      
      <div class="item" @click="toFollows">
        <div class="icon">
          <ion-icon name="people-circle"></ion-icon>
        </div>
        <p>Followed Artists</p>
      </div>

      <div class="item">
        <div class="icon">
          <ion-icon name="albums"></ion-icon>
        </div>
        <p>Liked Albums</p>
      </div>

      <h2 class="sec-title">Playlists</h2>

      <div class="item" @click="openPlaylistPU">
        <div class="icon">
          <ion-icon name="add"></ion-icon>
        </div>
        <p>Create Playlist</p>
      </div>

      <div class="item" v-for="pl in playlist" :key="pl._id" @click="goToPlaylist(pl._id)">
        <div class="icon">
          <ion-icon name="list"></ion-icon>
        </div>
        <p>{{ pl.playlist_name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Aslider from '@/components/others/Aslider.vue'
import Song from '@/components/Song.vue'
import { mapState } from 'vuex'
export default {
  name: 'Library',
  components: {
    Song,
    Aslider,
  },

  data() {
    return {
      playlist: [],
    }
  },

  created() {
    if (!this.$store.state.profile.id) return
    let url = `https://audiofy.myren.xyz/api/v1/getPlaylists`
      axios.get(url, {withCredentials: true}).then(res => {
          if (res.data.ok)
              this.playlist = res.data.data
              console.log(res.data.data);
      })
  },

  computed: mapState(['listening_history']),

  methods: {
    toLiked() {
      if (!this.$store.state.profile.id) {this.$store.commit('setActionPopup', true); return}
      this.$router.push('/me/liked')
    },
    toFollows() {
      if (!this.$store.state.profile.id) {this.$store.commit('setActionPopup', true); return}
      this.$router.push('/me/follows')
    },
    openPlaylistPU() {
      this.$store.commit('showPlaylistPopup', true)
    },
    goToPlaylist(id) {
      this.$router.push(`/me/playlist/${id}`)
    },
  }
}
</script>

<style scoped>
.library {
  padding: 16px 16px 158px 16px;
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
  cursor: pointer;
}
.sec-title {
  margin-top: 44px;
}
.item .icon {
  width: 58px;
  height: 58px;
  background-color: #2a2a2a;
  border-radius: 4px;
}
.item p {
  margin-left: 8px;
  font-size: 12px;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  color: #c1c1c1;
}
.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffc857;
  font-size: 1.5rem;
}
@media screen and (min-width:728px){
  .library {
    padding: 0;
    height: calc(100% - 82px);
    overflow-y: scroll;
  }
  .library-inner {
    padding-bottom: 158px;
  }
}
</style>
