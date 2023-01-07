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