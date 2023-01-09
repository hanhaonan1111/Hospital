import http from '@/utils/http'
import { useUserStore } from '@/stores'
let user = useUserStore()

import type { Patient } from '@/types/user'
export const addPatient = async (params: Patient) => {
    return await http.post<{ id?: string, message: string }>('/patient/add', params)
}

export const editPatient = async (params: Patient) => {
    return await http.put<{ id?: string, message: string }>('/patient/update', params)
}
export const delPatient = async (id: string) => {
    return await http.delete<{ data?: { id?: string }, message: string }>('/patient/del/' + id)
}