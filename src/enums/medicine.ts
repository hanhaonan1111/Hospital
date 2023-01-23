export enum Status {
    WaitingPay = 10,
    WaitingSendGoods,
    GetGoods,
    OrderSuccess,
    OrderCancel
}
export enum MedicineExpressStatus {
    SendGoods = 1,//已发货
    Received, //已揽件
    Sending, //运输中
    Giving, // 派送中
    Done
}