<template>
  <div class="msg msg-illness">
    <div class="patient van-hairline--bottom">
      <p>
        {{ info.patientInfo.name }} {{ info.patientInfo.genderValue }}
        {{ info.patientInfo.age }}岁
      </p>
      <p>一周内 | 未去医院就诊</p>
    </div>
    <van-row>
      <van-col span="6">病情描述</van-col>
      <van-col span="18">{{ msg.illnessDesc }}</van-col>
      <van-col span="6">图片</van-col>
      <van-col span="18" @click="lookImg(info.pictures)">点击查看</van-col>
    </van-row>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from "@vue/runtime-core";
import { showImagePreview } from "vant";
let props = defineProps<{ msg: any }>();
let info = ref({});
function lookImg(imgs: any) {
  let imgsUrl: any = [];
  imgs.forEach((v: any) => {
    imgsUrl.push(v.url);
  });
  showImagePreview([...imgsUrl]);
}
watch(
  () => props.msg,
  () => {
    info.value = props.msg.consultRecord;
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
@import "@/styles/root.scss";
</style>