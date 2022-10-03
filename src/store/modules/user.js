import { makeAutoObservable,runInAction } from 'mobx'
import { userInfo } from '@/api/user'
class UserStore {
    // state
    userInfo={}

    // 实现数据响应式处理
    constructor() {
        makeAutoObservable(this)
    }

    // actions
    getUserInfo = async () => {
        const { data } = await userInfo()
        runInAction(() => {
            this.userInfo = data
        })
        
        // 本地存储
    }
}

export default new UserStore()