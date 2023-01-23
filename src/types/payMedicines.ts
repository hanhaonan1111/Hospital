// 药品数据信息
export type medicine = {
    "id": string,
    "name": string,
    "amount": string,
    "avatar": string,
    "specs": string,
    "usageDosag": string,
    "prescriptionFlag": 0 | 1,
    "quantity": number
}
//根据处方信息计算药款
export interface medicineOrder {
    "id": string,
    "pointDeduction": 0,
    "couponDeduction": 0,
    "couponId": string,
    "payment": 0,
    "expressFee": 0,
    "actualPayment": 0,
    "medicines": medicine[]
}

// 收货地址
export type getAddress = {
    "id": string,
    "receiver": string,
    "addressDetail": string,
    "isDefault": 0 | 1, //1为是，0为否
    "mobile": string,
    "province": string,
    "city": string,
    "county": string
}
export type resGetAddress = getAddress