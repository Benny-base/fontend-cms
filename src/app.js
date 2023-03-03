import React from 'react'
import { IntlProvider, history } from 'umi';
import { requestConfig } from '@/utils/request'


// 请求配置
export const request = { ...requestConfig }

// 运行时修改路由
export function patchRoutes(routes) {
    // Modify routes as you wish
}

// 在初始加载和路由切换时做一些事情
export function onRouteChange({ location, routes, action }) {
    
}

// 渲染之前做权限校验
export async function render(oldRender) {
//   if(!UserStore.isLogin){
//     await UserStore.getUserInfo();
//   }
//   if(!UserStore.isLogin) {
//     history.push('/login');
//   }
  oldRender();
}

// 用于在外面包一个 Provider，
// export function rootContainer(container) {
//    return React.createElement(IntlProvider, null, container);
// }