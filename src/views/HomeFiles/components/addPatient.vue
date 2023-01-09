<template>
  <van-form autocomplete="off" @submit="onSave" ref="addForm">
    <van-field
      label="真实姓名"
      placeholder="请输入真实姓名"
      v-model="form.name"
      :rules="addPatientNameRules"
    />
    <van-field
      label="身份证号"
      placeholder="请输入身份证号"
      v-model="form.idCard"
      :rules="addPatientIdcardRules"
    />
    <van-field
      label="性别"
      class="pb4"
      v-model="form.gender"
      :rules="[{ required: true, message: '性别为必填项目' }]"
    >
      <!-- 单选按钮组件 -->
      <template #input>
        <radio-btn :options="options" v-model:current="current"></radio-btn>
      </template>
    </van-field>
    <van-field label="默认就诊人">
      <template #input>
        <van-checkbox
          :icon-size="18"
          round
          :model-value="form.defaultFlag === 1 ? true : false"
          @update:model-value="changeDef"
        />
      </template>
    </van-field>
  </van-form>
  <van-action-bar>
    <van-action-bar-button>删除</van-action-bar-button>
  </van-action-bar>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { addPatientNameRules, addPatientIdcardRules } from "@/utils/loginRuls";
import { addPatient, editPatient } from "@/services/user";
import type { Patient } from "@/types/user";
import { showToast } from "vant";
import type { ToastWrapperInstance } from "vant/lib/toast/types";
const options = [
  { label: "男", value: 1 },
  { label: "女", value: 0 },
];

let props = defineProps<{ show: boolean; defaultValue: Patient }>();

let form = reactive<Patient>({
  name: props.defaultValue?.name || "",
  idCard: props.defaultValue?.idCard || "",
  gender: props.defaultValue?.gender || 1,
  defaultFlag: props.defaultValue?.defaultFlag || 0,
  id: props.defaultValue?.id || undefined,
});
let current = ref(0);

watch(
  () => form.idCard,
  () => {
    if (form.idCard.length === 18) {
      let flag = +form.idCard[16] % 2 === 0;
      if (flag) {
        current.value = 0;
        form.gender = 0;
      } else {
        current.value = 1;
        form.gender = 1;
      }
    }
  }
);

let addForm = ref();
async function onSave() {
  let validate = await addForm.value.validate();
  if (!validate) {
    if (props.defaultValue.id) {
      let { data } = await editPatient(form);
      return data.id ? true : showToast(data.message);
    } else {
      let { data } = await addPatient(form);
      return data.id ? true : showToast(data.message);
    }
  }
  return false;
}
defineExpose<{ onSave: () => Promise<boolean | ToastWrapperInstance> }>({
  onSave,
});
function changeDef(cur: number) {
  form.defaultFlag = cur ? 1 : 0;
}
</script>

<style scope lang="scss">
.submit {
  display: none;
}
.van-action-bar {
  padding: 0 10px;
  margin-bottom: 10px;
  .van-button {
    color: var(--cp-price);
    background-color: var(--cp-bg);
  }
}
</style>

