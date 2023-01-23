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
export type getAddressMediciens = {
    "id": string,
    "receiver": string,
    "addressDetail": string,
    "isDefault": 0 | 1, //1为是，0为否
    "mobile": string,
    "province": string,
    "city": string,
    "county": string
}
export type resGetAddress = getAddressMediciens[]

export type OrderInfoMedicine = {
    "id": string,
    "orderNo": string,
    "type": number,
    "createTime": string,
    "prescriptionId": string,
    "status": number,
    "statusValue": string,
    "cancelReason": string,
    "cancelReasonValue": string,
    "cancelProcess": string,
    "medicines": medicine[],
    "countdown": number,
    "addressInfo": Partial<getAddressMediciens>,
    "expressInfo": {
        "content": string,
        "time": string
    },
    "payTime": string,
    "paymentMethod": number,
    "payment": string,
    "couponDeduction": number,
    "expressFee": number,
    "actualPayment": number,
    "roomId": string
}
//经纬度
interface LanAndLon {
    "latitude": string,
    "longitude": string
}
// 快递信息
export interface expressInfo {
    "estimatedTime": string,
    "name": 0,
    "awbNo": string,
    "status": string,
    "statusValue": string,
    "currentLocationInfo": LanAndLon,
    "logisticsInfo": LanAndLon[],
    "list": [
        {
            "id": string,
            "content": string,
            "createTime": string,
            "status": string,
            "statusValue": string
        }
    ]
}
