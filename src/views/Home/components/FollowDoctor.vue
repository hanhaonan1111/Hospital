<script setup lang="ts">
import { ref, computed } from "vue";
import DoctorCard from "./DoctorCard.vue";
import { useWindowSize } from "@vueuse/core";
let { width } = useWindowSize();

let useWith = computed(() => {
  return width.value * (150 / 375);
});
</script>

<template>
  <div class="follow-doctor">
    <div className="head">
      <p>推荐关注</p>
      <a href="javascript:;"> 查看更多<i class="van-icon van-icon-arrow" /></a>
    </div>
    <div class="body">
      <van-swipe :loop="false" :show-indicators="false" :width="useWith">
        <van-swipe-item v-for="item in 8" :key="item">
          <DoctorCard></DoctorCard>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.follow-doctor {
  background-color: var(--cp-bg);
  height: 250px;
  .head {
    display: flex;
    justify-content: space-between;
    height: 45px;
    align-items: center;
    padding: 0 15px;
    font-size: 13px;
    > a {
      color: var(--cp-tip);
    }
  }
  .body {
    width: 100%;
    overflow: hidden;
  }
}
</style>