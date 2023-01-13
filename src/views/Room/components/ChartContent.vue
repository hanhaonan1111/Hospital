<template>
  <!-- 消息的类型1文字
21卡片-患者病情 22卡片-处方信息 23未提交评价24已提交评价
31通知-普通通知（白底黑色）32通知-温馨提示33通知-订单取消（灰色底黑字）4图片 -->
  <div v-for="(v, i) in charList" :key="i">
    <card v-if="v.msgType === 21" :msg="v.msg" />
    <!-- 各样的提示框栏目 -->
    <RoomMeg
      v-else-if="v.msgType === 31 || v.msgType === 32"
      :type="v.msgType"
      :msg="v.msg"
    ></RoomMeg>

    <template v-else-if="v.msgType === 1">
      <!-- Right -->
      <div class="msg msg-to" v-if="v.to === '1'">
        <div class="content">
          <div class="time">{{ v.createTime?.split(" ")[1] }}</div>
          <div class="pao">{{ v.msg.content }}</div>
        </div>
        <van-image
          src="https://avatars.githubusercontent.com/u/111566162?s=96&v=4"
        />
      </div>
      <!-- Left -->
      <div class="msg msg-from" v-else>
        <van-image
          src="https://cp.itheima.net/assets/avatar-doctor.6cf240f4.svg"
        />
        <div class="content">
          <div class="time">{{ v.createTime?.split(" ")[1] }}</div>
          <div class="pao">{{ v.msg.content }}</div>
        </div>
      </div>
    </template>

    <template v-else-if="v.msgType === 4">
      <!-- 有bug -->
      <div class="msg msg-to" v-if="v.to == '1'">
        <div class="content">
          <div class="time">{{ v.createTime?.split(" ")[1] }}</div>
          <van-image fit="contain" :src="v.msg?.url" />
        </div>
        <van-image
          src="https://avatars.githubusercontent.com/u/111566162?s=96&v=4"
        />
      </div>
      <div class="msg msg-from" v-else>
        <!-- {{ v.msg.picture.url }} -->
        <van-image
          src="https://cp.itheima.net/assets/avatar-doctor.6cf240f4.svg"
        />
        <div class="content">
          <div class="time">{{ v.createTime?.split(" ")[1] }}</div>
          <van-image fit="contain" :src="v.msg.picture?.url" />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from "@vue/runtime-core";
import Card from "./Card.vue";
import RoomMeg from "./RoomMeg.vue";

let props = defineProps<{ charList: any }>();

watch(
  () => props.charList,
  () => {
    console.log(props.charList);
  }
);
onMounted(() => {
  console.log("底部");

  let dment = document.querySelector(".room-box");
  dment?.scrollTo(0, dment.scrollHeight);
});
</script>

<style lang="scss" scoped>
@import "@/styles/root.scss";
.msg.msg-illness {
  margin-top: 95px !important;
}
</style>