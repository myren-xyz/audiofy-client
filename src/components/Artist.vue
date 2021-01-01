<template>
    <div class="artist">
        <div class="artist-wrapper">
            <div :data-src="artist.picURL" id="avatar"></div>
        </div>
        <p class="artist-title">{{artist.title}}</p>
    </div>
</template>
<script>
export default {
    props: ['artist'],
    mounted(){
        var elem = this.$el.querySelector("#avatar")
        elem.style.background = `url(${elem.getAttribute('data-src')})`
    }
}
</script>
<style scoped>
.artist{
    width: 160px;
    text-align: center;
}
.artist-wrapper{
    border-radius: 50%;
    margin-right: 16px;
}
#avatar{
    border: 2px solid #eee;
    width: 160px;
    height: 160px;
    border-radius: 50%;
    background-size: 160px 160px !important;
}
.artist-title{
    margin-top: 8px;
}
</style>