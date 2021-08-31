import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    player:{
      percentage: null,
      currentTime: 0,
      isPlaying: false,
      isRepeating: false,
    },
    songs:[
      
    ],
    song: {},
    profile: {
      user_firstname: 'Guest',
      user_lastname: 'User'
    },
    artists: [
      
    ],
    // should be fetched api/v1/getAlbums
    albums: [
      
    ],
  },
  mutations: {
    timeupdate(state, percentage) {
      state.player.percentage = percentage
    },
    setCurrentTime(state, currentTime) {
      state.player.currentTime = currentTime;
    },
    setSong (state, song) {
      state.song = song;
    },
    changeRepeatingState(state) {
      state.player.isRepeating = !state.player.isRepeating
      localStorage.setItem('isRepeating', state.player.isRepeating)
    },
    changePlayingState(state) {
      state.player.isPlaying = !state.player.isPlaying
    },
    setPlayingState(state, value) {
      state.player.isPlaying = value
    },

    getArtists(state) {
      let url = 'https://audiofy.myren.xyz/api/v1/getArtists'
      axios.get(url).then(response => {
        state.artists = JSON.parse(response.data.data)
      })
    },

    getPlayerState(state) {
      // read from local storage
      state.player.isRepeating = localStorage.getItem('isRepeating')
    },

    getSongs(state) {
      let url = 'https://audiofy.myren.xyz/api/v1/getSongs'
      axios.get(url).then(response => {
        state.songs = JSON.parse(response.data.data)
      })
    },

    setProfile(state){
      axios.get('https://accounts.myren.xyz/api/v1/getProfile', {withCredentials: true})
        .then(function (response) {
          if (response.data.ok){
            state.profile = response.data
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {

    });
    }
  }
})

export default store;