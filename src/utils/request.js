import axios from "axios";
// 实例化
const instance = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0',
    timeout:5000
})

// 请求拦截
instance.interceptors.request.use(
    config => {
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
        return response
    },
    // 不是 2xx 范围内的回调函数
    error => {
        return Promise.reject(error)
    }
)

/**
 * 请求工具函数
 * @params {String} url 		请求路径
 * @params {String} method 		请求方式
 * @params {参考文档} submitData  请求参数
 */
export default (url,method,submitData) => {
    return instance({
        url,
        method,
        [method.toLowerCase() === 'get'?'params': 'data']: submitData
    })
}
