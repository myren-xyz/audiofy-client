<template>
    <div>
        <div id="trackCover" @click="selectCover"></div>
        <input type="file" id="cover">
        <input type="text" id="trackTitle" v-model="trackTitle" placeholder="Track Title">
        <input type="text" id="trackArtist" v-model="trackArtist" placeholder="Track Artist">
        <input type="file" id="track">
        <button @click="upload">upload</button>
    </div>
</template>

<script>

export default {
    data() {
        return {
            trackTitle: '',
            trackArtist: ''
        }
    },
    methods: {
        upload() {
            // audiofy.myren.xyz/api/v1/uploadSong?avatar=&
        },
        selectCover() {
            let input = this.$el.querySelector('#cover')
            input.click()
        }
    },
    mounted() {
        let coverFileInput = this.$el.querySelector('#cover');
        coverFileInput.addEventListener('change', () => {
            let file = coverFileInput.files[0];
            let url = URL.createObjectURL(file);
            this.$el.querySelector('#trackCover').style.backgroundImage = `url(${url})`;
        });
    }
}
</script>

<style scoped>
#trackTitle, #trackArtist {
    display: block;
    background-color: #282828;
    border-radius: 5px;
    border: none;
    outline: none;
    color: #ABABAB;
    min-height: 38px;
    padding: 10px 16px;
    min-width: 370px;
}
#trackArtist {
    margin-top: 10px;
    margin-bottom: 40px;
}
#trackCover {
    background-color: #c1c1c1;
    border-radius: 5px;
    margin-bottom: 40px;
    outline: none;
    border: none;
    width: 160px;
    height: 160px;
    display: block;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}
#cover {
    display: none;
}
</style>