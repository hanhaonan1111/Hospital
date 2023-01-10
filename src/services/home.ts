import type { getArticalParams, KnowledgePage, PageParams, DoctorPage, followDoc, followDocRes } from '@/types/home'
import http from '@/utils/http'

export function getArticalList(params: getArticalParams) {
    return http<any, KnowledgePage>({
        url: '/patient/home/knowledge',
        method: "GET",
        params
    })

}

export function getDoctorList(params: PageParams) {
    return http<any, DoctorPage>({
        url: '/home/page/doc',
        params,
        method: "GET"
    })
}

export function followDoc(data: followDoc) {
    return http<any, followDocRes>({ url: '/like', method: "POST", data })
}
