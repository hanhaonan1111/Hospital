import http from '@/utils/http'
import { useUserStore } from '@/stores'
let user = useUserStore()

import type { Patient } from '@/types/user'
export const addPatient = async (params: Patient) => {
    return await http.post<{ id?: string, message: string }>('/patient/add', params)
}