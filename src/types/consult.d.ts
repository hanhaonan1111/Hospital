import type { IllnessType, IillnessTime, isNormal, has, Status } from "@/enums/consult"
import type { Type } from "@/enums/consult"

// 极速问诊(入参)
export type Img = { id: string, url: string }
export type ConsultParams = {
    type: Type,
    // 优惠劵
    couponId: string,
    illnessType: IllnessType,
    patientId: string,
    depId: string,
    illnessDesc: string,
    illnessTime: IillnessTime
    consultFlag: 0 | 1,
    liverFunction: isNormal
    renalFunction: isNormal
    allergicHistory: has
    fertilityStatus: Status
    docId: string
    pictures: Img[]
    medicines: { id: string, quantity: number }[]
}

export type PartialConsult = Partial<ConsultParams>

export type ResAllDepartmentData = {
    id: string; name: string, child: { id: string; name: string }[]
}[]

// 上传图片返回值
export type uploadImg = {
    data?: Img
} & {
    code: number,
    message: string
}

// 获取所有科室返回值
export type allDepRes = {
    data?: Data
} & {
    code: number,
    message: string
}


// 极速问诊-支付页面[入参]
export type ParamsPay = {
    type: Type
    illnessType?: IllnessType | undefined
    useCoupon?: '1' | '0' | undefined
    couponId?: '' | undefined
    docId?: '1' | undefined
}

export type PesPayData = {
    type?: Type
    illnessType?: IllnessType
    payment: number
    pointDeduction: number
    couponDeduction: number
    couponId?: string
    actualPayment: number
}
//[出参]
export type PesPay = {
    data: PesPayData
}

// 支付[入参]
export type payImmediate = {
    paymentMethod: 1,
    orderId: string
    payCallback: string
}