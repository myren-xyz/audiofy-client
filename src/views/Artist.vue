<template>
    <div class="artist">
        <div class="artist-data-wrapper">
            <div id="artist-avatar">
                
            </div>

            <div class="artist-info">
                <p>Artist</p>
                <h4 class="artist-title">{{artist.nic}}</h4>
                <div class="bar">
                    <p><span>{{followersCount}}</span> followers</p>
                    <button @click="follow" :class="{active: !following}">
                        <span v-if="!following">FOLLOW</span>
                        <span v-else>FOLLOWING</span>
                    </button>
                </div>
            </div>

            <div class="mtop">
                <h3 class="header">Top Songs</h3>
                <div class="tracks-wrapper">
                    <Aslider>
                        <Song v-for="song in artist_songs" :song="song" :key="song.id"/>
                    </Aslider>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import Song from '@/components/Song.vue'
import Aslider from '@/components/others/Aslider.vue'
import {mapState} from 'vuex';
import axios from 'axios';

export default {
    components: {
        Song,
        Aslider
    },
    data() {
        return {
            username: this.$route.params.username,
            artist:  {},
            artist_songs: {},
            followersCount: null,
            following: false
        }
    },
    methods: {
        follow() {
            if (!this.$store.state.profile.id) {this.$store.commit('setActionPopup', true); return}
            if (this.following) {
                let unfollowURL = `https://audiofy.myren.xyz/api/v1/unfollow?user_id=${this.artist._id}`
                axios.get(unfollowURL, {withCredentials: true}).then(res => {
                    if (res.data.ok) {
                        this.following = false;
                        this.followersCount--;
                    }
                })
            } else {
                let followURL = `https://audiofy.myren.xyz/api/v1/follow?user_id=${this.artist._id}`
                axios.get(followURL, {withCredentials: true}).then(res => {
                    if (res.data.ok) {
                        this.following = true;
                        this.followersCount++;
                    }
                })
            }
        }// end of follow
    },
    computed: mapState(['songs', 'artists', 'playlist']),
    mounted() {
        let url = `https://audiofy.myren.xyz/api/v1/artistExists?username=${this.username}`
        axios.get(url, {withCredentials: true}).then(res => {
            if (res.data.ok) {
                console.table(JSON.parse(res.data.data.message));
                this.artist = JSON.parse(res.data.data.message);
                let avatar = this.$el.querySelector('#artist-avatar')
                avatar.style.backgroundImage = `url(${this.artist.avatar_url})`;
                avatar.style.height = avatar.clientWidth + 'px';
                document.title = `Audiofy | Artist ${this.artist.nic}`   
            }
        }).then(() => {
            let getFollowersUrl = `https://audiofy.myren.xyz/api/v1/getFollowers?user_id=${this.artist._id}`
            axios.get(getFollowersUrl, {withCredentials: true}).then(res => {
                if (res.data.ok) {
                    this.followersCount = res.data.data.count;
                }
            })
        }).then(() => {
            let getSongsUrl = `https://audiofy.myren.xyz/api/v1/getSongsByArtist?username=${this.username}`
            axios.get(getSongsUrl, {withCredentials: true}).then(res => {
                if (res.data.ok) {
                    this.artist_songs = JSON.parse(res.data.data)
                    // push songs to playlist
                    this.$store.commit('addToPlaylist', this.artist_songs)
                }
            })
        }).then(() => {
            if (!this.$store.state.profile.id) return
            let getFollowingUrl = `https://audiofy.myren.xyz/api/v1/getFollowings?user_id=${this.$store.state.profile.id}`
            axios.get(getFollowingUrl, {withCredentials: true}).then(res => {
                if (res.data.ok) {
                    let followings = res.data.data.followings;
                    if (followings === null || typeof followings === 'undefined') {
                        this.following = false
                    } else {
                        this.following = followings.some(artist => artist == this.artist._id)
                    }
                }
            })
        })
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
#artist-avatar{
    width: 100%;
    height: auto;
    margin: 0 auto;
    aspect-ratio: 1/1;
    background-repeat: no-repeat;
    background-size: cover !important;
    background-position: center;
    position: relative;
    object-fit: cover;
}
#artist-avatar::after {
    content: '';
    display: block;
    position: absolute;
    height: 76%;
    width: 101%;
    background: linear-gradient(0deg, #1B1A18, #1b1a1885, #00000000);
    background: -webkit-linear-gradient(90deg, #1B1A18, #1b1a1885, #00000000);
    top: 25%;
}
.artist-info {
    position: relative;
    margin-top: -22%;
    z-index: 50;
    margin-bottom: 24px;
}
p {
    font-size: 12px;
    color: #BFBFBF;
}
.artist-title {
    font-size: 18px;
}
.bar {
    display: flex;
    justify-content: space-between;
    padding-top: 8px;
}
.bar button {
    background-color: #bfbfbf;
    border:none;
    outline: none;
    border-radius: 10px;
    min-width: 140px;
    min-height: 38px;
    font-size: 13px;
    font-family: 'Poppins', sans-serif;
    margin-right: 16px;
}
.bar p {
    font-size: 12px;
}
.bar p span {
    color: #ffc857
}
.active {
    background-color: #ffc857 !important;
    font-weight: bold;
}

@media screen and (min-width: 728px) {
    #artist-avatar {
        width: 100%;
        height: 390px !important;
        background-size: auto 410px !important;
        background-position: right;
        border-radius: 15px;
    }
    .artist-info {
        padding-left: 20px;
        margin-top: calc(-390px / 1.3);
    }
    .mtop {
        padding: 0 30px;
        position: relative;
        z-index: 55;
    }
    .artist-info p {
        font-size: 18px;
    }
    .artist-title {
        font-size: 36px;
    }
    .bar {
        display: block;
    }
    .bar p {
        font-size: 18px;
    }
    .bar button {
        width: 155px;
        height: 40px;
        font-size: 14px;
        font-weight: bold;
        margin-top: 30px;
    }
    .header {
        margin-top: 30px;
    }
    #artist-avatar::after {
        content: '';
        display: block;
        position: absolute;
        height: 100%;
        width: 100%;
        /* background: linear-gradient(90deg, #1B1A18, #1b1a1885, #00000000); */
        background: -webkit-linear-gradient(
            0deg,
            #000000,
            #000000,
            #000000,
            #000000,
            #000000,
            #000000,
            rgba(0,0,0,0.90),
            rgba(0,0,0,0.60),
            #00000000) !important;
        top: 0%;
        border-radius: 15px;
    }
}
</style>