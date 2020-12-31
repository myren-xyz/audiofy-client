<template>
  <div id="app">
    <Header/>
    <router-view/>
    <BottomPlayer/>
    <BottomNav/>
  </div>
</template>
<script>
import Header from './components/Header.vue'
import BottomPlayer from './components/BottomPlayer.vue';
import BottomNav from './components/BottomNav.vue'
export default {
  components: {
    Header,
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
  background-color: rgb(31, 29, 43);
  color: #eee;
}
a,router-link{
  text-decoration: none;
}
a:visited, router-link:visited{
  color: #eee;
}
.router-link-exact-active ion-icon{
    color: #eee !important;
}
h1,h2,h3,h4,h5,h6{
  font-family: 'Poppins', sams-serif;
}
a, p{
  font-family: 'Mulish', sans-serif;
}
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
