<template>
    <div class="artist">
        <div class="artist-data-wrapper">
            <div id="artist-avatar"></div>

            <div class="artist-info">
                <p>Artist</p>
                <h4 class="artist-title">{{artist.title}}</h4>
                <div class="bar">
                    <p><span>60M</span> followers</p>
                    <button>Follow</button>
                </div>
            </div>

            <h3>Top Songs</h3>
            <div class="tracks-wrapper">
                <div class="slider">
                    <Song v-for="song in songs" :song="song" :key="song.id"/>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import Song from '@/components/Song.vue'

export default {
    components: {
        Song
    },
    data: function(){
        return {
            artist: {
                username: this.$route.params.username,
                title: 'Mohammad Reza Shajarian'
            }
        }
    },
    computed: {
        songs(){
            return this.$store.state.songs.filter(song => song.artist_id == 9121010000)
        }
    }
}
</script>



<style scoped>
.artist-data-wrapper{
    padding: 0 16px;
}
.slider{
  width: 100%;
  display: flex;
  overflow-x: scroll;
  padding: 8px 0 16px 0;
  margin-bottom: 16px;
}
#artist-avatar{
    width: 100%;
    height: auto;
    margin: 0 auto;
    aspect-ratio: 1;
    background-repeat: no-repeat;
    background-image: url('https://music-fa.com/wp-content/uploads/2020/10/MohammadReza-Shajaryan-Doosh-Doosh-Music-fa.com_.jpg'); 
    background-size: 100% auto;
}
#artist-avatar::after {
    content: ' ';
    display: block;
    position: relative;
    height: 75%;
    width: 100%;
    background: linear-gradient(0deg, #1B1A18, #1b1a1885, #00000000);
    top: 25%;
}
.artist-info {
    position: relative;
    margin-top: -22%;
    z-index: 50;
    margin-bottom: 24px;
}
p {
    font-size: 12px;
    color: #BFBFBF;
}
.artist-title {
    font-size: 18px;
}
.bar {
    display: flex;
    justify-content: space-between;
    padding-top: 8px;
}
.bar button {
    background-color: #bfbfbf;
    border:none;
    outline: none;
    border-radius: 10px;
    min-width: 140px;
    min-height: 38px;
    font-size: 13px;
    font-family: 'Poppins', sans-serif;
    margin-right: 16px;
}
.bar p {
    font-size: 12px;
}
.bar p span {
    color: #ffc857
}
</style>