import { lookMedision } from '@/services/consult'
import { showImagePreview } from 'vant'
import { ref } from 'vue'
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