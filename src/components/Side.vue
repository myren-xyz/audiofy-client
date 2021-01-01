<template>
    <div class="side">
        <router-link to="/">
            <h3>Home</h3>
        </router-link>
        <router-link to="/search">
            <h3>Search</h3>
        </router-link>
        <router-link to="/library">
            <h3>My Library</h3>
        </router-link>
        <router-link to="/wallet">
            <h3>wallet</h3>
        </router-link>
        <router-link to="/profile">
            <h3>Profile</h3>
        </router-link>
    </div>
</template>
<style scoped>
.side{
    display: none;
}

@media screen and (min-width: 728px){
.side{
    display: block !important;
    width: 100%;
    height: calc(100vh - 48px);
    background-color: rgba(0,0,0,0.5);
    padding: 16px;
}
.side h3{
    margin-bottom: 8px;
    height: 38px;
    display: flex;
    align-items: center;
    border-radius: 19px;
    padding: 0 16px 0 16px
}
a h3{
    transition: all 0.3s;
    color: #838383 !important;
}
.router-link-exact-active h3{
    color: #fff !important;
    background-color: rgba(255,255,255,0.15);
}
}
</style>