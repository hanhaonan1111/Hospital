import type { getArticalParams, KnowledgePage } from '@/types/home'
import http from '@/utils/http'

export function getArticalList(params: getArticalParams) {
    return http<any, KnowledgePage>({
        url: '/patient/home/knowledge',
        method: "GET",
        params
    })

}