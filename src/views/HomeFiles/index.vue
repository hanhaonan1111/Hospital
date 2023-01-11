<template>
  <div class="patient-page">
    <NavBar
      :title="isChange ? '选择患者' : '家庭档案'"
      @click-left="LeftClick"
    />
    <div v-if="isChange" class="patient-change">
      <h3>请选择患者信息</h3>
      <p>以便医生给出更准确的治疗，信息仅医生可见</p>
    </div>
    <div class="patient-list">
      <div
        class="patient-item"
        v-for="(v, i) in list"
        :key="i"
        :class="{ selected: selected === v.id }"
        @click="changeSelected(v.id ? v.id : '')"
      >
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
    <div class="patient-next" v-if="isChange">
      <van-button type="primary" round block @click="next">下一步</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import addPatient from "./components/addPatient.vue";
import type { HomeFiles, Patient } from "@/types/user";
import { useConsultStore } from "@/stores/index";
import { onMounted, reactive, ref } from "vue";
import http from "@/utils/http";
import { showToast } from "vant";
import type { ToastWrapperInstance } from "vant/lib/toast/types";
import { useRoute } from "vue-router";
import router from "@/router";

let list = ref<HomeFiles>([] as HomeFiles);

let { updateData } = useConsultStore();
async function getList() {
  let { data } = await http.get<HomeFiles>("/patient/mylist");
  list.value = data;
}
let isChange = ref(false); // 家庭档案false还是选择患者true
let selected = ref(""); // 默认选中
onMounted(async () => {
  let route = useRoute();
  isChange.value = route.query.isChange ? true : false;
  await getList();
  let item = list.value.find((v) => v.defaultFlag === 1);
  selected.value = item?.id ? item?.id : "";
});
function next() {
  if (selected.value.length > 1) {
    updateData({ patientId: selected.value }); //TODO
    router.push("/consult/pay");
  } else {
    showToast("请选择就诊患者!");
  }
}
function changeSelected(id: string) {
  selected.value = id;
}
//
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
.patient-change {
  padding: 15px;
  > h3 {
    font-weight: normal;
    margin-bottom: 5px;
  }
  > p {
    color: var(--cp-text3);
  }
}
.patient-next {
  padding: 15px;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80px;
  box-sizing: border-box;
}
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