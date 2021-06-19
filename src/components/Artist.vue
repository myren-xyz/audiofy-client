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
    /* border: 2px solid #eee; */
    width: 91px;
    height: 91px;
    border-radius: 50%;
    background-size: 91px !important;
}
.artist-title{
    margin-top: 6px;
    font-size: 11px;
    max-width: 91px;
    color: #c1c1c1;
}
</style>