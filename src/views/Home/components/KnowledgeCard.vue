<script setup lang="ts">
import { ref } from "vue";
import { useFatch } from "@/composable";
import type { Knowledge } from "@/types/home";
import { followKnow } from "@/services/home";

let { item } = defineProps<{ item: Knowledge }>();
let click = ref(item.likeFlag);
let { load, fetch } = useFatch();

async function changeFllow(id: string) {
  await fetch(() => followKnow({ type: "knowledge", id }));
  click.value = click.value === 1 ? 0 : 1;
}
</script>

<template>
  <div class="knowledge-card van-hairline--bottom">
    <div class="head">
      <van-image
        round
        class="avatar"
        src="https://yanxuan-item.nosdn.127.net/9ad83e8d9670b10a19b30596327cfd14.png"
      ></van-image>
      <div class="info">
        <p class="name">{{ item.creatorName }}</p>
        <p class="dep van-ellipsis">
          {{ item.creatorHospatalName }} {{ item.creatorDep }}
          {{ item.creatorTitles }}
        </p>
      </div>
      <van-button
        class="btn"
        size="small"
        round
        @click="changeFllow(item.id)"
        :disabled="load === true"
      >
        <van-loading v-if="load" size="20" type="spinner" color="green" />
        <span v-else> {{ click === 1 ? "已关注" : "+ 关注" }}</span>
      </van-button>
    </div>
    <div class="body">
      <h3 class="title van-ellipsis">
        {{ item.title }}
      </h3>
      <p class="tag">
        <span># {{ item.topic }}</span>
      </p>
      <p class="intro van-multi-ellipsis--l2">
        {{ item.content }}
      </p>
      <div class="imgs">
        <van-image :src="v" v-for="v in item.coverUrl" :key="v" />
      </div>
      <p class="logs">
        <span>{{ item.collectionNumber }}收藏</span>
        <span>{{ item.commentNumber }} 评论</span>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.knowledge-card {
  padding: 20px 0 16px;
  .head {
    display: flex;
    align-items: center;
    .avatar {
      width: 38px;
      height: 38px;
      margin-right: 10px;
    }
    .info {
      width: 200px;
      padding-right: 10px;
      .name {
        color: var(--cp-text2);
      }
      .dep {
        color: var(--cp-tip);
        font-size: 12px;
      }
    }
    .btn {
      padding: 0 12px;
      border-color: var(--cp-primary);
      color: var(--cp-primary);
      height: 28px;
      width: 72px;
    }
  }
  .body {
    .title {
      font-size: 16px;
      margin-top: 8px;
      font-weight: normal;
    }
    .tag {
      margin-top: 6px;
      > span {
        color: var(--cp-primary);
        margin-right: 20px;
        font-size: 12px;
      }
    }
    .intro {
      margin-top: 7px;
      line-height: 2;
      color: var(--cp-text3);
    }
    .imgs {
      margin-top: 7px;
      display: flex;
      .van-image {
        width: 106px;
        height: 106px;
        margin-right: 12px;
        border-radius: 12px;
        overflow: hidden;
        &:last-child {
          margin-right: 0;
        }
      }
      &.large {
        .van-image {
          width: 185px;
          height: 125px;
        }
      }
    }
    .logs {
      margin-top: 10px;
      > span {
        color: var(--cp-tip);
        margin-right: 16px;
        font-size: 12px;
      }
    }
  }
}
</style>