<template>
    <div class="likes">
        <div class="likes__header">
            <div class="likes__header-title">
                <ion-icon name="arrow-back-outline" @click="back" class="back-icon"></ion-icon>
                <h2> Your Liked Songs</h2>
            </div>
            <div class="likes__header-count">
                <!-- <span>{{count}}</span> -->
            </div>
        </div>
        <div class="likes__list">
            <Song v-for="id in liked_songs_ids" :key="id" :sid="id"/>
        </div>
    </div>
</template>

<script>
import Song from '@/components/me/song.vue'
import axios from 'axios'
export default {
    components: {
        Song
    },
    name: 'likes',
    data() {
        return {
            count: 0,
            liked_songs_ids: []
        }
    },
    created() {
        this.getLikes();
    },
    methods: {
        getLikes() {
            let url = `https://audiofy.myren.xyz/api/v1/getLikedSongs`
            axios.get(url, {withCredentials: true}).then(res => {
                if (!res.data.ok) return
                this.count = res.data.data.count
                this.liked_songs_ids = res.data.data.liked_songs
            })
        },

        back() {
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped>
.likes {
    padding: 18px;
}
.back-icon {
    display: flex;
    height: 36px;
    widows: 36px;
    place-content: center;
    place-items: center;
    font-size: 1.5rem;
    padding-right: 10px;
    margin-right: 8px;
}
.likes__header-title{
    display: flex;
    margin-bottom: 30px;
}


</style>