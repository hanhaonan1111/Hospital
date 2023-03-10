export type User = {
    token: string
    id: string
    account: string
    mobile: string
    avatar: string
};

export type params = {
    mobile: string,
    password: string
}
export type Codeparams = {
    mobile: string,
    code: string
}

export type info = Omit<User, 'token'>

export type consultationInfo = Pick<User, 'id'> & Pick<User, 'avatar'> & {
    name: string
    depName: string
    positionalTitles: string
    hospitalName: string
    gradeName: string
    orderId: string
}

export interface orderInfo {
    paidNumber: number
    receivedNumber: number
    shippedNumber: number
    finishedNumber: number
}

export type UserInfo = Omit<User, 'token'> & {
    likeNumber: number
    collectionNumber: number
    score: number
    couponNumber: number
    consultationInfo: consultationInfo[]
    orderInfo: orderInfo
}

export type Patient = {
    name: string
    idCard: string
    defaultFlag: 0 | 1
    gender: 0 | 1,
    age?: number,
    genderValue?: string
    id?: string | undefined
}
export type HomeFiles = Array<Patient>


