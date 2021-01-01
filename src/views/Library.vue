<template>
  <div>
    <div class="playlist-items">
      <p class="titles">listening history</p>
    </div>
    <div class="playlist-items">
      <p class="titles">your playlists</p>
    </div>
    <div class="playlist-items">
      <p class="titles">liked songs</p>
    </div>
  </div>
</template>
<style scoped>
.playlist-items{
  padding: 0 8px 0 8px;
  display: flex;
  align-items: center;
  height: 38px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}
.titles{
  text-transform: capitalize;
}
</style>
