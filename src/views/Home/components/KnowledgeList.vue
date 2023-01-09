<template>
  <KnowledgeCard
    v-for="(v, i) in 5"
    :key="i"
    class="knowledge-list"
  ></KnowledgeCard>
</template>

<script setup lang="ts">
import KnowledgeCard from "./KnowledgeCard.vue";
</script>

<style scoped lang="scss">
.knowledge-list {
  padding: 5px 15px 51px;
}
</style>