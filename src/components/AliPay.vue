<template>
  <p class="amount">￥{{ money }}</p>
  <van-cell-group>
    <van-cell title="支付宝支付">
      <template #icon><Icon name="consult-alipay" /></template>
      <template #extra
        ><van-checkbox :disabled="true" :modelValue="true"
      /></template>
    </van-cell>
    <div class="btn">
      <van-button type="primary" round block @click="immediatePay">
        立即支付</van-button
      >
    </div>
  </van-cell-group>
</template>

<script setup lang="ts">
import { payImmediateParams } from "@/services/consult";
let props =
  defineProps<{ orderId: string; payCallback: string; money: number }>();

async function immediatePay() {
  let { data } = await payImmediateParams({
    orderId: props.orderId,
    payCallback: props.payCallback,
    paymentMethod: 1,
  });
  location.href = data.payUrl;
}
</script>
 
<style lang="scss">
.amount {
  padding: 20px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
}
.btn {
  padding: 15px;
}
.van-cell {
  align-items: center;
  .cp-icon {
    margin-right: 10px;
    font-size: 18px;
  }
  .van-checkbox :deep(.van-checkbox__icon) {
    font-size: 16px;
  }
}
</style>