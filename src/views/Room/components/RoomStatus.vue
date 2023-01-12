<template>
  <div class="room-status">
    <div class="wait" v-if="status.status === 2">
      已通知医生尽快接诊，24小时内医生未回复将自动退款
    </div>
    <div class="chat" v-else-if="status.status === 3">
      <span>咨询中</span>
      <span class="chatSpan"
        >剩余时间：<van-count-down :time="status.countdown * 1000"
      /></span>
    </div>
    <div class="end" v-else-if="status.status === 4">
      <van-icon name="passed" /> 已结束
    </div>
  </div>
</template>

<script lang="ts" setup>
let props = defineProps<{ status: any }>();
console.log(props, "<><><>");
</script>

<style lang="scss">
.chatSpan {
  display: flex;
}
.room-status {
  position: fixed;
  left: 0;
  top: 46px;
  height: 44px;
  width: 100%;
  background-color: #fff;
  font-size: 13px;
  z-index: 1;
  .wait {
    padding: 0 15px;
    background-color: var(--cp-plain);
    height: 100%;
    line-height: 44px;
    text-align: center;
    color: var(--cp-primary);
  }
  .chat {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    span {
      &:first-child {
        color: var(--cp-primary);
      }
      &:last-child {
        color: var(--cp-text2);
        width: 120px;
      }
    }
  }
  .end {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 15px;
    font-weight: 500;
    .van-icon {
      font-size: 14px;
      margin-right: 4px;
      position: relative;
      top: 1px;
    }
  }
}
</style>