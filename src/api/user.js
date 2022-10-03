import request from "@/utils/request";

/**
 * 用户登录
 * @params {String} mobile  手机号
 * @params {String} code  验证码(246810)
 */
export const userLogin = (mobile, code) => {
    return request('/authorizations','post', { mobile, code })
}

/**
 * 用户信息
 * @params {String} mobile  手机号
 * @params {String} code  验证码(246810)
 */
export const userInfo = () => {
    return request('/user/profile', 'get')
}