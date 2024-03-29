import React, { useState } from 'react';
import { Dropdown, Menu } from 'antd';
import cls from './index.less'
import { useI18n } from '@/utils'

export default (props) => {
    const _t = useI18n()

    let arr = [
        { text: _t('mine') },
        { text: _t('setting') },
    ]
    
    const handleClick = (item) => {
        console.log(item)
    }

    const langArr = arr.map((item, index) => {
        return {
            label: <a onClick={() => handleClick(item)}>{ item.text }</a>,
            key: index
        }
    })


    return (
        <Dropdown menu={{items:langArr}}>
            <a>{ 'User' }</a>
        </Dropdown>
    );
}
