import { makeAutoObservable } from 'mobx'
import { userLogin } from '@/api/user'
import {getToken,setToken} from '@/utils/token'
class LoginStore {
    // state
    token = getToken() || ''

    // 实现数据响应式处理
    constructor() {
        makeAutoObservable(this)
    }

    // actions
    setToken = async ({ mobile, code }) => {
        const { data } = await userLogin(mobile, code)
        this.token = data.token
        // 本地存储
        setToken(this.token)
    }
}

export default new LoginStore()