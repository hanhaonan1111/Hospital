import type { params, User } from "@/types/user"
import http from '@/utils/http'

import { useUserStore } from '@/stores'
let user = useUserStore()


export const LoginByPwd = (params: params) => {
    return http.post<User>('/login/password', { ...params })
}