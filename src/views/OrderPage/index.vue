<script setup lang="ts">
import type { Type } from "@/enums/consult";
import consultList from "./components/OrderItem.vue";
import { ref } from "vue";
let status = ref<Type>(0);
</script>

<template>
  <div class="consult-page">
    <nav-bar title="问诊记录" @onClickLeft="() => $router.back()" />
    <van-tabs sticky v-model:active="status">
      <van-tab title="极速问诊"><consultList :type="2" /></van-tab>
      <van-tab title="找医生"><consultList :type="1" /></van-tab>
      <van-tab title="开药问诊"><consultList :type="3" /></van-tab>
    </van-tabs>
  </div>
</template>

<style lang="scss" scoped>
.consult-page {
  padding-top: 46px;
  background-color: var(--cp-bg);
  min-height: calc(100vh - 46px);
}
.consult-list {
  padding: 10px 15px;
}
</style>