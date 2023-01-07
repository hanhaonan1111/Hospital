<script setup lang="ts">
import { useUserStore } from "@/stores";
let store = useUserStore();
store.setUser({ token: "abc1234565" });
</script>

<template>
  <!-- 验证vant颜色被覆盖 -->
  <van-button type="primary"> 按钮</van-button>
</template>

<style scoped lang="scss">
</style>
