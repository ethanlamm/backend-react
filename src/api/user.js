import request from "@/utils/request";

/**
 * 用户登录
 * @params {String} mobile  手机号
 * @params {String} code  验证码(246810)
 */
export const userLogin = (mobile, code ='246810') => {
    return request('/authorizations', 'post', { mobile, code })
}