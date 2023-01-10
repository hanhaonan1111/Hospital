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