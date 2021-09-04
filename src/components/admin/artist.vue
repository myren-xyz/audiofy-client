<template>
    <div class="artist-single">
        <div class="artist-single-container">

            <div>
                <p class="sa-name">{{artist.nic}}</p>
            </div>

            <div>
                <p class="sa-username">{{artist.username}}</p>
            </div>

            <div class="artist-action">
                <router-link :to="`/admin/artists/edit/${artist._id}`">
                    <p class="edit-artist">edit</p>
                </router-link>
               
                <p class="delete-artist" @click="deleteArtist">delete</p>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    props: ['artist'],

    methods: {
        deleteArtist() {
            console.log('delete artist');
        }
    },
}
</script>

<style scoped>
.artist-single {
    width: 100%;
}
.artist-single-container {
    display: flex;
    width: 100%;
    justify-content: space-between;
    background-color: #282828;
    padding: 20px;
    border-radius: 5px;
    margin-top: 10px;
}
.artist-single-container div {
    width: calc(100% / 3);
}
.artist-action {
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
}
.delete-artist {
    color: #FF6157;
    font-size: 11px;
    margin-left: 18px
}
.edit-artist {
    color: #C1C1C1;
    font-size: 11px;
}
.sa-username {
    color: #C1C1C1;
    font-weight: 100;
}
</style>