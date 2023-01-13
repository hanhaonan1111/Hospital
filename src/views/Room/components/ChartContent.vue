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
          <van-image fit="contain" :src="v.msg?.url" @load="loadSuccess" />
        </div>
        <van-image
          src="https://avatars.githubusercontent.com/u/111566162?s=96&v=4"
        />
      </div>
      <div class="msg msg-from" v-else>
        <van-image
          src="https://cp.itheima.net/assets/avatar-doctor.6cf240f4.svg"
        />
        <div class="content">
          <div class="time">{{ v.createTime?.split(" ")[1] }}</div>
          <van-image
            fit="contain"
            :src="v.msg.picture?.url"
            @load="loadSuccess"
          />
        </div>
      </div>
    </template>

    <template v-else-if="v.msgType === 22">
      <div class="msg msg-recipe">
        <div class="content" v-if="v.msg.prescription">
          <div class="head van-hairline--bottom">
            <div class="head-tit">
              <h3>电子处方</h3>
              <p @click="lookMedicine(v)">
                原始处方
                <van-icon name="arrow"></van-icon>
              </p>
            </div>
            <p>
              {{ v.msg.prescription.name }}
              {{ v.msg.prescription.genderValue }}
              {{ v.msg.prescription.age }}岁
              {{ v.msg.prescription.diagnosis }}
            </p>
            <p>开方时间：{{ v.msg.prescription.createTime }}</p>
          </div>
          <div class="body">
            <div
              class="body-item"
              v-for="med in v.msg.prescription.medicines"
              :key="med.id"
            >
              <div class="durg">
                <p>{{ med.name }} {{ med.specs }}</p>
                <p>{{ med.usageDosag }}</p>
              </div>
              <div class="num">{{ med.quantity }}</div>
            </div>
          </div>
          <div class="foot">
            <span @click="buy(v.msg.prescription)">购买药品</span>
          </div>
        </div>
      </div>
    </template>
    <!--  23 || 24 时显示 -->
    <evaluate-card
      v-else-if="v.msgType === 23 || v.msgType === 24"
      :evaluateData="v"
    />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { nextTick, onMounted, watch } from "@vue/runtime-core";
import Card from "./Card.vue";
import RoomMeg from "./RoomMeg.vue";
import { lookMedision } from "@/services/consult";
import { ImagePreview, showImagePreview, showToast } from "vant";
import router from "@/router";
import evaluateCard from "./evaluateCard.vue";

let props = defineProps<{ charList: any }>();

async function loadSuccess() {
  await nextTick();
  let dment = document.querySelector(".charList");
  dment?.scrollTo(0, dment.scrollHeight);
}
let route = useRoute();
async function lookMedicine(data: any) {
  let {
    data: { url },
  } = await lookMedision(data.msg.prescription.id);
  showImagePreview([url]);
}

function buy(data: any) {
  console.log(data);

  if (!data) {
    return;
  } else if (data.status === 3) return showToast("处方已失效");
  else if (data.status === 1 && data.orderId === null) {
    // 未付款 没有订单id =>预支付页面
    router.push("/order/pay?id=" + data.id);
  } else if (data.status === 1 && data.orderId) {
    // 未付款 且有订单id=>去订单列表页面
    router.push("/order/" + data.orderId);
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/root.scss";
.msg.msg-illness {
  margin-top: 10px !important;
}

.evalutate-card {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  padding: 15px;
  .title {
    font-size: 15px;
    margin-bottom: 5px;
  }
  .desc {
    font-size: 12px;
    margin-bottom: 15px;
    color: var(--cp-tip);
  }
  .van-field {
    background-color: var(--cp-bg);
    margin: 15px 0;
    border-radius: 8px;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    ::v-deep() {
      .van-checkbox {
        .van-icon {
          font-size: 12px;
        }
        &__label {
          font-size: 12px;
          color: var(--cp-tip);
        }
        height: 16px;
      }
      .van-button {
        padding: 0 16px;
        &.disabled {
          opacity: 1;
          background: #fafafa;
          color: #d9dbde;
          border: #fafafa;
        }
      }
    }
  }
}
</style>
 