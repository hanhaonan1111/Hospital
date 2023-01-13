<template>
  <div class="room-action">
    <van-field
      type="text"
      class="input"
      :border="false"
      placeholder="问医生"
      autocomplete="off"
      @keydown.enter="QuestionDoctor"
      v-model="question"
      :disabled="status !== 3"
    ></van-field>
    <van-uploader :preview-image="false" :after-read="afterRead">
      <Icon name="consult-img" />
    </van-uploader>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from "vue";
import { uploadImg } from "@/services/consult";
import { closeToast, showLoadingToast, Toast } from "vant";
let emit = defineEmits<{
  (e: "EmitData", val: string): void;
  (e: "sendImg", data: any): void;
}>();
defineProps<{ status: number }>();
let question = ref("");
async function QuestionDoctor() {
  await emit("EmitData", question.value);
  question.value = "";
}
async function afterRead(data: any) {
  // 上传图片
  let t = showLoadingToast("正在上传");
  let { data: res } = await uploadImg(data.file);
  closeToast();
  emit("sendImg", res);
}
</script>

<style lang="scss" scoped>
.room-action {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 16px;
  z-index: 1;
  box-sizing: border-box;
  .input {
    background-color: var(--cp-bg);
    border: none;
    border-radius: 25px;
    margin-right: 10px;
    padding: 8px 15px;
  }
  .cp-icon {
    width: 24px;
    height: 24px;
  }
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