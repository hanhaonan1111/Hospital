<script setup lang="ts">
import { getOrderDetailAsync } from "@/services/consult";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import ActionsArea from "@/components/ActionsArea.vue";
let info = ref();
onBeforeMount(async () => {
  let router = useRoute();
  let id = router.params.id;
  if (id) {
    let { data } = await getOrderDetailAsync(id as string);
    info.value = data;
  }
});
</script>

<template>
  <div class="consult-detail-page" v-if="info">
    <nav-bar title="问诊详情" @click="$router.back()" />
    <div class="content">
      <div class="detail-head">
        <div class="text">
          <h3>图文问诊{{ info.payment }} 元</h3>
          <span class="sta green">{{ info.statusValue }}</span>
          <p class="tip">服务医生信息</p>
        </div>
        <div class="card">
          <img class="avatar" src="@/assets/avatar-doctor.svg" alt="" />
          <p class="doc">
            <span>极速问诊</span>
            <span>自动分配医生</span>
          </p>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="detail-patient">
        <van-cell-group :border="false">
          <van-cell
            title="患者信息"
            :value="
              info.patientInfo.name +
              ' ' +
              info.patientInfo.genderValue +
              ' ' +
              info.patientInfo.age +
              '岁'
            "
          />
          <van-cell title="患病时长" value="一周内" />
          <van-cell title="就诊情况" value="未就诊过" />
          <van-cell title="病情描述" label="头痛，头晕，恶心" />
        </van-cell-group>
      </div>
      <div class="detail-order">
        <h3>订单信息</h3>
        <van-cell-group :border="false">
          <van-cell title="订单编号">
            <template #value>
              <span class="copy">复制</span>
              {{ info.orderNo }}
            </template>
          </van-cell>
          <van-cell title="创建时间" :value="info.createTime" />
          <van-cell title="应付款" :value="'￥' + info.payment" />
          <van-cell title="优惠券" value="-￥0" />
          <van-cell title="积分抵扣" value="-￥0" />
          <van-cell title="实付款" :value="'￥' + info.payment" class="price" />
        </van-cell-group>
      </div>
      <div class="detail-action van-hairline--top">
        <div class="price" v-if="info.statusValue === '待支付'">
          <span>需付款</span>
          <span>￥{{ info.payment }}</span>
        </div>
        <div class="add">
          <actions-area
            :status-value="info.statusValue"
            :info="info"
          ></actions-area>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.add {
  width: 70%;
}

:deep(.add) {
  .foot {
    display: flex;
    justify-content: space-around;
    align-items: center;
    button {
      height: 45px;
      font-size: 17px;
    }
  }
}
.consult-detail-page {
  padding: 46px 0 110px 0;
}
.content {
  height: 100vh;
  overflow: scroll;
}
.detail-head {
  height: 140px;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 135px;
    background: linear-gradient(
      180deg,
      rgba(44, 181, 165, 0),
      rgba(44, 181, 165, 0.2)
    );
    border-bottom-left-radius: 150px 20px;
    border-bottom-right-radius: 150px 20px;
  }
  padding: 15px;
  .text {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px 3px;
    .sta {
      color: var(--cp-tag);
      font-weight: 500;
      font-size: 16px;
      &.green {
        color: var(--cp-primary);
      }
      &.orange {
        color: #f2994a;
      }
    }
    .tip {
      width: 100%;
      color: var(--cp-text3);
      margin-top: 5px;
    }
  }
  .card {
    height: 74px;
    background-color: #fff;
    border-radius: 8px;
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 15px;
    box-shadow: 0px 0px 22px 0px rgba(229, 229, 229, 0.5);
    .avatar {
      width: 38px;
      height: 38px;
    }
    .doc {
      flex: 1;
      padding-left: 15px;
      > span {
        display: block;
        font-size: 16px;
        &:last-child {
          font-size: 13px;
          color: var(--cp-text3);
        }
      }
    }
    .van-icon {
      color: var(--cp-tip);
    }
  }
}
.detail-patient {
  &::after {
    content: "";
    display: block;
    height: 12px;
    background-color: var(--cp-bg);
  }
}
.detail-order {
  > h3 {
    padding: 10px 18px;
    font-weight: normal;
  }
  .copy {
    padding: 2px 10px;
    border: 1px solid var(--cp-primary);
    background-color: var(--cp-plain);
    color: var(--cp-primary);
    font-size: 12px;
    border-radius: 12px;
    margin-right: 10px;
  }
  :deep(.van-cell__title) {
    width: 70px;
    flex: none;
  }
  .price :deep(.van-cell__value) {
    font-size: 16px;
    color: var(--cp-price);
  }
}
.detail-action {
  height: 65px;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  background-color: #fff;
  justify-content: flex-end;
  padding: 0 15px;
  box-sizing: border-box;
  .price {
    width: 30%;
    > span:last-child {
      font-size: 18px;
      color: var(--cp-price);
      padding-left: 5px;
    }
  }
  .van-button {
    margin-left: 10px;
    padding-left: 17px;
    padding-right: 17px;
  }
  :deep(.van-button--default) {
    background-color: var(--cp-bg);
    color: var(--cp-text3);
  }
}
.van-cell {
  padding-left: 18px;
  padding-right: 18px;
}
</style>
