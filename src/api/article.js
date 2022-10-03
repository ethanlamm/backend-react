import request from "@/utils/request";

/**
 * 频道数据
 */
export const getChannel= () => {
    return request('/channels', 'get')
}