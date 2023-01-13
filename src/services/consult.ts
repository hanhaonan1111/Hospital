import type {
    ResAllDepartmentData, Img, ParamsPay, PesPayData, PartialConsult, payImmediate
} from '@/types/consult'
import type { Patient } from '@/types/user'
import http from '@/utils/http'
import type {
    UploaderFileListItem,
} from "vant/lib/uploader/types";

export function getAllDepartment() {
    return http.get<ResAllDepartmentData>('/dep/all')
}

//上传图片
export function uploadImg(file: File) {
    let fd = new FormData()
    fd.append('file', file)
    return http.post<Img>('/upload', fd)
}

export function PreOrder(query: ParamsPay) {
    return http<PesPayData>({
        url: '/patient/consult/order/pre',
        method: "GET",
        params: query
    })
}

export function findPatientById(id: string) {
    return http.get<Patient>('/patient/info/' + id)
}

export function getOrderId(data: PartialConsult) {
    return http.post<{ id: string }>('/patient/consult/order', data)
}

// 支付[入参]
export function payImmediateParams(query: payImmediate) {
    return http.post<{ payUrl: string }>('/patient/consult/pay', query)
}

export function getOrderDetailAsync(id: string) {
    return http.get('/patient/consult/order/detail?orderId=' + id)

}