import type { has, IillnessTime, Type } from "@/enums/consult"

export type Params = {
    type: Type
    current: number
    pageSize: number

}

export interface EmptyObject {
    code: number;
    data: Response;
    message: string;
}
// 返回值类型
export interface Response {
    pageTotal: number;
    rows: Row[];
    total: number;
}

export interface Row {
    /**
     * 开药门诊必有-过敏史0无1有2不清楚
     */
    allergicHistory?: has;
    /**
     * 取消/退款进度
     */
    cancelProcess?: string;
    /**
     * 取消订单原因
     */
    cancelReason?: string;
    /**
     * 取消订单原因文字
     */
    cancelReasonValue?: string;
    /**
     * 找医生/极速问诊必有-是否就诊过0未就诊1就诊过
     */
    consultFlag?: 0 | 1;
    /**
     * 倒计时-1表示计时已过(单位s)
     */
    countdown?: number;
    /**
     * 订单创建时间
     */
    createTime: string;
    /**
     * 咨询的医生--找医生
     */
    docInfo?: DocInfo;
    /**
     * 是否已经评价1 已评价0 未评价
     */
    evaluateFlag: 1 | 0;
    /**
     * 开药门诊必有-生育状态及计划0无1备孕中2已怀孕3哺乳期
     */
    fertilityStatus?: 0 | 1 | 2 | 3;
    /**
     * 订单id
     */
    id: string;
    /**
     * 病情--症状描述
     */
    illnessDesc: string;
    /**
     * 找医生/极速问诊必有-患病时间1一周内2一月内3半年内4半年以上
     */
    illnessTime?: IillnessTime;
    /**
     * 开药门诊必有-肝功能0正常1异常2不清楚
     */
    liverFunction?: 0 | 1 | 2;
    /**
     * 订单编号
     */
    orderNo?: string;
    /**
     * 价格
     */
    payment: number;
    /**
     * 患者id,用于关联患者信息
     */
    patientInfo?: PatientInfo;
    /**
     * 处方id信息
     */
    prescriptionId?: string;
    /**
     * 就诊记录id信息
     */
    recordId: string;
    /**
     * 开药门诊必有-肾功能0正常1异常2不清楚
     */
    renalFunction?: number;
    /**
     * 订单状态：图文问诊或者开药问诊的订单-1待支付2待接诊3咨询中4已完成5已取消/药品订单-10待支付11待发货12待收货13已完成14已取消
     */
    status: Status;
    /**
     * 订单状态：图文问诊或者开药问诊的订单-1待支付2待接诊3咨询中4已完成5已取消/药品订单-10待支付11待发货12待收货13已完成14已取消
     */
    statusValue?: string;
    /**
     * 订单类型1问医生2极速问诊2开药问诊--默认是1
     */
    type?: number;
}

/**
 * 咨询的医生--找医生
 */
export interface DocInfo {
    /**
     * 医生头像
     */
    avatar?: string;
    /**
     * 接诊数量
     */
    consultationNum?: number;
    /**
     * 科室
     */
    depName?: string;
    /**
     * 医院等级
     */
    gradeName?: string;
    /**
     * 医院名称
     */
    hospitalName?: string;
    /**
     * 医生id
     */
    id?: string;
    /**
     * 擅长
     */
    major?: string;
    /**
     * 医生姓名
     */
    name?: string;
    /**
     * 职称
     */
    positionalTitles?: string;
    /**
     * 评分
     */
    score?: number;
    /**
     * 服务费
     */
    serviceFee?: number;
    /**
     * 医生状态0休息中1可以咨询
     */
    status?: number;
}

/**
 * 患者id,用于关联患者信息
 */
export interface PatientInfo {
    /**
     * 患者年龄
     */
    age: string;
    /**
     * 患者性别
     */
    gender: number;
    /**
     * 患者id
     */
    id: string;
    /**
     * 患者证件信息
     */
    idCard: string;
    /**
     * 患者姓名
     */
    name: string;
}

/**
 * 订单状态：图文问诊或者开药问诊的订单-1待支付2待接诊3咨询中4已完成5已取消/药品订单-10待支付11待发货12待收货13已完成14已取消
 */
export enum Status {
    WaitPay = "1",
    WaitDoc = "2",
    Consulting = "3",
    Done = "4",
    Fail = "5",
}