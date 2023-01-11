import type { ResAllDepartmentData } from '@/types/consult'
import http from '@/utils/http'

export function getAllDepartment() {
    return http.get<ResAllDepartmentData>('/dep/all')
}