<script setup lang="ts">
import type { Type } from "@/enums/consult";
import { Cancel, DeleteOrder, orderList } from "@/services/consult";
import type { Params, Row } from "@/types/orderList";
import { showImagePreview, showSuccessToast } from "vant";
import { onMounted, reactive, ref } from "vue";
import { lookMedision } from "@/services/consult";
import { usePreviewImg } from "@/composable";
let props = defineProps<{ type: Type }>();

let params = reactive<Params>({
  type: props.type,
  current: 0,
  pageSize: 5,
});
let list = ref<Row[]>([]);

let finished = ref(false);

async function asyncLoadData(isCancel: boolean | undefined) {
  let {
    data: { rows },
  } = await orderList(params);
  if (rows.length === 0) {
    finished.value = true;
    return;
  }
  if (isCancel) {
    list.value = [...rows];
  } else {
    list.value = [...list.value, ...rows];
  }
}

let loading = ref(false);

let isAjax = ref(false); // 是否有请求正在发送

async function Load() {
  if (isAjax.value === false) {
    isAjax.value = true;
    params.current++;
    try {
      await asyncLoadData();
    } finally {
      loading.value = false;
      isAjax.value = false;
    }
  }
}
function fetchData(id: string) {
  list.value = list.value.filter((v) => v.id !== id);
}

async function cancle(data: any) {
  await Cancel(data.id);
  showSuccessToast("已取消");
  data.status = 5;
  data.statusValue = "已取消";
}

async function Del(id: string) {
  await DeleteOrder(id);
  showSuccessToast("已删除!");
  fetchData(id);
}

async function LookMedision(id: any) {
  usePreviewImg(id);
}
let showPopover = ref("");

function changeStatus(val: any) {
  showPopover.value = val;
}
let medisionId = ref("");
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
          <p>{{ v.docInfo?.name || "暂未分配医生" }}</p>
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

        <div class="foot" v-if="v.statusValue === '待支付'">
          <van-button class="gray" plain size="small" round @click="cancle(v)"
            >取消问诊
          </van-button>
          <van-button
            type="primary"
            plain
            size="small"
            round
            :to="`/user/consult/${v.id}`"
          >
            去支付
          </van-button>
        </div>
        <div class="foot" v-if="v.statusValue === '待接诊'">
          <van-button
            class="gray"
            plain
            size="small"
            round
            @click="() => cancle(v)"
            >取消问诊</van-button
          >
          <van-button
            type="primary"
            plain
            size="small"
            round
            :to="`/room?orderId=${v.id}`"
          >
            继续沟通
          </van-button>
        </div>
        <div class="foot" v-if="v.statusValue === '咨询中'">
          <van-button
            v-if="v.prescriptionId"
            class="gray"
            plain
            size="small"
            round
            @click="LookMedision(v.prescriptionId)"
          >
            查看处方
          </van-button>
          <van-button
            type="primary"
            plain
            size="small"
            round
            :to="`/room?orderId=${v.id}`"
          >
            继续沟通
          </van-button>
        </div>
        <div class="foot" v-if="v.statusValue === '已完成'">
          <div class="more">
            <van-popover
              placement="top-start"
              :show="showPopover === v.id"
              @update:show="changeStatus(v.id)"
              :actions="actions(v)"
              @select="select"
            >
              <template #reference> 更多 </template>
            </van-popover>
          </div>
          <van-button
            class="gray"
            plain
            size="small"
            round
            :to="`/room?orderId=${v.id}`"
          >
            问诊记录
          </van-button>
          <van-button
            v-if="!v.evaluateId"
            type="primary"
            plain
            size="small"
            round
          >
            去评价
          </van-button>
          <van-button v-else class="gray" plain size="small" round>
            查看评价
          </van-button>
        </div>
        <div class="foot" v-if="v.statusValue === '已取消'">
          <van-button class="gray" plain size="small" round @click="Del(v.id)"
            >删除订单</van-button
          >
          <van-button type="primary" plain size="small" round to="/"
            >咨询其他医生</van-button
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