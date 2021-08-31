<template>
    <div>
        <div id="trackCover" @click="selectCover"></div>
        <input type="file" id="cover">
        <input type="text" id="trackTitle" v-model="trackTitle" placeholder="Track Title">
        <input type="text" id="trackArtist" v-model="trackArtists" placeholder="Track Artist: separate by ,">
        <input type="file" id="track">
        <button @click="upload">upload</button>
    </div>
</template>

<script>
import axios from 'axios'

function convert(data, issuer) {
    let trackUrl = data.Track.url
    let path = trackUrl.split('/').slice(4,7).join('/')
    let newUrl = `https://utils.myren.xyz/ffmpeg/api/v1/convert?file_url=${trackUrl}&upload_path=${path}&issuer=${issuer}`
    // GET to newUrl
    console.log(newUrl)
    axios.get(newUrl, {withCredentials: true}).then(res => {
        console.log(res)
        subscribe(res.data.job_id)
    })
}

function subscribe(job_id) {
    // subscribe to SSE stream
    let url = `https://utils.myren.xyz/ffmpeg/api/v1/subscribe?job_id=${job_id}`
    let source = new EventSource(url)
    source.onmessage = function(e) {
        console.log(e.data)
    }
}

export default {
    data() {
        return {
            trackTitle: '',
            trackArtists: ''
        }
    },
    methods: {
        upload() {
            let url = `https://audiofy.myren.xyz/api/v1/uploadSong?title=${this.trackTitle}&artists=${this.trackArtists}`

            let formData = new FormData();
            formData.append('trackFile', this.$el.querySelector('#track').files[0]);
            formData.append('avatarFile', this.$el.querySelector('#cover').files[0]);

            axios.post(url, formData, {withCredentials: true}).then(response => {
                console.log(response.data);
                let data = response.data.data
                if (response.data.ok) {
                    console.log(this.$store.state.profile.id);
                    convert(data, this.$store.state.profile.id)
                }
            }).catch(error => {
                console.log(error);
            })
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