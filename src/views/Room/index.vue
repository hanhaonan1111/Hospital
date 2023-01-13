<template>
  <div class="room-box">
    <!-- 导航栏 -->
    <nav-bar title="问诊室" :onClickLeft="() => $router.back()" />
    <!-- 顶部Tab栏动态显示的状态 -->
    <room-status :status="status"></room-status>
    <!-- 聊天记录栏目 -->
    <div class="charList">
      <van-pull-refresh
        v-model="loading"
        success-text="刷新成功"
        @refresh="loadBeforeList"
      >
        <ChartContent :charList="charList" />
      </van-pull-refresh>
    </div>
    <!-- 底部输入框 -->
    <RoomActions
      @EmitData="EmitData"
      :status="status.status"
      @sendImg="sendImg"
    />
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
import { getOrderDetailAsync } from "@/services/consult";
import { showToast } from "vant";
let socket: Socket;

let router = useRoute();
let { user } = useUserStore();
let charList = ref<any>([]);
onUnmounted(() => {
  socket.close();
});
let status = ref({});
async function getOrderDetail() {
  let { data } = await getOrderDetailAsync(router.query.orderId as string);
  console.log(data, "DATA");

  status.value = data;
}

onMounted(async () => {
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
    charList.value = [];
  });
  socket.on("chatMsgList", async (res) => {
    let data = res.data;
    // 获取历史记录
    if (data.length === 0) {
      showToast("没有聊天记录了");
      return;
    }
    let li: any = [];
    data?.forEach((val: any) => {
      li.push(...val.items);
    });

    if (charList.value.length > 0) {
      charList.value = [...li, ...charList.value];
    } else {
      charList.value = li;
      await nextTick();
      let dment = document.querySelector(".charList");
      dment?.scrollTo(0, dment.scrollHeight);
    }
  });

  socket.on("receiveChatMsg", (e) => {
    // 接受发送成功的消息或者是接受医生发来的消息
    charList.value.push(e);
    nextTick(() => {
      let dment = document.querySelector(".charList");
      dment?.scrollTo(0, dment.scrollHeight);
    });
  });

  socket.on("statusChange", async (e) => {
    await getOrderDetail();
  });
  getOrderDetail();
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
function sendImg(data: any) {
  let query = {
    from: "199",
    msg: data,
    msgType: 4,
    to: "1",
  };
  socket.emit("sendChatMsg", query);
}
let loading = ref(false);
function loadBeforeList() {
  let lastTime = charList.value[0].createTime;
  socket.emit("getChatMsgList", 10, lastTime, router.query.orderId);
  loading.value = false;
}
</script>
<style lang="scss">
.room-box {
  background-color: #f7f7f7;
  height: 530px;
  margin-bottom: 60px;
  margin-top: 85px;
  overflow-y: scroll;
}
.charList {
  overflow: auto;
  height: 100%;
}
</style>
 
 