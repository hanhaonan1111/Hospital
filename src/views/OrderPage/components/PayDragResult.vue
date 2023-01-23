<script setup lang="ts">
import { getMedicineInfo } from "@/services/medicines";
import type { OrderInfoMedicine } from "@/types/payMedicines";
import { onBeforeMount } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { useDragInfo } from "@/composable";
let orderId = useRoute().query.orderId as string;
let { detail } = useDragInfo(orderId);
</script>

<template>
  <div
    class="order-pay-result-page"
    v-if="detail && detail.status === 10 && orderId.length > 0"
  >
    <nav-bar title="药品支付结果" />
    <div class="result">
      <van-icon name="clear" />
      <p class="price">￥ {{ detail.actualPayment }}</p>
      <p class="status">支付失败</p>
      <p class="tip">订单支付失败，已通知药房尽快发出， 请耐心等待~</p>
      <div class="btn">
        <van-button type="primary" :to="`/order/${detail.id}`"
          >查看订单</van-button
        >
        <van-button :to="'/room?orderId=' + detail?.roomId"
          >返回诊室</van-button
        >
      </div>
    </div>
  </div>
  <div class="result" v-else>
    <van-icon name="checked" />
    <p class="price">￥ {{ detail?.actualPayment }}</p>
    <p class="status">支付成功</p>
    <p class="tip">订单支付成功，已通知药房尽快发出， 请耐心等待~</p>
    <div class="btn">
      <van-button type="primary" :to="`/order/${detail?.id}`"
        >查看订单</van-button
      >
      <van-button :to="`/room?orderId=${detail?.roomId}`">返回诊室</van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.order-pay-result-page {
  padding-top: 46px;
}
.result {
  display: flex;
  flex-direction: column;
  align-items: center;
  .van-icon {
    font-size: 75px;
    color: var(--cp-primary);
    margin-top: 60px;
  }
  .price {
    font-size: 22px;
    margin-top: 10px;
  }
  .status {
    color: var(--cp-text3);
  }
  .tip {
    color: var(--cp-tip);
    width: 240px;
    text-align: center;
    margin-top: 20px;
  }
  .btn {
    margin-top: 60px;
    .van-button--primary {
      margin-right: 20px;
    }
  }
  &.error {
    .van-icon {
      color: var(--cp-price);
    }
  }
}
</style>
