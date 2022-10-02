import { makeAutoObservable } from 'mobx'
import { userLogin } from '@/api/user'

class LoginStore {
    // state
    token = ''

    // 实现数据响应式处理
    constructor() {
        makeAutoObservable(this)
    }

    // actions
    setToken = async ({ mobile, code }) => {
        const { data } = await userLogin(mobile, code)
        this.token = data.token
    }
}

export default new LoginStore()