<template>
  <div id="app">
    <Header/>
    <BottomNav/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import BottomNav from './components/BottomNav'

export default {
  name: 'App',
  components: {
    Header,
    BottomNav
  }
}
</script>

<style>

*, *::before, *::after{
  padding: 0;
  margin:0;
  box-sizing: border-box;
}
html {
  background-color: rgb(25, 23, 36);
  color: #eee;
}
h1, h2, h3, h4, h5 ,h6{
  font-family: 'Poppins', sans-serif;
}
p,a{
  font-family: 'Mulish', sans-serif;
}
</style>
