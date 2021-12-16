<template>
    <div class="aplaylist" @click="close">
        <div class="aplaylist-inner">

            <div class="pl-header">
                <p>Add To Playlist</p>
            </div>

            <div class="pl-body">
                <div v-if="creationState">
                    <p class="pl-pl-title">Name</p>
                    <form autocomplete="off">
                        <input type="text" id="pl-pl-input" v-model="playlistName" autocomplete="nope"/>
                    </form>
                </div>

                <div v-if="playlist.length == 0">
                    <div class="icon">
                        <ion-icon name="duplicate"></ion-icon>
                    </div>
                    <p class="std-p">Make Your First Playlist</p>
                </div>

                <div v-if="playlist.length != 0 && !creationState">
                    <div class="pl-list">
                        <div v-for="(item, index) in playlist" :key="index">
                            <div class="pl-item" @click="addToPlaylist(item._id)">
                                <div class="pl-item-info">
                                    <span class="pl-item-icon"><ion-icon name="copy"></ion-icon></span>
                                    <p class="pl-item-title">{{item.playlist_name}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="pl-footer">
                <button v-if="creationState" @click="createPlaylist">Create Playlist</button>
                <p class="pl-cta" v-else @click="creationState = true">
                    <span><ion-icon name="duplicate"></ion-icon></span>
                    Create A New Playlist
                </p>
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            creationState: false,
            playlist: [],
            playlistName: '',
        }
    },
    created() {
        let url = `https://audiofy.myren.xyz/api/v1/getPlaylists`
        axios.get(url, {withCredentials: true}).then(res => {
            if (res.data.ok) {
                this.playlist = res.data.data
                console.log(this.playlist);
            }
        })
    },

    mounted() {
        this.$store.subscribe((mutation) => {
            if (mutation.type == 'showPlaylistPopup' || mutation.type == 'addSongIdToPlaylist') this.open()
        })
    },

    methods: {
        close(e) {
            if (e.target.classList.contains('aplaylist'))
                this.$el.style.display = 'none'
        },

        open() {
            this.$el.style.display = 'block'
        },

        addToPlaylist(id) {
            let playlistID = id
            let songID = this.$store.state.popups.toBeAddedToPlaylist
            
            let url = `https://audiofy.myren.xyz/api/v1/addToPlaylist?song_id=${songID}&playlist_id=${playlistID}`
            axios.get(url, {withCredentials: true}).then(res => {
                if (res.data.ok) {
                    // reload page
                    location.reload();
                }
            })
        },

        createPlaylist() {
            let url = `https://audiofy.myren.xyz/api/v1/createPlaylist?playlist_name=${this.playlistName}`
            axios.get(url, {withCredentials: true}).then(res => {
                if (res.data.ok) {
                    // reload page
                    location.reload();
                }
            })
        }
    }
}
</script>

<style scoped>
    .pl-pl-title {
        color: #ffc857;
        margin-bottom: 8px;
    }
    #pl-pl-input {
        width: 100%;
        height: 40px;
        border-radius: 5px;
        padding: 0 10px;
        font-size: 14px;
        color: #f2f2f2;
        background-color: #282828;
        border: none;
        outline: none;
    }
    .icon {
        display: flex;
        width: 100%;
        place-content: center;
        font-size: 60px;
        color: #ffc857;
        padding-top: 10px;
    }
    .std-p {
        margin-top: 8px;
        text-align: center;
        font-size: 12px;
    }
    .aplaylist {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(47, 47, 47, 0.65);
        z-index: 9999;
        display: none;
    }
    .aplaylist-inner {
        position: absolute;
        top: calc(50% - 143px);
        left: calc(50% - 123px);
        width: 246px;
        height: 306px;
        background-color: #171715;
        border-radius: 10px;
    }
    .pl-header {
        position: relative;
        padding: 30px 0;
    }
    .pl-header p {
        font-size: 14px;
        color: #f2f2f2;
        font-weight: 500;
        text-align: center;
    }
    .pl-body {
        position: relative;
        width: 100%;
        height: calc(100% - 153px);
        overflow-y: auto;
        padding: 20px;
    }
    .pl-body::-webkit-scrollbar {
        background-color: #1b1a18;
        width: 8px;
    }
    .pl-body::-webkit-scrollbar-thumb {
        background-color: rgb(46,46,46);
        border-radius: 5px;
    }
    .pl-body::-webkit-scrollbar-button {
        display: none;
    }
    .pl-body::-webkit-scrollbar-track-piece {
        border-radius: 4px;
    }
    .pl-footer {
        position: relative;
        width: 100%;
        padding: auto 0 30px 0;
    }
    .pl-footer button {
        display: block;
        width: calc(100% - 60px);
        margin: 0 auto;
        font-family: 'Poppins', sans-serif;
        background-color: #ffc857;
        font-size: 12px;
        font-weight: bold;
        color: #171715;

        border: none;
        outline: none;
        border-radius: 5px;
        height: 40px;
    }
    .pl-item-info {
        display: flex;
        place-items: center;
    }
    .pl-item-title {
        font-size: 16px;
        display: inline-block;
        margin-left: 10px;
    }
    .pl-item-icon {
        font-size: 30px;
        color: #ffc857;
    }
    .pl-cta {
        display: flex;
        place-items: center;
        place-content: center;
        color: #ffc857;
        font-size: 12px;
        font-weight: bold;
        text-align: center;
        margin-top: 30px;
    }
    .pl-cta span {
        font-size: 20px;
        margin-right: 6px;
        transform: translateY(2px);
    }
</style>