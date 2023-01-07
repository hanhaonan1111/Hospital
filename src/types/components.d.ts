import NavBar from '@/components/NavBar.vue'
// 为全局组件提供类型的
// 声明一个 vue 类型模块
declare module 'vue' {
    interface GlobalComponents {
        NavBar: typeof NavBar
    }
}
