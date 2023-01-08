<script setup lang="ts">
defineProps<{
  options: {
    value: string | number;
    label: string;
  }[];
  current?: string | number;
}>();
let emit = defineEmits<{ (e: "update:current", val: string | number): void }>();
</script>

<template>
  <div class="cp-radio-btn">
    <a
      class="item"
      href="javascript:;"
      v-for="(v, i) in options"
      :key="i"
      :class="current === v.value ? 'active' : ''"
      @click="emit('update:current', v.value)"
      >{{ v.label }}</a
    >
  </div>
</template>

<style lang="scss" scoped>
.cp-radio-btn {
  display: flex;
  flex-wrap: wrap;
  .item {
    height: 32px;
    min-width: 60px;
    line-height: 30px;
    padding: 0 14px;
    text-align: center;
    border: 1px solid var(--cp-bg);
    background-color: var(--cp-bg);
    margin-right: 10px;
    box-sizing: border-box;
    color: var(--cp-text2);
    margin-bottom: 10px;
    border-radius: 4px;
    transition: all 0.3s;
    &.active {
      border-color: var(--cp-primary);
      background-color: var(--cp-plain);
    }
  }
}
</style>