import { ref, watch } from "vue";



export function useTimerInterval() {
    let timeCount = ref(0)
    let timer = ref()

    function start(total: number = 10) {
        timeCount.value = total
        timer.value = setInterval(() => { timeCount.value-- }, 1000)
    }

    watch(() => timeCount.value, () => {
        if (timeCount.value === 0) {
            clearInterval(timer.value)
        }
    })
    return { timeCount, start }


}


