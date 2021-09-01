<template>
  <div id="app">
    <Acookie/>
    <Header/>
    <div id="wrapper">
      <div id="side-wrapper">
        <Side/>
      </div>
      <div id="main">
        <HeaderDesktop/>
        <router-view/>
      </div>
    </div>
    <Player/>
    <BottomPlayer/>
    <BottomPlayerDesktop/>
    <BottomNav/>
  </div>
</template>
<script>
import Player from './components/Player.vue'
import Header from './components/Header.vue'
import HeaderDesktop from './components/HeaderDesktop.vue'
import Side from './components/Side.vue'
import BottomPlayer from './components/BottomPlayer.vue';
import BottomPlayerDesktop from './components/BottomPlayerDesktop.vue';
import BottomNav from './components/BottomNav.vue'
import Acookie from './components/pops/Acookie.vue'

export default {
  components: {
    Player,
    HeaderDesktop,
    Header,
    Side,
    BottomPlayer,
    BottomPlayerDesktop,
    BottomNav,
    Acookie
  },
  created(){
    this.$store.commit('setProfile');
    this.$store.commit('getSongs');
    this.$store.commit('getArtists');
    this.$store.commit('getPlayerState');
  }
}
</script>
<style>
:root {
  --weight-semibold: 600;
}

*, *::after, *::before{
  margin:0;
  padding: 0;
  box-sizing: border-box;
}
html{
  background-color: #1B1A18;
  color: #c1c1c1;
}
a,router-link{
  text-decoration: none;
}
a:visited, router-link:visited{
  color: #c1c1c1;
}
.router-link-exact-active ion-icon{
    color: #ffc857 !important;
}
h1,h2,h3,h4,h5,h6{
  font-family: 'Poppins', sams-serif;
}
a, p, span, input{
  font-family: 'Mulish', sans-serif;
}
#main{
  padding-top: 90px;
  padding-bottom: 80px;
}
@media screen and (min-width: 728px){
#wrapper{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}
#main{
  position: relative;
  padding: 0 30px;
  width: calc(100% - 200px);
  height: 100vh;
}
#side-wrapper{
  width: 200px;
}
}
</style>
