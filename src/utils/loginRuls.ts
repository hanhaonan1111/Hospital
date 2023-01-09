export const mobileRules = [
    { required: true, message: '手机号为必填项' },
    { pattern: /^1[3-9]\d{9}$/, message: '手机号码格式不正确' }
]
export const pwdRules = [
    { required: true, message: '密码为必填项' },
    { pattern: /^\w{8,20}$/, message: '密码必须有8到20个字符组成' }
]
export const codeRules = [
    { required: true, message: '验证码为必填项' },
    { pattern: /^\d{6}$/, message: '验证码格式不正确' }
]

export const addPatientNameRules = [
    { required: true, message: '姓名为必填项' },
    { pattern: /^[\u4e00-\u9fa5·]{2,16}$/, message: '姓名格式不正确' }
]

export const addPatientIdcardRules = [
    { required: true, message: '身份证为必填项' },
    { pattern: /^(\d{18}|\d{17}X)$/, message: '身份证格式不正确' }
]

