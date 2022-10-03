import { makeAutoObservable,runInAction } from 'mobx'
import { getChannel } from '@/api/article'

class ChannelStore {
    channelList = []
    constructor() {
        makeAutoObservable(this)
    }

    getChannelList = async() => {
        const { data } = await getChannel()
        runInAction(() => {
            this.channelList = data.channels
        })
    }
}

export default new ChannelStore()