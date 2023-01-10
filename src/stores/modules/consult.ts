import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PartialConsult } from '@/types/consult'
export const useConsultStore = defineStore('SkyBlue_Consult', () => {
    // 入参
    let params = ref<PartialConsult>({})

    // 实时记录入参情况
    function updateData(data: PartialConsult) {
        params.value = { ...params.value, ...data }
    }
    function clearData() {
        params.value = {}
    }
    return { params, updateData }
}, { persist: true })  