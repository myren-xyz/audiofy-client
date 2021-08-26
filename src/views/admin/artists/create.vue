<template>
    <div>
        <div id="topper">
            <div id="artist-avatar"></div>
            <div id="artist-display">
                <h2>{{ artist.name }}</h2>
                <h3>{{ artist.username }}</h3>
            </div>
        </div>

        <input type="text" v-model="artist.name" id="artist-name">
        <input type="text" v-model="artist.username" id="artist-username">

        <button id="save">SAVE</button>
        <button id="delete">DELETE</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            artist: {
                name: 'Artist Name',
                username: 'Username'
            }
        }
    },
}
</script>
<style scoped>
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
    width: 160px;
    height: 160px;
    border-radius: 5px;
    background-color: #C4C4C4;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
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
</style>