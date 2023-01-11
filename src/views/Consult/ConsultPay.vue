<script setup lang="ts">
import { findPatientById, PreOrder as PreOrderApi } from "@/services/consult";
import { onMounted, ref } from "vue";
import { useConsultStore } from "@/stores/index";
import type { Patient } from "@/types/user";
import { Gender } from "@/enums/consult";
import { showToast, Toast } from "vant";
let { params } = useConsultStore();
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
  payOrder();
  getPatientData();
});

let aggree = ref(true);

function goPayOrder() {
  if (!aggree.value) {
    return showToast("请勾选用户协议!");
  }
}
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
      :price="2900"
      button-text="立即支付"
      text-align="left"
      @click="goPayOrder"
    />
  </div>
</template>

<style lang="scss" scoped>
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
