
export interface Datum {
    /**
     * 绘话时间
     */
    createTime?: string;
    items?: Item[];
    /**
     * 订单id-关联业务id
     */
    orderId?: string;
    /**
     * 绘话id-socket链接id
     */
    sid?: string;
}

export interface Item {
    /**
     * 发送人
     */
    from?: string;
    /**
     * 聊天消息id
     */
    id?: string;
    /**
     * 聊天内容信息
     */
    msg?: Msg;
    /**
     * 消息的类型1文字
     * 21卡片-患者病情 22卡片-处方信息 23未提交评价24已提交评价
     * 31通知-普通通知（白底黑色）32通知-温馨提示33通知-订单取消（灰色底黑字）4图片
     */
    msgType?: number;
    /**
     * 接收人
     */
    to?: string;
}

/**
 * 聊天内容信息
 */
export interface Msg {
    /**
     * msgType为21 卡片-患者病情
     */
    consultRecord?: ConsultRecord;
    /**
     * 文本类型内容-msgType为1或者3
     */
    content?: string;
    /**
     * msgType为24-卡片已提交评论
     */
    "evaluateDoc\t"?: EvaluateDoc;
    /**
     * msgType为4
     */
    picture?: MsgPicture;
    /**
     * msgType为22-处方信息-cardType为2有值
     */
    prescription?: Prescription;
}

/**
 * msgType为21 卡片-患者病情
 */
export interface ConsultRecord {
    /**
     * 开药门诊-过敏史0无1有2不清楚
     */
    allergicHistory?: number;
    /**
     * 找医生/极速问诊-是否就诊过0未就诊1就诊过
     */
    consultFlag?: number;
    /**
     * 订单创建时间
     */
    createTime?: string;
    /**
     * 开药门诊-生育状态及计划0无1备孕中2已怀孕3哺乳期
     */
    fertilityStatus?: number;
    /**
     * 订单id
     */
    id?: string;
    /**
     * 病情--症状描述
     */
    illnessDesc?: string;
    /**
     * 找医生/极速问诊-患病时间1一周内2一月内3半年内4半年以上
     */
    illnessTime?: number;
    /**
     * 开药门诊-肝功能0正常1异常2不清楚
     */
    liverFunction?: number;
    /**
     * 处方的药品列表信息--开药问诊才有[ 处方的药品信息 ][ 处方的药品信息 ]
     */
    medicines?: ConsultRecordMedicine[];
    /**
     * 订单编号
     */
    orderNo?: string;
    /**
     * 患者id,用于关联患者信息
     */
    patientInfo?: PatientInfo;
    /**
     * 图片集合
     */
    pictures: PictureElement[];
    /**
     * 开药门诊-肾功能0正常1异常2不清楚
     */
    renalFunction?: number;
    /**
     * 订单类型1问医生2极速问诊3开药问诊4药品订单
     */
    type?: string;
}

/**
 * 处方的药品信息
 */
export interface ConsultRecordMedicine {
    /**
     * 主键id
     */
    id: string;
    /**
     * 药品名称
     */
    name: string;
    /**
     * 药品数量
     */
    quantity: number;
    /**
     * 药品规格
     */
    specs: string;
    /**
     * 药品用法用量
     */
    usageDosag: string;
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

export interface PictureElement {
    id: string;
    url: string;
}

/**
 * msgType为24-卡片已提交评论
 */
export interface EvaluateDoc {
    /**
     * 评价内容
     */
    content: string;
    /**
     * 评价时间
     */
    createTime: string;
    /**
     * 评价人
     */
    creator: string;
    /**
     * 评价主键
     */
    id: string;
    /**
     * 评价分数
     */
    score: number;
}

/**
 * msgType为4
 */
export interface MsgPicture {
    /**
     * id
     */
    id: string;
    /**
     * 图片url
     */
    url: string;
}

/**
 * msgType为22-处方信息-cardType为2有值
 */
export interface Prescription {
    /**
     * 患者年龄
     */
    age?: string;
    /**
     * 开方时间
     */
    createTime?: string;
    /**
     * 诊断信息
     */
    diagnosis?: string;
    /**
     * 患者的性别
     */
    gender?: number;
    /**
     * 主键id-处方id
     */
    id?: string;
    /**
     * 处方的药品信息
     */
    medicines?: PrescriptionMedicine[];
    /**
     * 患者姓名
     */
    name?: string;
    /**
     * 订单id信息
     */
    orderId?: string;
    /**
     * 就诊记录id
     */
    recordId?: string;
    /**
     * 1-未购买，2-已购买，3-已失效
     */
    status?: number;
}

export interface PrescriptionMedicine {
    /**
     * 药品价格
     */
    amount: string;
    /**
     * 药品图片
     */
    avatar: string;
    /**
     * 主键id
     */
    id: string;
    /**
     * 药品名称
     */
    name: string;
    /**
     * 是否是处方药0不是1是
     */
    prescriptionFlag: string;
    /**
     * 药品数量
     */
    quantity: number;
    /**
     * 药品规格
     */
    specs: string;
    /**
     * 药品用法用量
     */
    usageDosag: string;
}
