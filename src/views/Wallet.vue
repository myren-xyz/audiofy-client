<template>
  <div class="wallet">
    <div class="coin">
      <div class="coin-inner">
        <div class="coin-l">
          <div class="round">
            <strike><h4>Basil</h4></strike>
          </div>
        </div>
        <div class="coin-r"><p>0.0bzl</p><p>0.0USD</p></div>
      </div>
    </div>
    <div class="coin">
      <div class="coin-inner">
        <div class="coin-l">
          <div class="round green">
            <strike><h4>USDT</h4></strike>
          </div>
        </div>
        <div class="coin-r"><p>0.0USDT</p><p>0.0USD</p></div>
      </div>
    </div>
    <p class="to" align="center"> Ads reward distribution starts after "Cyrus Phase" in roadmap below</p>
    <a href="https://roadmap.myren.xyz">roadmap.myren.xyz</a>
  </div>
</template>
<style scoped>
.to{
  margin: 64px auto 0;
  width: 80%;
}
a{
  text-align: center;
  display: block;
  margin-top: 8px;
  text-decoration: underline;
  color: rgb(110, 110, 255);
}
.coin{
  margin-top: 16px;
  margin-bottom: 16px;
  padding: 8px;
}
.coin-inner{
  display: flex;
}
.coin-inner div{
  width: 50%;
}
.coin-r{
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: right;
  color: #949494
}
.round{
  width: 90px;
  height: 90px;
  background-color: #eee;
  border-radius: 50%;
  display: flex;
  place-items: center;
  place-content: center;
}
.round h4{
  color: #2a2a2a
}
.green{
  background-color: rgb(77, 211, 133);
}
</style>
