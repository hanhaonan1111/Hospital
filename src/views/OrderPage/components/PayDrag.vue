<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import { getMedicineBypPescriptionId, getAddress } from "@/services/medicines";
import type { medicineOrder, resGetAddress } from "@/types/payMedicines";
let route = useRoute();
let info = ref<medicineOrder>({} as medicineOrder);
let address = ref<resGetAddress>([] as resGetAddress);

let agree = ref(false); //用户协议

onBeforeMount(async () => {
  let id = route.query.id as string;
  let { data } = await getMedicineBypPescriptionId(id);
  let { data: addressRes } = await getAddress();
  address.value = addressRes[0];
  console.log();

  info.value = data;
});
</script>

<template>
  <div class="order-pay-page">
    <nav-bar title="药品支付" @onClickLeft="$router.back()" />
    <div class="order-address">
      <p class="area">
        <van-icon name="location" />
        <span>{{ address.city }} {{ address.county }}</span>
      </p>
      <p class="detail">{{ address.addressDetail }}</p>
      <p>{{ address.receiver }} {{ address.mobile }}</p>
    </div>
    <div class="order-medical">
      <div class="head">
        <h3>优医药房</h3>
        <small>优医质保 假一赔十</small>
      </div>
      <div
        class="item van-hairline--top"
        v-for="v in info.medicines"
        :key="v.id"
      >
        <img class="img" :src="v.avatar" alt="" />
        <div class="info">
          <p class="name">
            <span>{{ v.name }}</span>
            <span>x1</span>
          </p>
          <p class="size">
            <van-tag>{{
              v.prescriptionFlag === 1 ? "处方药" : "非处方药"
            }}</van-tag>
            <span>80ml</span>
          </p>
          <p class="price">￥{{ v.amount }}</p>
        </div>
        <div class="desc">￥{{ v.specs }}</div>
      </div>
    </div>
    <div class="order-detail">
      <van-cell-group>
        <van-cell title="药品金额" :value="'￥' + info.payment" />
        <van-cell title="运费" :value="'￥' + info.expressFee" />
        <van-cell title="优惠券" :value="`-￥${info.couponDeduction}`" />
        <van-cell
          title="实付款"
          :value="'￥' + info.actualPayment"
          class="price"
        />
      </van-cell-group>
    </div>
    <div class="order-tip">
      <p class="tip">
        由于药品的特殊性，如非错发、漏发药品的情况，药品一经发出
        不得退换，请核对药品信息无误后下单。
      </p>
      <van-checkbox v-model="agree"
        >我已同意<a href="javascript:;">支付协议</a></van-checkbox
      >
    </div>
    <van-submit-bar
      :price="info.payment * 100"
      button-text="立即支付"
      button-type="primary"
      text-align="left"
    ></van-submit-bar>
  </div>
</template>

<style lang="scss" scoped>
:deep(.van-nav-bar) {
  background-color: var(--cp-primary);
  .van-nav-bar__arrow,
  .van-nav-bar__title {
    color: #fff;
  }
}
:deep(.van-cell) {
  .van-cell__title {
    font-size: 16px;
  }
  .van-cell__value {
    font-size: 16px;
  }
  &.price {
    .van-cell__value {
      font-size: 18px;
      color: var(--cp-price);
    }
  }
}
:deep(.van-submit-bar) {
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  .van-button {
    width: 200px;
  }
}
.order-pay-page {
  padding: 46px 0 65px;
  overflow: scroll;
  height: 100vh;
}
.order-address {
  padding: 15px 15px 0 15px;
  background-color: #fff;
  font-size: 13px;
  .area {
    color: var(--cp-tag);
    margin-bottom: 5px;
    .van-icon-location {
      color: #ff7702;
      font-size: 14px;
    }
  }
  .detail {
    font-size: 17px;
    margin-bottom: 5px;
  }
  &::after {
    content: "";
    display: block;
    height: 12px;
    background-color: var(--cp-bg);
    margin: 0 -15px;
    margin-top: 15px;
  }
}

.order-medical {
  background-color: #fff;
  padding: 0 15px;
  .head {
    display: flex;
    height: 54px;
    align-items: center;
    > h3 {
      font-size: 16px;
      font-weight: normal;
    }
    > small {
      font-size: 13px;
      color: var(--cp-tag);
      margin-left: 10px;
    }
  }
  .item {
    display: flex;
    flex-wrap: wrap;
    padding: 15px 0;
    .img {
      width: 80px;
      height: 70px;
      border-radius: 2px;
      overflow: hidden;
    }
    .info {
      padding-left: 15px;
      width: 250px;
      .name {
        display: flex;
        font-size: 15px;
        margin-bottom: 5px;
        > span:first-child {
          width: 200px;
        }
        > span:last-child {
          width: 50px;
          text-align: right;
        }
      }
      .size {
        margin-bottom: 5px;
        .van-tag {
          background-color: var(--cp-primary);
          vertical-align: middle;
        }
        span:not(.van-tag) {
          margin-left: 10px;
          color: var(--cp-tag);
          vertical-align: middle;
        }
      }
      .price {
        font-size: 16px;
        color: #eb5757;
      }
    }
    .desc {
      width: 100%;
      background-color: var(--cp-bg);
      border-radius: 4px;
      margin-top: 10px;
      padding: 4px 10px;
      color: var(--cp-tip);
    }
  }
}
.order-tip {
  padding: 0 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 120px;
  .tip {
    font-size: 12px;
    color: var(--cp-tag);
    width: 100%;
    &::before {
      content: "*";
      color: var(--cp-price);
      font-size: 14px;
    }
    margin-bottom: 30px;
  }
  .van-checkbox {
    a {
      color: var(--cp-primary);
    }
  }
}
</style>
 