<template>
  <van-nav-bar
    fixed
    left-arrow
    :title="title"
    :right-text="rightText"
    @click-left="onClickLeft"
    @click-right="onClickRight"
  ></van-nav-bar>
</template>

<script setup lang="ts">
let emit =
  defineEmits<{ (e?: "onClickLeft"): void; (e?: "onClickRight"): void }>();
const onClickLeft = () => {
  emit("onClickLeft");
};
const onClickRight = () => {
  emit("onClickRight");
};

defineProps<{ title?: string; rightText?: string }>();
</script>


<style lang="scss" scoped>
:deep() {
  .van-nav-bar {
    &__arrow {
      font-size: 18px;
      color: var(--cp-text1);
    }
    &__text {
      font-size: 15px;
    }
  }
}
</style>