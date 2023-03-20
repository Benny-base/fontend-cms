import React from 'react';
import { Menu, Row } from 'antd';
import { history } from 'umi'

export default (props) => {
    const { menuItems, activeMenu } = props
    
    const onClick = (e) => {
        history.push(e.key)
    }

    return (
        <Menu
            // theme={'dark'}
            onClick={onClick}
            mode="inline"
            items={menuItems}
            defaultSelectedKeys={[activeMenu.selectedKey]}
            defaultOpenKeys={[activeMenu.openKey]}
        />
    );
}



