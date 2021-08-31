<template>
    <div>
        <div id="topper">
            <div id="artist-avatar" @click="chooseCover" @mouseenter="enter" @mouseleave="leave">
                <ion-icon v-if="showUploadIcon" name="cloud-upload-outline"></ion-icon>
            </div>
            <input type="file" id="avatar-file-input"/>
            <div id="artist-display">
                <h2>{{ artist.name }}</h2>
                <h3>{{ artist.username }}</h3>
            </div>
        </div>

        <input type="text" v-model="artist.name" id="artist-name" spellcheck="false">
        <input type="text" v-model="artist.username" id="artist-username" spellcheck="false" @keyup="lower">

        <button id="save" @click="save">SAVE</button>
        <button id="delete">DELETE</button>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            artist: {
                name: 'Artist Name',
                username: 'username'
            },
            showUploadIcon: null
        }
    },
    methods: {
        chooseCover() {
            this.$el.querySelector('#avatar-file-input').click()
        },
        enter() {
            this.showUploadIcon = true
            // var avatar = this.$el.querySelector('#artist-avatar')

        },
        leave() {
            var avatar = this.$el.querySelector('#artist-avatar')
            if (avatar.style.backgroundImage) {this.showUploadIcon = false}
        },
        lower() {
            this.artist.username = this.artist.username.toLowerCase()
        },
        save() {
            let url = `https://audiofy.myren.xyz/api/v1/createArtist?name=${this.artist.name}&username=${this.artist.username}`
            // post artistAvatar to url
            let formData = new FormData()
            formData.append('artistAvatar', this.$el.querySelector('#avatar-file-input').files[0])
            let config = {
                withCredentials: true,
            }
            axios.post(url, formData, config)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        }
    },
    mounted() {
        var avatarInput = this.$el.querySelector('#avatar-file-input')
        var avatar = this.$el.querySelector('#artist-avatar')
        if (!avatar.style.backgroundImage) this.showUploadIcon = true

        avatarInput.addEventListener('change', () => {
            let file = avatarInput.files[0]
            this.showUploadIcon = false
            let url = URL.createObjectURL(file)
            avatar.style.backgroundImage = `url(${url})`
        })
    }
}
</script>
<style scoped>
#avatar-file-input {
    display: none;
}
#topper {
    display: flex;
    margin-bottom: 40px;
}
#topper #artist-display {
    margin-left: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
#artist-avatar {
    display: flex;
    place-items: center;
    place-content: center;
    width: 160px;
    height: 160px;
    border-radius: 5px;
    background-color: #C4C4C4;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    overflow: hidden;
}
#artist-name, #artist-username {
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
#artist-username {
    margin-top: 10px;
    margin-bottom: 40px;
}

h2, h3 {
    font-size: 24px;
}
h2 {
    font-family: 'Poppins', sans-serif;
}
h3 {
    font-family: 'Mulish', sans-serif;
}
button {
    border-radius: 10px;
    width: 155px;
    font-family: 'Poppins', sans-serif;
    height: 40px;
    border: none;
    outline: none;
    font-size: 14px;
    font-weight: bold;
}
#save {
    background-color: #ffc857;
    color: #1B1A18;
}
#delete {
    border: 1px solid #ffc857;
    background-color: transparent;
    color: #ffc857;
    margin-left: 20px;
}
#artist-avatar ion-icon {
    color: #1B1A18;
    font-size: 38px;
    /* z-index: 100; */
}
</style>