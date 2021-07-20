<template>
    <div class="album">
        <div class="top">
            <div class="rl">
                <div id="avatar"></div>
            </div>
            <div class="rl">
                <div class="right">
                    <h2 id="album-title">album 1999</h2>
                    <div class="artist-sec">
                        <div id="artist-avatar"></div>
                        <p>Mohammad Reza Shajarian</p>
                    </div>
                    <div class="action-bar">
                        <div class="action-bar-items"><ion-icon name="add-circle"></ion-icon></div>
                        <div class="action-bar-items"><ion-icon name="heart-outline"></ion-icon></div>
                        <div class="action-bar-items"><ion-icon name="share-outline"></ion-icon></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="control-bar">
            <button class="btn-main"><ion-icon name="play"></ion-icon>PLAY</button>
            <button><ion-icon name="shuffle"></ion-icon>SHUFFLE</button>
        </div>
        <div class="bottom-section">
            <div id="album-tracks">
                <div class="track">
                    <h4 class="track-single"><div><span>id</span><p>track title</p></div><span>time</span></h4>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.album {
    padding: 16px 16px 100px 16px;
}
.top {
    display: flex;
    margin-bottom: 18px;
}
.top .rl {
    width: 50%;
}
.right {
    padding: 8px;
}
#avatar {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 5px;
    background-image: url('https://music-fa.com/wp-content/uploads/2020/10/MohammadReza-Shajaryan-Doosh-Doosh-Music-fa.com_.jpg');
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-position: center;
}
.action-bar {
    display: flex;
    justify-content: space-around;
    font-size: 24px;
    color: #fff;
}
.control-bar {
    display: flex;
    justify-content: space-between;
}
.control-bar button {
    width: calc(50% - 14px);
    height: 40px;
    outline: none;
    border: 1px solid #ffc857;
    border-radius: 5px;
    font-family: 'Mulish', sans-serif;
    color: #ffc857;
    background-color: #00000000;
    font-weight: bold;
    display: flex;
    place-items: center;
    place-content: center;
}
.control-bar button ion-icon {
    margin-right: 4px;
    font-size: 20px;
}
.btn-main {
    color: #0d0d0d !important;
    background-color: #ffc857 !important;
}
.artist-sec {
    display: flex;
    margin-bottom: 8px;
}
.artist-sec p {
    font-size: 10px;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    width: calc(100% - 42px);
    color: #C1C1C1;
}
#artist-avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background-image: url('https://musico.ir/wp-content/uploads/2019/08/%DB%8C%D8%B3.jpg');
    background-size: 34px;
    background-position: center;
    margin-right: 8px;
}
#album-title {
    font-size: 18px;
    color: #fff;
    font-weight: bold;
    margin-bottom: 8px;
    text-transform: capitalize;
}
.track-single {
    height: 46px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.track-single div {
    height: 100%;
    display: flex;
    align-items: center;
}
.track-single span {
    color: #818181;
}
.track-single p {
    margin: 0 10px 0 10px;
}
</style>