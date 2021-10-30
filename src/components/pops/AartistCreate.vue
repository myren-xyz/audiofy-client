<template>
    <div class="">
        <!-- we use cookies popups -->
        <div class="cookie-popup">
            <div class="cookie-popup__content">
                <div class="cookie-popup__text">
                    <p>
                        <span>
                            {{context.message}}
                        </span>
                    </p>
                </div>
                <div class="cookie-popup__buttons">
                    <button v-if="context.link" class="cookie-popup__button" @click="jump">
                        Artist Page
                    </button>
                    <button v-if="context.link" class="cookie-popup__button" @click="jumpTrack">
                        Upload Tracks From this Artist
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AartistPU',
    props:['context'],
    data() {
        return {
            accepted: false,
        }
    },
    methods: {
        jump: function() {
            let router = this.$router;
            router.replace(this.context.link);      
        },
        jumpTrack: function() {
            let router = this.$router;
            router.replace(`https://audiofy.myren.xyz/admin/songs/upload?by=${this.context.username}`);      
        },
    },
    mounted() {
        console.log(this.context);
    },
}
</script>

<style scoped>
.cookie-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
}
.cookie-popup__content {
    width: 80%;
    max-width: 500px;
    background: #fff;
    border-radius: 5px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.cookie-popup__text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.cookie-popup__text p {
    margin: 0;
    font-size: 16px;
    line-height: 1.5;
    color: #333;
}
.cookie-popup__text span {
    font-weight: bold;
}
.cookie-popup__buttons {
    display: flex;
    justify-content: center;
    align-items: center;
}
.cookie-popup__button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    margin: 0 10px;
    font-size: 16px;
    line-height: 1.5;
    color: #0a0a0a;
    background-color: #ffc857;
    font-family: 'Poppins', sans-serif;
    font-weight: bold;
    cursor: pointer;
    margin-top: 20px;
}
</style>