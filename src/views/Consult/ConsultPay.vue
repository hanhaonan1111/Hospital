<script setup lang="ts">
import {
  findPatientById,
  getOrderId,
  payImmediateParams,
  PreOrder as PreOrderApi,
} from "@/services/consult";
import { onMounted, ref } from "vue";
import { useConsultStore } from "@/stores/index";
import type { Patient } from "@/types/user";
import { Gender } from "@/enums/consult";
import { showConfirmDialog, showDialog, showToast, Toast } from "vant";
import router from "@/router";
import { onBeforeRouteLeave } from "vue-router";

let { params, clearData } = useConsultStore();
let actual = ref(0);
async function payOrder() {
  let query = { type: params.type!, illnessType: params.illnessType };
  let { data } = await PreOrderApi(query);
  actual.value = data.actualPayment;
}
let patientInfo = ref<Patient>({} as Patient);
async function getPatientData() {
  let { data } = await findPatientById(params.patientId!);
  patientInfo.value = { ...data };
}
onMounted(() => {
  if (
    params.type === undefined ||
    params.illnessType === undefined ||
    params.illnessDesc === undefined
  ) {
    // 页面缺少必要的参数,不能正常渲染
    showDialog({
      title: "温馨提示",
      message: "订单部分参数丢失,请重新填写问诊信息!",
    }).then(() => {
      router.push("/");
    });

    return;
  }
  payOrder();
  getPatientData();
});

let aggree = ref(true);
let payBox = ref(false);
let orderId = ref<undefined | string>();
async function goPayOrder() {
  if (!aggree.value) {
    return showToast("请勾选用户协议!");
  }
  // 生成订单ID
  let { data } = await getOrderId(params);
  orderId.value = data.id;
  // 选择支付方式
  payBox.value = true;
  // 清除清单之前保存的信息
  clearData();
}

let beforeClose = () => {
  showConfirmDialog({
    title: "关闭支付提示",
    message: "取消支付将无法前往问诊,您确定要关闭吗?",
    confirmButtonText: "仍要取消",
    confirmButtonColor: "red",
    cancelButtonText: "继续支付",
  }).then(() => {
    orderId.value = undefined;
    router.replace("/user/consult");
  });
  return false;
};
onBeforeRouteLeave(() => {
  if (orderId.value !== undefined) {
    return false;
  }
});
let payType = ref(true);
</script>

<template>
  <div class="consult-pay-page">
    <nav-bar title="支付" @click-left="$router.back()" />
    <div class="pay-info">
      <p class="tit">图文问诊 {{ actual }} 元</p>
      <img class="img" src="@/assets/avatar-doctor.svg" />
      <p class="desc">
        <span>极速问诊</span>
        <span>自动分配医生</span>
      </p>
    </div>
    <van-cell-group>
      <van-cell title="优惠券" value="-0.00" />
      <van-cell title="积分抵扣" value="-0.00" />
      <van-cell title="实付款" :value="actual" class="pay-price" />
    </van-cell-group>
    <div class="pay-space"></div>
    <van-cell-group>
      <van-cell
        title="患者信息"
        v-if="patientInfo.name"
        :value="
          patientInfo.name +
          '  |  ' +
          Gender[patientInfo.gender] +
          '  |  ' +
          patientInfo.age +
          '岁'
        "
      ></van-cell>
      <van-cell title="病情描述" label="头痛，头晕，恶心"></van-cell>
    </van-cell-group>
    <div class="pay-schema">
      <van-checkbox v-model="aggree"
        >我已同意 <span class="text">支付协议</span></van-checkbox
      >
    </div>
    <van-submit-bar
      button-type="primary"
      :price="actual * 100"
      button-text="立即支付"
      text-align="left"
      @click="goPayOrder"
    />
  </div>
  <van-action-sheet
    v-model:show="payBox"
    title="选择支付方式"
    :closeable="false"
    :before-close="beforeClose"
    :close-on-popstate="false"
  >
    <ali-pay
      :orderId="orderId"
      payCallback="http://localhost:5173/room"
      :money="actual"
    ></ali-pay>
  </van-action-sheet>
</template>

<style lang="scss" scoped>
.pay-type {
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
}
::v-deep() {
  .van-submit-bar__button {
    font-weight: normal;
    width: 160px;
  }
}
.pay-schema {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  .text {
    color: var(--cp-primary);
  }
}
.consult-pay-page {
  padding: 46px 0 50px 0;
}
.pay-info {
  display: flex;
  padding: 15px;
  flex-wrap: wrap;
  align-items: center;
  .tit {
    width: 100%;
    font-size: 16px;
    margin-bottom: 10px;
  }
  .img {
    margin-right: 10px;
    width: 38px;
    height: 38px;
    border-radius: 4px;
    overflow: hidden;
  }
  .desc {
    flex: 1;
    > span {
      display: block;
      color: var(--cp-tag);
      &:first-child {
        font-size: 16px;
        color: var(--cp-text2);
      }
    }
  }
}
.pay-price {
  ::v-deep() {
    .vam-cell__title {
      font-size: 16px;
    }
    .van-cell__value {
      font-size: 16px;
      color: var(--cp-price);
    }
  }
}
.pay-space {
  height: 12px;
  background-color: var(--cp-bg);
}
</style>
