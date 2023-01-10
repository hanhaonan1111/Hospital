import type { IllnessType, IillnessTime, isNormal, has, Status } from "@/enums/consult"

// 极速问诊(入参)
type Img = { id: string, url: string }
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