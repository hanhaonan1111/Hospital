<script lang="ts" setup>
import { followDoc } from "@/services/home";
import type { Doctor } from "@/types/home";
import { ref } from "vue";
defineProps<{ detail: Doctor }>();
let emit = defineEmits<{ (e: "asyncGetList"): void }>();
let clicked = ref(false);
let load = ref(false);
async function followDoctor(id: string) {
  load.value = true;
  clicked.value = !clicked.value;
  await followDoc({
    type: "doc",
    id,
  });
  load.value = false;
}
</script>
<template>
  <div class="doctor-card">
    <van-image round :src="detail.avatar" />
    <p class="name">{{ detail.name }}</p>
    <p class="van-ellipsis">{{ detail.hospitalName }} {{ detail.depName }}</p>
    <p>{{ detail.positionalTitles }}</p>
    <van-button
      round
      size="small"
      type="primary"
      @click="followDoctor(detail.id)"
      :disabled="load"
    >
      <van-loading size="20" type="spinner" color="white" v-if="load" />
      <span v-else>{{
        clicked === false ? "+ 关注" : "已关注"
      }}</span></van-button
    >
  </div>
</template>
<style scoped lang="scss" >
.doctor-card {
  width: 135px;
  height: 190px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0px 0px 11px 0px rgba(229, 229, 229, 0.2);
  text-align: center;
  padding: 15px;
  margin-left: 15px;
  display: inline-block;
  box-sizing: border-box;
  > .van-image {
    width: 58px;
    height: 58px;
    vertical-align: top;
    border-radius: 50%;
    margin: 0 auto 8px;
  }
  > p {
    margin-bottom: 0;
    font-size: 11px;
    color: var(--cp-tip);
    &.name {
      font-size: 13px;
      color: var(--cp-text1);
      margin-bottom: 5px;
    }
  }
  > .van-button {
    padding: 0 12px;
    height: 28px;
    margin-top: 8px;
    width: 72px;
  }
}
</style>
