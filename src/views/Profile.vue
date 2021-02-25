<template>
  <div>
    <div id="avatar-wrapper"><h3>GU</h3></div>
    <h2 class="user-firstname">{{profile.user_firstname}} {{profile.user_lastname}}</h2>
    <div class="u-info">
      <div class="ffl"><p class="counter">1M</p><p class="lbl">Followers</p></div>
      <div class="ffl"><p class="counter">15</p><p class="lbl">Following</p></div>
      <div class="ffl"><p class="counter">15</p><p class="lbl">Likes</p></div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  computed: mapState(["profile"])
}


</script>
<style scoped>
#avatar-wrapper{
  width: 81px;
  height: 81px;
  border-radius: 4.39%;
  background: linear-gradient(45deg, #2a2a2a, rgb(87, 87, 87));
  margin: 12px auto;

  display: flex;
  place-items: center;
  place-content: center;
}
.user-firstname{
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}
.u-info{
  margin: 26px auto;
  display: flex;
  justify-content: space-around;
  width: 90%;
}
.ffl {
  text-align: center;
}
.counter{
  color: #ffc857
}
.lbl {
  font-weight: bold;
  font-size: 12px;
  margin-top: 2px;
}
</style>