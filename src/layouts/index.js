import React from 'react';
import { Layout, Row, Space, Breadcrumb } from 'antd';
import { Redirect } from 'umi'
import cls from './index.less'
import LangDropdown from './item/LangDropdown'
import UserDropdown from './item/UserDropdown'
import SiderMenu from './item/SiderMenu'
import * as icons from '@ant-design/icons'
import { useI18n } from '@/utils'
import _ from 'lodash'

const { Header, Footer, Sider, Content } = Layout;

export default (props) => {
    const { location: { pathname }, route: { routes } } = props

    if(pathname == '/') return <Redirect to="/home" />
    else if(pathname == '/signIn') return <div>{ props.children }</div>
    
    let menuItems = handleMenu(routes)
    const activeMenu = findCurrentMenu(menuItems, pathname)
    // console.log(routes)
    // console.log(menuItems)

    return (
        <Layout>
            <Header className={cls.header}>
                <Row className={cls.logo}>logo.png</Row>
                <Row>
                    <Space size={'middle'}>
                        <UserDropdown />
                        <LangDropdown />
                    </Space>
                </Row>
            </Header>

            <Layout>
                <Sider breakpoint="md" theme={'light'} className={cls.sider}>
                    <SiderMenu menuItems={menuItems} activeMenu={activeMenu} />
                </Sider>
                <Layout>
                    <Row className={cls.bread}>
                        <Breadcrumb>
                            { activeMenu.breadName.map((name, i) => <Breadcrumb.Item key={'bread'+i}>{name}</Breadcrumb.Item>) }
                        </Breadcrumb>
                    </Row>
                    <Content className={cls.content}>
                        <div className={cls.children}>
                            { props.children }
                        </div>
                    </Content>
                    {/* <Footer style={{border: '1px solid red'}}></Footer> */}
                </Layout>
            </Layout>
        </Layout>
    );
}

function getItem(label, key, icon, children, type) {
    return { label, key, icon, children, type }
}

// 处理routes
function handleMenu(routes){
    const _t = useI18n()
    let arr = []
    routes.map(t1 => {
        if(t1.hidden) return    // 不显示在菜单
        if(!t1.path) return     // 增加404.js 多了一个无path的route 忽略它
        // 处理层级菜单
        let names = t1.path.split('/').slice(1)
        let firstKey = `/${names.at(0)}`
        if(names.length == 1) return arr.push(getItem(_t(t1.label), t1.path, t1.icon && React.createElement(icons[t1.icon])))  // 菜单栏只有一层 没有children

        let firstMenu = arr.find(item => firstKey.includes(item.key))
        if(firstMenu) firstMenu.children.push(getItem(_t(t1.label), t1.path))
        else arr.push(getItem(_t(names.at(0)), firstKey, t1.icon && React.createElement(icons[t1.icon]), [ getItem(_t(t1.label), t1.path) ]))
    })
    return arr
}

function findCurrentMenu(menuItems, pathname){
    let curItem = menuItems.find(t => pathname.includes(t.key)) || {}
    let curChil = ''
    menuItems.map(t => { 
        t.children?.map(t2 => {
            if(t2.key == pathname) curChil = t2.label
        })
    })
    return {
        openKey: curItem.key,
        selectedKey: pathname,
        breadName: [curItem.label, curChil]
    }
}
