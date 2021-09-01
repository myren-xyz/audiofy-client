<template>
    <div class="" v-if="this.$store.state.popups.action">
        <!-- we use cookies popups -->
        <div class="cookie-popup">
            <div class="cookie-popup__content">
                <div class="cookie-popup__text">
                    <p>
                        <span>
                            This functionality is only available for users who have signed up for the service.
                        </span>
                        <span>
                            Sign Up / Log in to access this functionality.
                        </span>
                    </p>
                </div>
                <div class="cookie-popup__buttons">
                    <button class="cookie-popup__button" @click="sign">
                        Sign Up / Log In
                    </button>
                    <button class="cookie-popup__button" @click="close">
                        Maybe Later
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'Aaction',
    methods: {
        sign() {
            this.$store.commit('setActionPopup', false)
            // go to https://accounts.myren.xyz
            window.location.href = 'https://accounts.myren.xyz';
        },

        close() {
            this.$store.commit('setActionPopup', false)
        }
    },

    computed: mapState['popups']
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.cookie-popup__button {
    width: 90%;
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
.cookie-popup__button:nth-child(2) {
    background-color: #2a2a2a;
    color: #ffc857;
}
</style>