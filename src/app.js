import React from 'react'
import { IntlProvider, history } from 'umi';
import { requestConfig } from '@/utils/request'
import { UserStore } from '@/stores'
import { readSetting } from '@/utils'

let routesList = []

const defaultRoute = ['/signIn', '/home', '/notFound']

// 请求配置
export const request = { ...requestConfig }

// 渲染之前做权限校验
export async function render(oldRender) {
    UserStore.setToken(readSetting('token'))
    const res = await UserStore.getUserInfo();
    routesList = res.data?.routes || []
    oldRender();
}

// 运行时修改路由
export function patchRoutes({ routes }) {
    // 菜单栏
    routes[0].routes = routes[0].routes.filter(item => routesList.includes(item.path) || defaultRoute.includes(item.path))
}

// 在初始加载和路由切换时做一些事情
export function onRouteChange({ location, routes, action }) {
    if(!routes[0].routes?.some(item => item.path == location.pathname)){
        history.replace('/notFound')
    }
}


// 用于在外面包一个 Provider，
// export function rootContainer(container) {
//    return React.createElement(IntlProvider, null, container);
// }