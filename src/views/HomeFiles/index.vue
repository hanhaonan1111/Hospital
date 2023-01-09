<template>
  <div class="patient-page">
    <NavBar title="家庭档案" @click-left="LeftClick" />
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
        <div class="icon">
          <Icon name="user-edit" @click="showEditBox(v)" />
        </div>

        <div class="tag" v-if="v.defaultFlag === 1">默认</div>
      </div>

      <div class="patient-add" v-if="list.length < 6" @click="addBox">
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
      <NavBar
        title="添加患者"
        rightText="保存"
        @click-right="SaveData"
        @click-left="showRight = false"
      ></NavBar>
      <!-- 添加患者 -->
      <addPatient
        v-if="showRight"
        :defaultValue="defaultValue"
        :show="showRight"
        ref="addPatientRef"
        @changeBox="changeBox"
      />
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import type { HomeFiles, Patient } from "@/types/user";
import addPatient from "./components/addPatient.vue";
import { onMounted, reactive, ref } from "vue";
import http from "@/utils/http";
import { showToast } from "vant";
import type { ToastWrapperInstance } from "vant/lib/toast/types";
import router from "@/router";
let list = ref<HomeFiles>([] as HomeFiles);

async function getList() {
  let { data } = await http.get<HomeFiles>("/patient/mylist");
  list.value = data;
}

onMounted(() => {
  getList();
});

let showRight = ref(false);

function LeftClick() {
  router.back();
}
let addPatientRef = ref<{
  onSave: () => Promise<boolean | ToastWrapperInstance>;
}>({
  onSave: () => Promise.resolve(false),
});
let defaultValue = reactive<Patient>({} as Patient);
async function SaveData() {
  let res = await addPatientRef.value.onSave();
  if (res) {
    let msg = defaultValue ? "修改成功!" : "添加成功!";
    showToast(msg);
    getList();
    showRight.value = false;
  }
}

let showEditBox = (v: Patient) => {
  showRight.value = true;
  defaultValue = v;
};
function addBox() {
  showRight.value = true;
  defaultValue = {} as Patient;
}
function changeBox() {
  showRight.value = false;
  getList();
}
</script>

<style lang="scss" scoped>
.patient-page {
  padding: 46px 0 80px;
  :deep() {
    .van-popup {
      width: 100%;
      height: 100%;
      padding-top: 46px;
      box-sizing: border-box;
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