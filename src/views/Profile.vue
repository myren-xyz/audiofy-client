<template>
  <div>
    <div id="avatar-wrapper"><h3>{{profile.user_firstname.charAt(0)}}{{profile.user_lastname.charAt(0)}}</h3></div>
    <h2 class="user-firstname">{{profile.user_firstname}} {{profile.user_lastname}}</h2>
    <!-- <div class="u-info">
      <div class="ffl"><p class="counter">1M</p><p class="lbl">Followers</p></div>
      <div class="ffl"><p class="counter">15</p><p class="lbl">Following</p></div>
      <div class="ffl"><p class="counter">15</p><p class="lbl">Likes</p></div>
    </div> -->

    <!-- <div id="switch-section">
      <h3>Switch To Artist Account</h3>
      <div id="switch">
        <div id="switch-btn"></div>
      </div>
    </div> -->

    <!-- <div class="item">
      <div class="item-left">
        <div class="icon"><ion-icon name="person"></ion-icon></div>
        <div><p>Edit Account</p></div>
      </div>
      <div class="arrow"><ion-icon name="chevron-forward"></ion-icon></div>
    </div> -->

    <!-- <div class="item">
      <div class="item-left">
        <div class="icon"><ion-icon name="time"></ion-icon></div>
        <div><p>History</p></div>
      </div>
      <div class="arrow"><ion-icon name="chevron-forward"></ion-icon></div>
    </div> -->

    <div class="item">
      <div class="item-left">
        <div class="icon"><ion-icon name="cog"></ion-icon></div>
        <div><p>Settings</p></div>
      </div>
      <div class="arrow"><ion-icon name="chevron-forward"></ion-icon></div>
    </div>

    <div class="item">
      <div class="item-left">
        <div class="icon"><ion-icon name="help-circle"></ion-icon></div>
        <div><p>Help</p></div>
      </div>
      <div class="arrow"><ion-icon name="chevron-forward"></ion-icon></div>
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
#switch-section {
  margin: 40px 0;
  padding: 0 18px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
}
.item {
  padding: 0 6px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.item-left {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
}
.item .icon {
  display: flex;
  width: 46px;
  height: 46px;
  place-items: center;
  place-content: center;
  color: #ffc857;
  font-size: 20px;
}
.item .arrow {
  display: flex;
  width: 46px;
  height: 46px;
  place-items: center;
  place-content: center;
  font-size: 20px;
}
#switch {
  width: 50px;
  height: 26px;
  border-radius: 13px;
  background-color: #ffc857;
  display: flex;
  padding: 2px;
  justify-content: flex-end;
}
#switch-btn {
  width: 22px;
  height: 22px;
  background-color: #fff;
  border-radius: 12.5px;
}
</style>