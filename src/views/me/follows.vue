<template>
    <div class="follows">
        <div class="follows">
            <div class="follows-title">
                <ion-icon name="arrow-back-outline" @click="back" class="back-icon"></ion-icon>
                <h2> Your Followings</h2>
            </div>
            <div class="follows__header-count">
                <!-- <span>{{count}}</span> -->
            </div>
        </div>
        <div class="follows__list">
            <Artist v-for="id in followed_artists_ids" :key="id" :aid="id"/>
        </div>
    </div>
</template>

<script>
import Artist from '@/components/me/artist.vue'
import axios from 'axios'
export default {
    components: {
        Artist
    },
    name: 'follows',
    data() {
        return {
            count: 0,
            followed_artists_ids: []
        }
    },
    created() {
        this.getFollowings();
    },
    methods: {
        getFollowings() {
            let url = `https://audiofy.myren.xyz/api/v1/getFollowings`
            axios.get(url, {withCredentials: true}).then(res => {
                if (!res.data.ok) return
                this.count = res.data.data.count
                this.followed_artists_ids = res.data.data.followings
            })
        },

        back() {
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped>
.follows {
    padding: 16px;
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
.follows-title{
    display: flex;
    margin-bottom: 30px;
}


</style>