<template>
    <div>
        <div class="artist-cover"></div>
        <div class="artist-data-wrapper">
            <div style="background-image: url('https://musico.ir/wp-content/uploads/2019/08/%DB%8C%D8%B3.jpg')" id="artist-avatar"></div>
            <h4 class="artist-title">{{artist.title}}</h4>
            <div class="tracks-wrapper">
                
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data: function(){
        return {
            artist: {
                username: this.$route.params.username,
                title: 'Mohammad Reza Shajarian'
            }
        }
    }
}
</script>



<style scoped>
.artist-cover{
    height: 200px;
    width: 100%;
    background: linear-gradient(45deg, #5a418a, #3d3d3d);
}
.artist-data-wrapper{
    position: relative;
    top: -80px;
}
#artist-avatar{
    width: 160px;
    height: 160px;
    /* background: linear-gradient(45deg, #2a2a2a, #0d0d0d); */
    border-radius: 50%;
    position: relative;
    margin: 0 auto;
    background-size: 160px;
    border: 1px solid #eee;
}
.artist-title{
    padding-block-start: 16px;
    text-align: center;
}
</style>