// toekn持久化：Mobx和Vuex有同样的问题，刷新后状态会丢失

const key = 'geek_park'

export const setToken = (token) => {
    return localStorage.setItem(key,token)
}

export const getToken = () => {
    return localStorage.getItem(key)
}

export const removeToken = () => {
    return localStorage.removeItem(key)
}