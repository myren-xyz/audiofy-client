import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    popups: {
      action: false,
      playlist: false,
      toBeAddedToPlaylist: null,
    },
    player:{
      percentage: null,
      currentTime: 0,
      isPlaying: false,
      isRepeating: null,
    },
    songs:[],
    playlist:[],
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
    searchResult: {},
    listening_history: [],
  },

  mutations: {
    addSongIdToPlaylist (state, songId) {
      state.popups.toBeAddedToPlaylist = songId
    },
    removeSongIdToPlaylist (state) {
      state.popups.toBeAddedToPlaylist = null
    },

    showPlaylistPopup (state, payload){
      state.popups.playlist = payload
    },
    addToPlaylist (state, songs) {
      state.playlist = [
        ...songs
      ]
    },

    pushToHistory(state, payload) {
      state.listening_history.push(payload)
    },

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
        state.songs = [...JSON.parse(response.data.data)]
        state.playlist = [...state.songs]
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
    },

    shufflePlaylist(state) {
      let obj = state.playlist
      let currentIndex = obj.length,  randomIndex;

      // While there remain elements to shuffle...
      while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [obj[currentIndex], obj[randomIndex]] = [
          obj[randomIndex], obj[currentIndex]];
      }
    }
  }
})

export default store;