import React from "react";
import login from "./modules/login";
import user from "./modules/user";

class RootStore{
    constructor() {
        this.loginStore = login
        this.userStore=user
    }
}

const rootstore = new RootStore()
const context = React.createContext(rootstore)
const useStore = () => React.useContext(context)
//导出该函数
export { useStore }