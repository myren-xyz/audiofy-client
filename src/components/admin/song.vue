<template>
    <div class="song-single">
        <div class="song-single-container">

            <div>
                <p class="ss-name">{{song.title}}</p>
            </div>

            <div>
                <p class="ss-username" v-for="artist in song.artists" :key="artist">{{artist}}</p>
            </div>

            <div class="song-action">
                <router-link :to="`/admin/songs/edit/${song._id}`">
                    <p class="edit-song">edit</p>
                </router-link>
               
                <p class="delete-song" @click="deleteSong">delete</p>
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    props: ['song'],

    methods: {
        deleteSong() {
            console.log('delete artist');
            let deleteUrl = `https://audiofy.myren.xyz/api/v1/deleteSong?id=${this.song._id}`
            axios.get(deleteUrl, {withCredentials: true})
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    },
}
</script>

<style scoped>
.song-single {
    width: 100%;
}
.song-single-container {
    display: flex;
    width: 100%;
    justify-content: space-between;
    background-color: #282828;
    padding: 20px;
    border-radius: 5px;
    margin-top: 10px;
}
.song-single-container div {
    width: calc(100% / 3);
}
.song-action {
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
}
.delete-song {
    color: #FF6157;
    font-size: 11px;
    margin-left: 18px
}
.edit-song {
    color: #C1C1C1;
    font-size: 11px;
}
.ss-username {
    color: #C1C1C1;
    font-weight: 100;
}
</style>