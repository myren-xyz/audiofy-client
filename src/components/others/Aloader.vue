<template>
    <div class="aloader hide-loader none"></div>
</template>

<script>
export default {
    name: 'Aloader',
    props: ['mode', 'size'],
    mounted() {
        let size = this.size || 64;
        let mode = this.mode || 'ball-pulse-sync';
        let loader = this.$el
        loader.style.width = `${size}px`
        loader.style.height = `${size}px`
        loader.classList.add(mode)
    }
}
</script>

<style scoped>
.aloader {
    top: 0;
    position: relative;
    display: inline-block;
    border: 5px solid #eee;
    border-top: 5px solid #2a2a2a;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    transition: 0.6s all,top 0.6s, opacity 0.2s;
}
.hide-loader {
    top: -100%;
    opacity: 0;
}
.none {
    width: 0 !important;
    height: 0 !important;
    border: none;
    margin: 0 !important;
}
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>