<template>
    <div class="">
        <!-- we use cookies popups -->
        <div class="cookie-popup">
            <div class="cookie-popup__content">
                <div class="cookie-popup__text">
                    <p>
                        <span>
                            This website uses cookies to ensure you get the best experience on our website.
                        </span>
                        <span>
                            By continuing to use this site you agree to our use of cookies.
                        </span>
                    </p>
                </div>
                <div class="cookie-popup__buttons">
                    <button class="cookie-popup__button" @click="accept">
                        Accept
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Cookie',
    data() {
        return {
            accepted: false,
        }
    },
    methods: {
        accept() {
            this.accepted = true;
            // set to localstorage
            localStorage.setItem('cookieAccepted', true);
        }
    },
    mounted() {
        let acc = localStorage.getItem('cookieAccepted');
        if (acc === 'false') {
            this.accepted = false;
        } else {
            this.accepted = true;
        }
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