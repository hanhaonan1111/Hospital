import { lookMedision } from '@/services/consult'
import { getMedicineInfo } from '@/services/medicines'
import type { OrderInfoMedicine } from '@/types/payMedicines'
import { showImagePreview } from 'vant'
import { ref, onMounted } from 'vue'
export function useFatch() {
    let load = ref(false)
    async function fetch(sendAjax: () => Promise<any>) {
        load.value = true

        await sendAjax()
        load.value = false
    }
    return { load, fetch }
}

export async function usePreviewImg(id: string) {
    let { data } = await lookMedision(id);
    showImagePreview([data.url]);
}

export function useDragInfo(id: string) {
    let detail = ref<OrderInfoMedicine>()
    let load = ref(false)
    onMounted(async () => {
        load.value = true
        try {
            let res = await getMedicineInfo(id);
            detail.value = res.data

        } finally {
            load.value = false
        }
    })
    return { detail, load }
}

