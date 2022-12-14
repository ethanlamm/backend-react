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

/**
 * 删除文章
 * @params {String} id 文章id
 */
export const deleteArticle = (id) => {
    return request(`/mp/articles/${id}`, 'delete')
}

/**
 * 新增文章
 * @params {String} params 参考文档
 */
export const addArticle = (params) => {
    return request('/mp/articles', 'post',params)
}

/**
 * 获取文章详情
 * @params {String} params 参考文档
 */
export const getArticleDetail = (id) => {
    return request(`/mp/articles/${id}`, 'get')
}

/**
 * 更新文章
 * @params {String} id 文章id
 */
export const updateArticle = (id,params) => {
    return request(`/mp/articles/${id}`, 'put', params)
}