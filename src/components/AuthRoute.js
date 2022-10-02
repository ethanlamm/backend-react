// react 路由鉴权

// 高阶组件：把一个组件当成另外一个组件的参数传入，然后通过一定的判断返回新的组件

import { getToken } from '@/utils/token'
// 重定向组件
import {Navigate } from 'react-router-dom'

export default function AuthRoute({children}) {
    const token = getToken()
    if (token) {
        return <>{ children}</>
    } else {
        return <Navigate to='/login'></Navigate>    
    }
}

// <AuthRoute> <Layout/> </AuthRoute>
// 登录：<><Layout/></>
// 非登录：<Navigate to="/login" replace />