<script setup lang="ts">
import type { Type } from "@/enums/consult";
import { orderList } from "@/services/consult";
import type { Params, Row } from "@/types/orderList";
import { onMounted, reactive, ref } from "vue";

let props = defineProps<{ type: Type }>();

let params = reactive<Params>({
  type: props.type,
  current: 0,
  pageSize: 5,
});
let list = ref<Row[]>([]);

let finished = ref(false);
async function asyncLoadData() {
  let {
    data: { rows },
  } = await orderList(params);
  if (rows.length === 0) {
    finished.value = true;
    return;
  }
  list.value = [...list.value, ...rows];
}

let loading = ref(false);

let isAjax = ref(false); // 是否有请求正在发送

async function Load() {
  if (isAjax.value === false) {
    isAjax.value = true;
    params.current++;
    await asyncLoadData();

    loading.value = false;
    isAjax.value = false;
  }
}
</script>

<template>
  <div class="consult_list">
    <van-list
      v-model:loading="loading"
      finished-text="没有更多了"
      @load="Load"
      :finished="finished"
    >
      <div class="consult-item" v-for="v in list" :key="v.id">
        <div class="head van-hairline--bottom">
          <img class="img" src="@/assets/avatar-doctor.svg" />
          <p>{{ v.docInfo?.name }}</p>
          <span>{{ v.statusValue }}</span>
        </div>
        <div class="body">
          <div class="body-row">
            <div class="body-label">病情描述</div>
            <div class="body-value">{{ v.illnessDesc }}</div>
          </div>
          <div class="body-row">
            <div class="body-label">价格</div>
            <div class="body-value">¥ {{ v.payment }}</div>
          </div>
          <div class="body-row">
            <div class="body-label">创建时间</div>
            <div class="body-value tip">{{ v.createTime }}</div>
          </div>
        </div>
        <div class="foot">
          <!-- 
          待支付：取消问诊+去支付
          待接诊：取消问诊+继续沟通
          咨询中：查看处方（如果开了）+继续沟通
          已完成：更多（查看处方，如果开了，删除订单）+问诊记录+（未评价?写评价:查看评价）
          已取消：删除订单+咨询其他医生 -->

          <!-- 已完成 -->

          <van-button class="gray" plain size="small" round
            >取消问诊</van-button
          >
          <van-button type="primary" plain size="small" round
            >去支付</van-button
          >
        </div>
      </div>
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.consult_list {
  height: 570px;
  overflow: scroll;
}
.consult-item {
  border-radius: 4px;
  box-shadow: 0px 0px 22px 0px rgba(245, 245, 245, 0.1);
  background-color: #fff;
  margin-bottom: 10px;
  .head {
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 15px;
    .img {
      width: 20px;
      height: 20px;
    }
    > p {
      flex: 1;
      font-size: 15px;
      padding-left: 10px;
    }
    > span {
      color: var(--cp-tag);
      &.orange {
        color: #f2994a;
      }
      &.green {
        color: var(--cp-primary);
      }
    }
  }
  .body {
    padding: 15px 15px 8px 15px;
    .body-row {
      display: flex;
      margin-bottom: 7px;
    }
    .body-label {
      width: 62px;
      font-size: 13px;
      color: var(--cp-tip);
    }
    .body-value {
      width: 250px;
      &.tip {
        color: var(--cp-tip);
      }
    }
  }
  .foot {
    padding: 0 15px 15px 15px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .van-button {
      margin-left: 10px;
      padding: 0 16px;
      &.gray {
        color: var(--cp-text3);
        background-color: var(--cp-bg);
      }
    }
    .more {
      color: var(--cp-tag);
      flex: 1;
      font-size: 13px;
    }
  }
}
</style>