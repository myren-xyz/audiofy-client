<template>
    <div class="aplaylist">
        <div class="aplaylist-inner">

            <div class="pl-header">
                <p>Add To Playlist</p>
            </div>

            <div class="pl-body">
                <div>
                    <div class="icon">
                        <ion-icon name="duplicate"></ion-icon>
                    </div>
                    <p class="std-p">Make Your First Playlist</p>
                </div>
            </div>

            <div class="pl-footer">
                <button>Create Playlist</button>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    created() {
        console.log('Aplaylist created');
    },
}
</script>

<style scoped>
    .icon {
        display: flex;
        width: 100%;
        place-content: center;
        font-size: 60px;
        color: #ffc857;
        padding-top: 10px;
    }
    .std-p {
        margin-top: 8px;
        text-align: center;
        font-size: 12px;
    }
    .aplaylist {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(47, 47, 47, 0.65);
        z-index: 9999;
    }
    .aplaylist-inner {
        position: absolute;
        top: calc(50% - 143px);
        left: calc(50% - 123px);
        width: 246px;
        height: 286px;
        background-color: #171715;
        border-radius: 20.5px;
    }
    .pl-header {
        position: relative;
        padding: 30px 0;
    }
    .pl-header p {
        font-size: 14px;
        color: #f2f2f2;
        font-weight: 500;
        text-align: center;
    }
    .pl-body {
        position: relative;
        width: 100%;
        height: calc(100% - 153px);
        overflow-y: auto;
    }
    .pl-footer {
        position: relative;
        width: 100%;
        padding: auto 0 30px 0;
    }
    .pl-footer button {
        display: block;
        width: calc(100% - 60px);
        margin: 0 auto;
        font-family: 'Poppins', sans-serif;
        background-color: #ffc857;
        font-size: 12px;
        font-weight: bold;
        color: #171715;

        border: none;
        outline: none;
        border-radius: 5px;
        height: 40px;
    }
</style>