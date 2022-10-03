import request from "@/utils/request";

/**
 * 频道数据
 */
export const getChannel= () => {
    return request('/channels', 'get')
}

/**
 * 文章列表
 */
export const getArticles = (params) => {
    return request('/mp/articles', 'get',params)
}