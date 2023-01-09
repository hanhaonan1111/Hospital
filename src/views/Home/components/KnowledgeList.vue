<template>
  <div class="knowledge-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad()"
    >
      <knowledge-card v-for="item in list" :key="item.id" :item="item" />
    </van-list>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import KnowledgeCard from "./KnowledgeCard.vue";
import type {
  getArticalParams,
  KnowledgeList,
  KnowledgeType,
} from "@/types/home";
import { getArticalList } from "@/services/home";

const list = ref<KnowledgeList>([] as KnowledgeList);
const loading = ref(false);
const finished = ref(false);

let props = defineProps<{ type: KnowledgeType }>();
console.log(props.type, "Type");

let params = reactive<getArticalParams>({
  type: props.type,
  current: 0,
  pageSize: 10,
});
let ajaxing = ref(false);
// onLoad 执行的前提条件是:loading状态为false
const onLoad = async () => {
  if (!ajaxing.value) {
    ajaxing.value = true;
    loading.value = true;
    params.current++;
    let { data } = await getArticalList(params);
    if (data.rows.length === 0) {
      finished.value = true;
    }
    list.value.push(...data.rows);
    loading.value = false;
    ajaxing.value = false;
  }
};
</script>


<style scoped lang="scss">
.knowledge-list {
  padding: 5px 15px 51px;
}
.van-cell__value {
  text-align: left !important;
}
</style>