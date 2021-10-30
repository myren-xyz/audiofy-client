<template>
    <div>
        <div id="trackCover" @click="selectCover"></div>
        <input type="file" id="cover">
        <input v-if="editMode" type="url" id="cover-url" v-model="coverUrl"/>
        <input type="text" id="trackTitle" v-model="trackTitle" placeholder="Track Title">
        <input type="text" id="trackArtist" v-model="trackArtists" placeholder="Track Artist: separate by ," @keyup="autoCompleteSuggest">
        <div id="suggestionBox"></div>
        <input type="file" id="track">
        <input v-if="editMode" type="url" id="track-url" v-model="trackUrl"/>
        <label for="track" id="track-label">
            <div id="track-file-info">
                <p id="track-file-name">No Track Selected</p>
                <p id="track-file-size">0 MB</p>
            </div>
        </label>
        <div class="buttons">
            <button @click="cta">
                <Aloader size="26" v-show="wating"/>
                {{ctaTitle}}
            </button>
            <button v-if="editMode">DELETE</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Aloader from '@/components/others/Aloader.vue'

function convert(data, issuer, vm) {
    vm.ctaTitle = 'CONVERTING'
    let trackUrl = data.Track.url
    let path = trackUrl.split('/').slice(4,7).join('/')
    let newUrl = `https://utils.myren.xyz/ffmpeg/api/v1/convert?file_url=${trackUrl}&upload_path=${path}&issuer=${issuer}`
    // GET to newUrl
    console.log(newUrl)
    axios.get(newUrl, {withCredentials: true}).then(res => {
        console.log(res)
        subscribe(res.data.job_id, vm)
    })
}

function subscribe(job_id, vm) {
    // subscribe to SSE stream
    let url = `https://utils.myren.xyz/ffmpeg/api/v1/subscribe?job_id=${job_id}`
    let source = new EventSource(url)
    source.onmessage = function(e) {
        console.log(e.data, typeof e.data, e.data == "uploaded")
        if (e.data == "\"uploaded\"") {
            hideLoader(vm)
            vm.ctaTitle = 'UPLOADED'
        }
    }
}

export default {
    components: {
        Aloader
    },
    data() {
        return {
            ctaTitle: 'UPLOAD',
            wating: false,
            editMode: false,
            trackTitle: '',
            trackArtists: '',
            trackUrl: '',
            coverUrl: '',
        }
    },
    methods: {
        cta() {
            if (this.editMode) {
                update(this)
            }else{
                upload(this)
            }
        },

        selectCover() {
            let input = this.$el.querySelector('#cover')
            input.click()
        },

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
        },

        autoCompleteSuggest() {
            let input = this.$el.querySelector('#trackArtist')
            let box = this.$el.querySelector('#suggestionBox')
            box.innerHTML = ''
            let url = `https://audiofy.myren.xyz/api/v1/search?query=${this.trackArtists}&artists=true`
            axios.get(url, {withCredentials: true}).then(res => {
                let artists = res.data.data.Artists
                artists.forEach(artist => {
                    let btn = document.createElement('button')
                    btn.setAttribute('class', 'suggestion')
                    btn.textContent = artist.username + ' - ' + artist.nic
                    btn.addEventListener('click', () => {
                        box.innerHTML = ''
                        this.trackArtists = artist.username
                        input.blur()
                    })
                    box.appendChild(btn)
                })
            })
        },
    },
    mounted() {
        if (this.$route.params.id) loadSongs(this)
        if (this.$route.query.by) this.trackArtists = this.$route.query.by

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

function loadSongs(vm) {
    let getSongByIdURL = `https://audiofy.myren.xyz/api/v1/getSongById?id=${vm.$route.params.id}`
    axios.get(getSongByIdURL, {withCredentials: true}).then(response => {
        vm.editMode = true
        vm.ctaTitle = 'UPDATE'
        if (response.data.ok) fillInputs(vm, response.data.data)
    })
}

function fillInputs(vm, data) {
    let fields = JSON.parse(data)
    vm.trackTitle = fields.title
    vm.trackArtists = fields.artists
    vm.$el.querySelector('#trackCover').style.backgroundImage = `url(${fields.avatar_url})`
    vm.coverUrl = fields.avatar_url
    vm.trackUrl = fields.track_url
}

function update(vm){
    showLoader(vm)
    let updateSongURL = `https://audiofy.myren.xyz/api/v1/updateSong?id=${vm.$route.params.id}&track_url=${vm.trackUrl}&avatar_url=${vm.coverUrl}&title=${vm.trackTitle}&artists=${vm.trackArtists}`
    console.log(updateSongURL);
    axios.get(updateSongURL, {withCredentials: true}).then(response => {
        if (response.data.ok) {
            hideLoader(vm)
            vm.ctaTitle = 'UPDATED'
        }
        console.log(response.data);
    })
}

function upload(vm) {
    showLoader(vm)
    vm.ctaTitle = 'UPLOADING'
    let url = `https://audiofy.myren.xyz/api/v1/uploadSong?title=${vm.trackTitle}&artists=${vm.trackArtists}`

    let formData = new FormData();
    formData.append('trackFile', vm.$el.querySelector('#track').files[0]);
    formData.append('avatarFile', vm.$el.querySelector('#cover').files[0]);

    axios.post(url, formData, {withCredentials: true}).then(response => {
        console.log(response.data);
        let data = response.data.data
        if (response.data.ok) {
            vm.ctaTitle = 'UPLOADED'
            console.log(vm.$store.state.profile.id);
            convert(data, vm.$store.state.profile.id, vm)
        }
    }).catch(error => {
        console.log(error);
    })
}

function hideLoader(vm) {
    let loader = vm.$el.querySelector('.aloader')
    loader.classList.add('hide-loader')
    setTimeout(() => {
        loader.classList.add('none')
        setTimeout(() => vm.wating = false, 601)
    }, 601)
}

function showLoader(vm) {
    vm.wating = true
    let loader = vm.$el.querySelector('.aloader')
    loader.classList.remove('none')
    setTimeout(() => {
        loader.classList.remove('hide-loader')
    }, 601)
}
</script>

<style>
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
#trackTitle, #trackArtist, #cover-url, #track-url {
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
#trackTitle {
    margin-top: 10px;
}
#track-url {
    margin-bottom: 10px;
}
#trackArtist {
    margin-top: 10px;
    margin-bottom: 20px;
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
#suggestionBox button{
    border: none;
    outline: none;
    background-color: #eee;
    color: #0d0d0d;
    padding: 10px 20px;
    border-radius: 40px;
    margin:18px 18px 18px 0;
}
#suggestionBox {
    margin-bottom: 20px;
}
</style>