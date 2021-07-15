<template>
    <div class="search">
        <div id="search-action">
            <input type="text" id="searchbox" placeholder="Search for Songs, Artists, etc">
            <div id="search-btn"><ion-icon name="search-outline"></ion-icon></div>
        </div>

        <div class="item">
            <p>Set Genre</p>
            <div class="icon"><ion-icon name="chevron-forward"></ion-icon></div>
        </div>
        <div class="item">
            <p>Set Mood</p>
            <div class="icon"><ion-icon name="chevron-forward"></ion-icon></div>
        </div>
    </div>
</template>
<style scoped>
.search{
    padding: 12px 12px 100px 12px;
}
#search-action {
    display: flex;
    margin-bottom: 46px;
}
#searchbox {
    border: none;
    outline: none;
    font-size: 14px;
    padding: 10px;
    height: 48px;
    width: calc(100% - 48px);
    border-radius: 3px 0 0 3px;
    background-color: #F2F2F2;
    color: #2a2a2a;
}
#search-btn {
    width: 48px;
    height: 48px;
    display: flex;
    place-content: center;
    place-items: center;
    background-color: #F2F2F2;
    border-radius: 0 3px 3px 0;
    color: #6b6b6b;
}

.item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 48px;
}
.item .icon {
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 20px;
}
.item p {
    font-family: 'Poppins', sans-serif;
    font-weight: normal;
}
</style>