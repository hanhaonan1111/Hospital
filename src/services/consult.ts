import type { ResAllDepartmentData } from '@/types/consult'
import http from '@/utils/http'
import type {
    UploaderFileListItem,
} from "vant/lib/uploader/types";
export function getAllDepartment() {
    return http.get<ResAllDepartmentData>('/dep/all')
}

export function uploadImg(file: File) {
    let fd = new FormData()
    fd.append('file', file)
    return http.post('/upload', fd)
}