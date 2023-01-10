import type { allDepRes } from '@/types/consult'
import http from '@/utils/http'

export function getAllDepartment() {
    return http.get<allDepRes>('/dep/all')
}