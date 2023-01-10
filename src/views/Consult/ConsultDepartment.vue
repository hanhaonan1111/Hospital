<script setup lang="ts">
import { getAllDepartment } from "@/services/consult";
import type { allDepRes, allDep } from "@/types/consult";
import { ref, onMounted } from "vue";

const active = ref(0);
let list = ref<allDep>([] as allDep);

onMounted(async () => {
  let { data } = await getAllDepartment();
  list.value = { data };
});
</script>

<template>
  <div class="consult-dep-page">
    <nav-bar title="选择科室" />
    <div class="wrapper">
      <van-sidebar v-model="active">
        <van-sidebar-item
          :title="val.name"
          v-for="val in list.data"
          :key="val.id"
        />
      </van-sidebar>
      <div class="sub-dep">
        <router-link to="/consult/illness">科室一</router-link>
        <router-link to="/consult/illness">科室二</router-link>
        <router-link to="/consult/illness">科室三</router-link>
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
</style>
