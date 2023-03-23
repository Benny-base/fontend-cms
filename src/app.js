import React from 'react'
import { IntlProvider, history } from 'umi';
import { requestConfig } from '@/utils/request'
import { UserStore } from '@/stores'
import { readSetting } from '@/utils'

let routesList = []

const defaultRoute = ['/signIn', '/home', '/404']

// 请求配置
export const request = { ...requestConfig }

// 渲染之前做权限校验
export async function render(oldRender) {
    window.umi_render = (routes) => {
        routesList = routes
        oldRender();
    }
    UserStore.setToken(readSetting('token'))
    const res = await UserStore.getUserInfo();
    if(!res.code){
        UserStore.setInfo(res.data)
    }
    window.umi_render(res.data?.routes || []);
}

// 运行时修改路由
export function patchRoutes({ routes }) {
    // 菜单栏
    routes[0].routes = routes[0].routes.filter(item => routesList.includes(item.path) || defaultRoute.includes(item.path))
}

// 在初始加载和路由切换时做一些事情
export function onRouteChange({ location, routes, action }) {
    if(location.pathname == '/') return
    
    if(!routes[0].routes?.some(item => item.path == location.pathname)){
        history.replace('/404')
    }
}


// 用于在外面包一个 Provider，
// export function rootContainer(container) {
//    return React.createElement(IntlProvider, null, container);
// }