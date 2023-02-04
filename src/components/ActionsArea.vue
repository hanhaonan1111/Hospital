<template>
  <div class="foot" v-if="statusValue === '待支付'">
    <van-button class="gray" plain size="small" round @click="cancle(info)"
      >取消问诊
    </van-button>
    <van-button
      type="primary"
      plain
      size="small"
      round
      :to="`/consult/payDetail/${info.id}`"
    >
      去支付
    </van-button>
  </div>
  <div class="foot" v-if="statusValue === '待接诊'">
    <van-button
      class="gray"
      plain
      size="small"
      round
      @click="() => cancle(info)"
      >取消问诊</van-button
    >
    <van-button
      type="primary"
      plain
      size="small"
      round
      :to="`/room?orderId=${info.id}`"
    >
      继续沟通
    </van-button>
  </div>
  <div class="foot" v-if="statusValue === '咨询中'">
    <van-button
      v-if="info.prescriptionId"
      class="gray"
      plain
      size="small"
      round
      @click="LookMedision(info.prescriptionId)"
    >
      查看处方
    </van-button>
    <van-button
      type="primary"
      plain
      size="small"
      round
      :to="`/room?orderId=${info.id}`"
    >
      继续沟通
    </van-button>
  </div>
  <div class="foot" v-if="statusValue === '已完成'">
    <div class="more">
      <van-popover
        placement="top-start"
        :show="showPopover === info.id"
        @update:show="changeStatus(info.id)"
        :actions="actions(info)"
        @select="select"
      >
        <template #reference>更多</template>
      </van-popover>
    </div>
    <van-button
      class="gray"
      plain
      size="small"
      round
      :to="`/room?orderId=${info.id}`"
    >
      问诊记录
    </van-button>
    <van-button
      v-if="
        info.evaluateFlag != 1 ||
        (info.evaluateId && info.evaluateId === undefined)
      "
      type="primary"
      plain
      size="small"
      round
      :to="`/room?orderId=${info.id}`"
    >
      去评价
    </van-button>
    <van-button
      v-else
      class="gray"
      plain
      size="small"
      round
      :to="`/room?orderId=${info.id}`"
    >
      查看评价
    </van-button>
  </div>
  <div class="foot" v-if="statusValue === '已取消'">
    <van-button class="gray" plain size="small" round @click="Del(info.id)"
      >删除订单</van-button
    >
    <van-button type="primary" plain size="small" round to="/"
      >咨询其他医生</van-button
    >
  </div>
</template>

<script setup lang="ts">
import { usePreviewImg } from "@/composable";

import { Cancel, DeleteOrder, orderList } from "@/services/consult";
import type { Row } from "@/types/orderList";
import { showImagePreview, showSuccessToast } from "vant";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
let route = useRoute();
let router = useRouter();
defineProps<{ statusValue: string; info: any }>();

async function cancle(data: any) {
  await Cancel(data.id);
  showSuccessToast("已取消");
  data.status = 5;
  data.statusValue = "已取消";
}
async function LookMedision(id: any) {
  usePreviewImg(id);
}
let showPopover = ref("");

function changeStatus(val: any) {
  showPopover.value = val;
}
let list = ref<Row[]>([]);

function fetchData(id: string) {
  list.value = list.value.filter((v) => v.id !== id);
}
let medisionId = ref("");
async function Del(id: string) {
  await DeleteOrder(id);
  let detailId = route.params.id;
  console.log(detailId);

  showSuccessToast("已删除!");
  if (detailId) {
    router.replace("/user/consult");
    return;
  }
  fetchData(id);
}
async function select(val: any) {
  if (val.id === 1) {
    usePreviewImg(val.prescriptionId.prescriptionId);
  } else {
    Del(showPopover.value);
  }
}
let actions = (v: any) => {
  if (v.prescriptionId) {
    return [
      { text: "查看处方", id: 1, prescriptionId: v },
      { text: "删除订单", id: 2 },
    ];
  } else {
    return [{ text: "删除订单", id: 2 }];
  }
};
</script>

<style lang="scss" scoped>
</style>