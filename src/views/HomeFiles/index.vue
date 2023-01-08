<template>
  <div class="patient-page">
    <NavBar title="家庭档案" />
    <div class="patient-list">
      <div class="patient-item" v-for="(v, i) in list" :key="i">
        <div class="info">
          <span class="name">{{ v.name }}</span>
          <span class="id">{{
            v.idCard.slice(0, 5) + "*********" + v.idCard.slice(14, 19)
          }}</span>
          <span>{{ v.gender !== 0 ? "男" : "女" }}</span>
          <span>{{ v.age }}岁</span>
        </div>
        <div class="icon"><Icon name="user-edit" /></div>
        <div class="tag">默认</div>
      </div>

      <div class="patient-add" v-if="list.length < 6" @click="showRight = true">
        <Icon name="user-add" />
        <p>添加患者</p>
      </div>
      <div class="patient-tip">最多可添加 6 人</div>
    </div>

    <van-popup
      position="right"
      v-model:show="showRight"
      :style="{ width: '100%', height: '100%' }"
    >
      <nav-bar
        title="添加患者"
        rightText="保存"
        @click-left="showRight = false"
      ></nav-bar>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import type { HomeFiles } from "@/types/user";
import { onMounted, ref } from "vue";
import http from "@/utils/http";
let list = ref<HomeFiles>([] as HomeFiles);
async function getList() {
  let { data } = await http.get<HomeFiles>("/patient/mylist");
  list.value = data;
}

onMounted(() => {
  getList();
});

let showRight = ref(false);
</script>

<style lang="scss" scoped>
.patient-page {
  padding: 46px 0 80px;
  :deep() {
    .van-popup {
      width: 80%;
      height: 100%;
    }
  }
}
.patient-page {
  padding: 46px 0 80px;
}
.patient-list {
  padding: 15px;
}
.patient-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: var(--cp-bg);
  border-radius: 8px;
  margin-bottom: 15px;
  position: relative;
  border: 1px solid var(--cp-bg);
  transition: all 0.3s;
  overflow: hidden;
  .info {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    span {
      color: var(--cp-tip);
      margin-right: 20px;
      line-height: 30px;
      &.name {
        font-size: 16px;
        color: var(--cp-text1);
        width: 80px;
        margin-right: 0;
      }
      &.id {
        color: var(--cp-text2);
        width: 180px;
      }
    }
  }
  .icon {
    color: var(--cp-tag);
    width: 20px;
    text-align: center;
  }
  .tag {
    position: absolute;
    right: 60px;
    top: 21px;
    width: 30px;
    height: 16px;
    font-size: 10px;
    color: #fff;
    background-color: var(--cp-primary);
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &.selected {
    border-color: var(--cp-primary);
    background-color: var(--cp-plain);
    .icon {
      color: var(--cp-primary);
    }
  }
}
.patient-add {
  background-color: var(--cp-bg);
  color: var(--cp-primary);
  text-align: center;
  padding: 15px 0;
  border-radius: 8px;
  .cp-icon {
    font-size: 24px;
  }
}
.patient-tip {
  color: var(--cp-tag);
  padding: 12px 0;
}
.pb4 {
  padding-bottom: 4px;
}
</style>