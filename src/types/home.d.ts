export type KnowledgeType = 'like' | 'recommend' | 'fatReduction' | 'food'

export type getArticalParams = {
    type: KnowledgeType
    current: number
    pageSize: number
}
// 文章信息类型
export type Knowledge = {
    id: string
    title: string
    coverUrl: string[]
    topic: string
    collectionNumber: number
    commentNumber: number
    creatorName: string
    creatorAvatar: string
    creatorHospatalName: string
    likeFlag: 0 | 1
    content: string
    creatorDep: string
    creatorTitles: string
    creatorId: string
}

// 文章列表
export type KnowledgeList = Knowledge[]

// 文章列表带分页
export type KnowledgePage = {
    data: {
        pageTotal: number
        total: number
        rows: KnowledgeList
    }
    message?: string
    code?: number
}

