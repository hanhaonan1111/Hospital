<script setup lang="ts">
import { IillnessTime } from "@/enums/consult";
import router from "@/router";
import { uploadImg } from "@/services/consult";
import { useConsultStore } from "@/stores/index";
import type { Img, PartialConsult } from "@/types/consult";
import { showFailToast } from "vant";
import type { UploaderAfterRead } from "vant/lib/uploader/types";

import { reactive, watch, ref, computed } from "vue";

let store = useConsultStore();

function clickLeft() {
  router.back();
}

let Time = [
  {
    label: "一周内",
    value: IillnessTime.Weekend,
  },
  {
    label: "一月内",
    value: IillnessTime.Month,
  },
  {
    label: "半年内",
    value: IillnessTime.LessYear,
  },
  {
    label: "大于半年",
    value: IillnessTime.MoreYear,
  },
];
let GoHospital = [
  {
    label: "就诊过",
    value: 1,
  },
  {
    label: "未就诊过",
    value: 0,
  },
];
let form = reactive<PartialConsult>({});
let OtherData = reactive<PartialConsult>({
  illnessTime: undefined,
  consultFlag: undefined,
  pictures: [],
});
let fileList = ref([]);

let disabled = computed(() => {
  return (
    OtherData.illnessTime !== undefined && OtherData.consultFlag !== undefined
  );
});

let afterRead: UploaderAfterRead = function (items) {
  if (Array.isArray(items)) return;
  if (!items.file) return;
  items.status = "uploading";
  uploadImg(items.file)
    .then(({ data }) => {
      items.status = "done";
      items.message = "上传成功";
      OtherData.pictures?.push({ id: data.id, url: data.url });
    })
    .catch((e) => {
      showFailToast(e.data.message);
      items.status = "failed";
      items.message = "上传失败";
    });
};

function onDeleteImg(e: File, i: { name: string; index: number }) {
  OtherData.pictures?.splice(i.index, 1);
  fileList.value.splice(i.index, 1);
}
let next = () => {
  // 下一步
  store.updateData({ ...OtherData });
  console.log(store.params);
};
</script> 

<template>
  <div class="consult-illness-page">
    <nav-bar title="图文问诊" @click-left="clickLeft" />
    <!-- 医生提示 -->
    <div class="illness-tip van-hairline--bottom">
      <img class="img" src="@/assets/avatar-doctor.svg" />
      <div class="info">
        <p class="tit">在线医生</p>
        <p class="tip">
          请描述你的疾病或症状、是否用药、就诊经历，需要我听过什么样的帮助
        </p>
        <p class="safe">
          <cp-icon name="consult-safe" /><span>内容仅医生可见</span>
        </p>
      </div>
    </div>
    <!-- 表单 -->
    <div class="illness-form">
      <van-field
        type="textarea"
        rows="3"
        placeholder="请详细描述您的病情，病情描述不能为空"
        v-model="form.illnessDesc"
      ></van-field>

      <div class="item">
        <p>本次患病多久了？</p>
        <RadioBtn
          :options="Time"
          v-model:current="OtherData.illnessTime"
        ></RadioBtn>
      </div>
      <div class="item">
        <p>此次病情是否去医院就诊过？</p>
        <RadioBtn
          :options="GoHospital"
          v-model:current="OtherData.consultFlag"
        ></RadioBtn>
      </div>

      <div class="illness-img">
        <van-uploader
          :max-count="9"
          :max-size="5 * 1024 * 1024"
          upload-icon="photo-o"
          v-model="fileList"
          upload-text="上传图片"
          :after-read="afterRead"
          @delete="onDeleteImg"
        >
          <template #preview-cover="{ file }">
            <p v-if="false">{{ file.name }}</p></template
          >
        </van-uploader>
        <p class="tip" v-if="fileList.length === 0">
          上传内容仅医生可见,最多9张图,最大5MB
        </p>
      </div>
      <van-button
        type="primary"
        block
        round
        :class="{ disabled: disabled === false }"
        @click="next"
        >下一步</van-button
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.consult-illness-page {
  padding-top: 46px;
}
.illness-tip {
  display: flex;
  padding: 15px;
  .img {
    width: 52px;
    height: 52px;
    border-radius: 4px;
    overflow: hidden;
    margin-top: 10px;
  }
  .info {
    flex: 1;
    padding-left: 12px;
    .tit {
      font-size: 16px;
      margin-bottom: 5px;
    }
    .tip {
      padding: 12px;
      background: var(--cp-bg);
      color: var(--cp-text3);
      font-size: 13px;
      margin-bottom: 10px;
    }
    .safe {
      font-size: 10px;
      color: var(--cp-text3);
      display: flex;
      align-items: center;
      .cp-icon {
        font-size: 12px;
        margin-right: 2px;
      }
    }
  }
}
.illness-form {
  padding: 15px;
  .van-field {
    padding: 0;
    &::after {
      border-bottom: none;
    }
  }
  .item {
    > p {
      color: var(--cp-text3);
      padding: 15px 0;
    }
  }
}
.illness-img {
  padding-top: 16px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  .tip {
    font-size: 12px;
    color: var(--cp-tip);
  }
  ::v-deep() {
    .van-uploader {
      &__preview {
        &-delete {
          left: -6px;
          top: -6px;
          border-radius: 50%;
          background-color: var(--cp-primary);
          width: 20px;
          height: 20px;
          &-icon {
            transform: scale(0.9) translate(-22%, 22%);
          }
        }
        &-image {
          border-radius: 8px;
          overflow: hidden;
        }
      }
      &__upload {
        border-radius: 8px;
      }
      &__upload-icon {
        color: var(--cp-text3);
      }
    }
  }
}
.van-button {
  font-size: 16px;
  margin-bottom: 30px;
  &.disabled {
    opacity: 1;
    background: #fafafa;
    color: #d9dbde;
    border: #fafafa;
  }
}
</style>