<template>
    <router-link :to="`/artist/${artist.username}`">
        <div class="artist">
            <div class="artist-wrapper">
                <div :data-src="artist.avatar_url" id="avatar"></div>
            </div>
            <div class="artist-info">
                <p class="artist-title">{{artist.nic}}</p>
                <p class="artist-username">{{artist.username}}</p>
            </div>
        </div>
    </router-link>
</template>
<script>
import axios from 'axios'
export default {
    props: ['aid'],
    data() {
        return {
            artist: {},
        }
    },

    mounted(){
        let url = `https://audiofy.myren.xyz/api/v1/getArtistById?id=${this.aid}`
        axios.get(url, {withCredentials: true}).then(res=>{
            if (!res.data.ok) return
            this.artist = JSON.parse(res.data.data.message)
        }).then(()=>{
            this.setInterface()
        })
        
        
    },

    methods: {
        setInterface(){
            var elem = this.$el.querySelector("#avatar")
            elem.style.background = `url(${elem.getAttribute('data-src')})`
        }
    },
}
</script>
<style scoped>
.artist{
    display: flex;
    margin-bottom: 10px;
}
.artist-wrapper{
    border-radius: 50%;
    margin-right: 16px;
}
#avatar{
    /* border: 2px solid #eee; */
    width: 91px;
    height: 91px;
    border-radius: 5px;
    background-size: cover !important;
    background-position: center;
    background-repeat: no-repeat;
}
.artist-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.artist-title{
    font-size: 14px;
    font-weight: bold;
    color: #c1c1c1;
}
.artist-username {
    font-size: 12px;
    font-weight: 400;
    color: #959595;
}
</style>