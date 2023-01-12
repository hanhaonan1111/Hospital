<template>
  <div class="room-box">
    <nav-bar title="问诊室" />
    <room-status></room-status>
    <card />
    <RoomMeg></RoomMeg>
    <RoomActions />
  </div>
</template>

<script setup lang="ts">
import Card from "./components/Card.vue";
import RoomActions from "./components/RoomActions.vue";
import RoomMeg from "./components/RoomMeg.vue";
import RoomStatus from "./components/RoomStatus.vue";
</script>


<style lang="scss">
.room-box {
  background-color: #f7f7f7;
  height: 100vh;
}
</style>
 
 