import type { params, User, Codeparams } from "@/types/user"
import http from '@/utils/http'

import { useUserStore } from '@/stores'
let user = useUserStore()


export const LoginByPwd = (params: params) => {
    return http.post<User>('/login/password', { ...params })
}
export const LoginByCode = (params: Codeparams) => {
    return http.post<User>('/code', { ...params })
}