import React, { useState } from 'react';
import { Dropdown } from 'antd';
import cls from './index.less'
import { langList } from '@/utils'
import { setLocale } from 'umi';

export default (props) => {

    const handleClick = (item) => {
        setLocale(item.lang, true)
    }

    const langArr = langList.map((item, index) => {
        return {
            label: <a onClick={() => handleClick(item)}>{ item.text }</a>,
            key: index
        }
    })


    return (
        <Dropdown menu={{items: langArr}}>
            <a>{ 'lang' }</a>
        </Dropdown>
    );
}
