<script setup lang="ts">
import { onBeforeMount, ref, computed, reactive } from "vue";
import DoctorCard from "./DoctorCard.vue";
import { useWindowSize } from "@vueuse/core";
import { getDoctorList } from "@/services/home";
import type { DoctorList, PageParams } from "@/types/home";
let { width } = useWindowSize();

let useWith = computed(() => {
  return width.value * (150 / 375);
});
let doctorListParams = reactive<PageParams>({
  current: 1,
  pageSize: 10,
});
let doctorList = ref<DoctorList>([] as DoctorList);
async function asyncGetList() {
  let {
    data: { rows },
  } = await getDoctorList(doctorListParams);
  doctorList.value = rows;
}
onBeforeMount(() => {
  asyncGetList();
});
</script>

<template>
  <div class="follow-doctor">
    <div className="head">
      <p>推荐关注</p>
      <a href="javascript:;"> 查看更多<i class="van-icon van-icon-arrow" /></a>
    </div>
    <div class="body">
      <van-swipe :loop="false" :show-indicators="false" :width="useWith">
        <van-swipe-item v-for="item in doctorList" :key="item.id">
          <DoctorCard :detail="item"></DoctorCard>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.follow-doctor {
  background-color: var(--cp-bg);
  height: 250px;
  .head {
    display: flex;
    justify-content: space-between;
    height: 45px;
    align-items: center;
    padding: 0 15px;
    font-size: 13px;
    > a {
      color: var(--cp-tip);
    }
  }
  .body {
    width: 100%;
    overflow: hidden;
  }
}
</style>