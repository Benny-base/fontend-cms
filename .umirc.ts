import { defineConfig } from 'umi';

const domain = {
    'dev': 'http://127.0.0.1:80',
    'prod': 'http://127.0.0.1:81'
}

export default defineConfig({
    title: 'Admin',
    locale: {
        default: 'zh-CN',
    },
    nodeModulesTransform: {
        type: 'none',
    },
    history: {
        type: 'hash',
    },
    proxy: {
        '/cms/api': {
            target: domain[process.env.UMI_ENV],
            changeOrigin: true,
        },
    },
    routes: [
        { path: '/signIn', component: '@/pages/signIn' },
        {
            path: '/',
            component: '@/layouts',
            routes: [
                { exact: true, path: '/home', component: '@/pages/home', label: 'home' },
                { 
                    path: '/platform', 
                    label: 'platform',
                    routes: [
                        { exact: true, path: '/platform/menuManage', component: '@/pages/platform/menuManage', label: 'menuManage' },
                        { exact: true, path: '/platform/roleManage', component: '@/pages/platform/roleManage', label: 'roleManage' },
                    ]
                },
            ],
        }, 
    ],
    fastRefresh: {},
    mfsu: {}, // 优化dev启动时间 热更新
});
