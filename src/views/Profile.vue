<template>
  <div>
    <div id="avatar-wrapper"><h3>GU</h3></div>
    <p class="user-firstname">{{profile.user_firstname}} {{profile.user_lastname}}</p>
    <p class="cta"><a href="#">following </a> | <a href="#">liked</a></p>
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
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(45deg, #2a2a2a, rgb(87, 87, 87));
  margin: 32px auto;

  display: flex;
  place-items: center;
  place-content: center;
}
.user-firstname{
  text-align: center;
  font-size: 22px;
}
.cta{
  text-align: center;
  font-size: 18px;
}
.cta a{
  color: #818181
}
</style>