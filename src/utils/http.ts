import axios from 'axios'
import { useUserStore } from '@/stores'
import { showToast } from 'vant'
import router from '@/router'
export const baseURL = 'https://consult-api.itheima.net/'
const instance = axios.create({
    baseURL,
    timeout: 5000
})

let store = useUserStore()

instance.interceptors.request.use(
    (config) => {

        let user = store.user
        if (user?.token && config.headers) {
            config.headers.Authorization = `Bearer ${store.user?.token}`
        }
        return config
    },
    (err) => Promise.reject(err)
)

instance.interceptors.response.use(
    (res) => {
        // 约定
        if (res.data?.code !== 10000) {
            showToast(res.data?.message || '业务失败')
            // await 拒绝的契约=>报错(try可以捕获)
            return Promise.reject('res.data')
        }
        return res
    },
    (err) => {
        // TODO 5. 处理401错误
        // 1.清除过期的用户数据
        store.clearUser()
        // 2.跳转页面,登陆成功之后,调回原来的路径
        router.push({ path: '/login', query: { orginURL: router.currentRoute.value.fullPath } })
        return Promise.reject(err)
    }
)

export default instance