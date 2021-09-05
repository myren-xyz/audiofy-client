<template>
    <div class="aslider">
        <slot></slot>
    </div>
</template>

<style scoped>
.aslider {
  width: 100%;
  display: flex;
  overflow-x: scroll;
  padding: 8px 0 16px 0;
  margin-bottom: 16px;
}
@media screen and (min-width:728px){
  .aslider::-webkit-scrollbar{
    background-color: #1B1A18;
    height: 8px;
  }
  .aslider::-webkit-scrollbar-button{
    display: none;
  }
  .aslider::-webkit-scrollbar-track-piece{
    border-radius: 4px;
  }
  .aslider::-webkit-scrollbar-thumb{
    background-color: rgb(46, 46, 46);
    border-radius: 4px;
  }
}
</style>