<template>
    <div>
        <div id="trackCover" @click="selectCover"></div>
        <input type="file" id="cover">
        <input type="text" id="trackTitle" v-model="trackTitle" placeholder="Track Title">
        <input type="text" id="trackArtist" v-model="trackArtists" placeholder="Track Artist: separate by ,">
        <input type="file" id="track">
        <label for="track" id="track-label">
            <div id="track-file-info">
                <p id="track-file-name">No Track Selected</p>
                <p id="track-file-size">0 MB</p>
            </div>
        </label>
        <div class="buttons">
            <button @click="upload">
                <Aloader size="26"/>
                UPLOAD
            </button>
            <button>DELETE</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Aloader from '@/components/others/Aloader.vue'

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
    components: {
        Aloader
    },
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
        setTimeout(() => {
            this.$el.querySelector('.aloader').classList.add('hide-loader')
            setTimeout(() => {
                this.$el.querySelector('.aloader').classList.add('none')
            }, 601)
        }, 3000);

        let coverFileInput = this.$el.querySelector('#cover');
        let trackFileInput = this.$el.querySelector('#track');
        coverFileInput.addEventListener('change', () => {
            let file = coverFileInput.files[0];
            let url = URL.createObjectURL(file);
            this.$el.querySelector('#trackCover').style.backgroundImage = `url(${url})`;
        });
        trackFileInput.addEventListener('change', () => {
            let file = trackFileInput.files[0];
            let filesize = Math.round((file.size / (1024*1024)).toFixed(2));
            let filename = file.name;
            this.$el.querySelector('#track-file-name').innerText = filename;
            this.$el.querySelector('#track-file-size').innerText = filesize + ' MB';
        });
    }
}
</script>

<style scoped>
#track {
    display: none;
}
#track-label {
    display: block;
    border: 1px solid #282828;
    width: 370px;
    border-radius: 5px;
    padding: 10px;
    font-family: 'Mulish', sans-serif;
}
#track-file-info {
    background-color: #282828;
    border-radius: 5px;
    padding: 16px;
}
#track-file-name {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 8px;
}
#track-file-size {
    font-size: 12px;
    font-weight: 100;
}
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
.buttons {
    margin-top: 40px;
    display: flex;
}
.buttons button {
    overflow: hidden;
    border-radius: 10px;
    width: 155px;
    font-family: 'Poppins', sans-serif;
    height: 40px;
    border: none;
    outline: none;
    font-size: 14px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
}
.buttons button:first-child {
    background-color: #ffc857;
    color: #1B1A18;
}
.buttons button:last-child {
    border: 1px solid #ffc857;
    background-color: transparent;
    color: #ffc857;
    margin-left: 20px;
}
.aloader {
    margin-right: 10px;
}
</style>