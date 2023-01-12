<template>
  <div class="room-box">
    <!-- 导航栏 -->
    <nav-bar title="问诊室" />
    <!-- 顶部Tab栏动态显示的状态 -->
    <room-status></room-status>
    <!-- 聊天记录栏目 -->
    <ChartContent :charList="charList" />
    <!-- 底部输入框 -->
    <RoomActions @EmitData="EmitData" />
  </div>
</template>

<script setup lang="ts">
import ChartContent from "./components/ChartContent.vue";
import RoomActions from "./components/RoomActions.vue";
import RoomMeg from "./components/RoomMeg.vue";
import RoomStatus from "./components/RoomStatus.vue";
import { ref } from "vue";
// 即时通信
import { io, Socket } from "socket.io-client";
import { nextTick, onMounted, onUnmounted, onUpdated } from "@vue/runtime-core";
import { baseURL } from "@/utils/http";
import { useUserStore } from "@/stores/index";
import { useRoute } from "vue-router";
import type { Datum, Item } from "@/types/chat";
let socket: Socket;

let router = useRoute();
let { user } = useUserStore();
let charList = ref<any>([]);
onUnmounted(() => {
  socket.close();
});
onMounted(() => {
  socket = io(baseURL, {
    auth: {
      token: `Bearer ${user?.token}`,
    },
    query: {
      orderId: router.query.orderId,
    },
  });
  socket.on("connect", () => {
    //链接成功之后回调
    console.log("链接成功");
  });
  socket.on("disconnect", () => {
    //链接关闭之后回调
  });
  socket.on("chatMsgList", ({ data }: { data: any }) => {
    // 获取历史记录
    const li: any = [];
    data?.forEach((val: any) => {
      li.push(...val.items);
    });
    charList.value = [...li, charList.value];
  });
  socket.on("receiveChatMsg", (e) => {
    // 接受发送成功的消息或者是接受医生发来的消息
    charList.value.push(e);
    nextTick(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  });
});
function EmitData(val: string) {
  let query = {
    from: "199",
    msg: {
      content: val,
    },
    msgType: 1,
    to: "1",
  };
  socket.emit("sendChatMsg", query);
}
</script>


<style lang="scss">
.room-box {
  background-color: #f7f7f7;
  height: 100%;
  margin-bottom: 60px;
}
</style>
 
 