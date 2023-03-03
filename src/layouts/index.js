import React from 'react';
import { Layout, Row, Space, Breadcrumb } from 'antd';
import { Redirect } from 'umi'
import cls from './index.less'
import LangDropdown from './item/LangDropdown'
import UserDropdown from './item/UserDropdown'
import SiderMenu from './item/SiderMenu'
import { SettingOutlined } from '@ant-design/icons'
import { _t } from '@/utils'
import _ from 'lodash'

const { Header, Footer, Sider, Content } = Layout;

export default (props) => {
    const { location: { pathname }, route: { routes } } = props
    console.log(routes)

    if(pathname == '/') return <Redirect to="/home" />
    
    let menuItems = handleMenu(routes)
    const activeMenu = findCurrentMenu(menuItems, pathname)

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
                <Sider className={cls.sider} style={{background:'#fff'}}>
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
    let arr = []
    routes.map(t1 => {
        arr.push(
            getItem(
                _t(t1.label), 
                t1.path, 
                <SettingOutlined />, 
                t1.routes?.map(t2 => getItem(_t(t2.label), t2.path, t2.icon))
            )
        )
    })
    return arr
}

function findCurrentMenu(menuItems, pathname){
    let curItem = menuItems.find(t => pathname.includes(t.key))
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
