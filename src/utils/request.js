import axios from "axios";
import {getToken,removeToken} from '@/utils/token'
import {message} from 'antd'
// 实例化
const instance = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0',
    timeout:5000
})

// 请求拦截
instance.interceptors.request.use(
    config => {
        const token = getToken()
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截
instance.interceptors.response.use(
    // 2xx 范围内的回调函数
    response => {
        return response.data
    },
    // 不是 2xx 范围内的回调函数
    error => {
        // 后端处理失效的token，给前端返回401，前端通过拦截401状态码，清空失效信息，重新跳转至登录页
        // console.log(error);
        if (error.response.status === 401) {
            removeToken()
            message.warn(error?.response?.data?.message || '用户信息过期，请重新登录',
                2,
                () => {
                window.location.reload()
            })
        }
        return Promise.reject(error)
    }
)

/**
 * 请求工具函数
 * @params {String} url 		请求路径
 * @params {String} method 		请求方式
 * @params {参考文档} submitData  请求参数
 */
const request= (url,method,submitData) => {
    return instance({
        url,
        method,
        [method.toLowerCase() === 'get'?'params': 'data']: submitData
    })
}
export default request
