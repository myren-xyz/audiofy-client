<template>
    <div class="artist">
        <div class="artist-wrapper">
            <div :data-src="artist.avatar_url" id="avatar"></div>
        </div>
        <p class="artist-title">{{artist.nic}}</p>
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
    width: 120px;
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
    background-size: cover !important;
    background-position: center;
    background-repeat: no-repeat;
}
.artist-title{
    margin-top: 6px;
    font-size: 11px;
    max-width: 91px;
    color: #c1c1c1;
}
</style>