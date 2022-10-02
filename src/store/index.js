import React from "react";
import login from "./modules/login";

class RootStore{
    constructor() {
        this.loginStore = login
    }
}

const rootstore = new RootStore()
const context = React.createContext(rootstore)
const useStore = () => React.useContext(context)
//导出该函数
export { useStore }