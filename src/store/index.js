import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    popups: {
      action: false
    },
    player:{
      percentage: null,
      currentTime: 0,
      isPlaying: false,
      isRepeating: null,
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
    el: null,
    // should be fetched api/v1/getAlbums
    albums: [],
    liked_songs: [],
    searchResult: {}
  },
  mutations: {
    setSearchResult(state, payload){
      state.searchResult = payload
    },

    setCurrentTime(state, currentTime) {
      state.player = {
        ...state.player,
        currentTime: currentTime,
      }
    },
    setSong (state, song) {
      state.song = Object.assign({}, song)
    },
    changeRepeatingState(state) {
      state.player.isRepeating = !state.player.isRepeating
      localStorage.setItem('isRepeating', state.player.isRepeating)
    },
    changePlayingState(state) {
      state.player = {
        ...state.player,
        isPlaying: !state.player.isPlaying
      }
    },
    setPlayingState(state, value) {
      state.player = {
        ...state.player,
        isPlaying: value
      }
    },

    getArtists(state) {
      let url = 'https://audiofy.myren.xyz/api/v1/getArtists'
      axios.get(url).then(response => {
        state.artists = JSON.parse(response.data.data)
      })
    },

    getPlayerState(state) {
      let localval = localStorage.getItem('isRepeating')
      if (localval === 'true') {
        state.player.isRepeating = true
      } else {
        state.player.isRepeating = false
      }
    },

    getSongs(state) {
      let url = 'https://audiofy.myren.xyz/api/v1/getSongs'
      axios.get(url).then(response => {
        state.songs = JSON.parse(response.data.data)
      })
    },

    setActionPopup(state, value) {
      state.popups.action = value
    },

    setProfile(state){
      axios.get('https://accounts.myren.xyz/api/v1/getProfile', {withCredentials: true})
        .then(function (response) {
          if (response.data.ok){
            state.profile = response.data
            let url = `https://audiofy.myren.xyz/api/v1/getLikedSongs`;
            axios.get(url, {withCredentials: true}).then(res => {
                state.liked_songs = res.data.data.liked_songs
            })
          }
        }).catch(function (error) {console.log(error)})
    }, // end of set profile
    setLiked(state, val) {
      state.player = {
        ...state.player,
        isLiked: val
      }
    }
  }
})

export default store;