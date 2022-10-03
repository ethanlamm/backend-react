import React from "react";
import login from "./modules/login";
import user from "./modules/user";
import channel from "./modules/channel";

class RootStore{
    constructor() {
        this.loginStore = login
        this.userStore = user
        this.channelStore=channel
    }
}

const rootstore = new RootStore()
const context = React.createContext(rootstore)
const useStore = () => React.useContext(context)
//导出该函数
export { useStore }