<template>
  <div id="app">
    <Header/>
    <div id="wrapper">
    <div id="side-wrapper">
    <Side/>
    </div>
    <div id="main">
    <router-view/>
    </div>
    </div>
    <BottomPlayer/>
    <BottomNav/>
  </div>
</template>
<script>
import Header from './components/Header.vue'
import Side from './components/Side.vue'
import BottomPlayer from './components/BottomPlayer.vue';
import BottomNav from './components/BottomNav.vue'
export default {
  components: {
    Header,
    Side,
    BottomPlayer,
    BottomNav
  }
}
</script>
<style>
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
a, p{
  font-family: 'Mulish', sans-serif;
}
#main{
  padding-top: 90px;
  padding-bottom: 80px;
}
@media screen and (min-width: 728px){
#wrapper{
  width: 100%;
  height: calc(100vh-48px);
  display: flex;
  justify-content: space-between;
}
#main{
  position: relative;
  top:48px;
  left: 16%;
  width: 84%;
  padding: 0 0px 80px 0px ;
}
#side-wrapper{
  top:48px;
  width: 16%;
  position: fixed;
}
}
</style>
