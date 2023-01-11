<script setup lang="ts">
import router from "@/router";
import { getAllDepartment } from "@/services/consult";
import type { ResAllDepartmentData } from "@/types/consult";
import { ref, onMounted } from "vue";
import { useConsultStore } from "@/stores/index";
let { updateData } = useConsultStore();
const active = ref<number>(0);

function setDepartment(id: string) {
  updateData({ depId: id });
}
let list = ref<ResAllDepartmentData>([] as ResAllDepartmentData);

onMounted(async () => {
  let { data } = await getAllDepartment();
  list.value = data;
});

function onClickLeft() {
  router.back();
}
</script>

<template>
  <div class="consult-dep-page">
    <nav-bar title="选择科室" :onClickLeft="onClickLeft" />
    <div class="wrapper">
      <van-sidebar v-model="active">
        <van-sidebar-item :title="val.name" v-for="val in list" :key="val.id" />
      </van-sidebar>
      <div class="sub-dep" v-if="list[active]">
        <router-link
          to="/consult/illness"
          v-for="v in list[active].child"
          :key="v.id"
          @click="setDepartment(v.id)"
          >{{ v.name }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.van-sidebar {
  width: 114px;
  &-item {
    padding: 14px;
    color: var(--cp-tag);
    &--select {
      color: var(--cp-main);
      font-weight: normal;
      &::before {
        display: none;
      }
    }
  }
}
.consult-dep-page {
  padding-top: 46px;
}
.wrapper {
  height: calc(100vh - 46px);
  overflow: hidden;
  display: flex;
  .sub-dep {
    flex: 1;
    height: 100%;
    overflow-y: auto;
    > a {
      display: block;
      padding: 14px 30px;
      color: var(--cp-dark);
    }
  }
}
.sub-dep {
  overflow: auto;
}
</style>
