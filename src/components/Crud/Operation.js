import React from 'react'
import { Space } from 'antd'
import { useI18n } from '@/utils'
import * as icons from '@ant-design/icons';

export default (props) => {
    const _t = useI18n()
    const { record, options } = props
    
    const items = [
        ...options?.extraOperation || [],
        {
            label: _t('edit'),
            key: 'edit',
            hidden: options.hideEdit,
            icon: 'EditOutlined',
            action: options.editAction
        },
    ];

    return (
        <Space>
            {
                items.map(t => 
                    !t.hidden && (
                    <a key={t.key} onClick={() => { t.action(record) }}>
                        { t.icon && React.createElement(icons[t.icon])}
                        { t.label }
                    </a>
                ))
            }
        </Space>
    );
}
