import { Space, message, Dropdown } from 'antd'
import { useI18n } from '@/utils'
import { DownOutlined } from '@ant-design/icons';

export default (props) => {
    const _t = useI18n()
    const { record, options } = props

    const onClick = ({ key }) => {
        if(key == 'edit'){
            options.editAction?.(record)
        }
    };
    
    const defaultItems = [
        {
            label: _t('edit'),
            key: 'edit',
            display: !!options.editDisplay
        },
        // {
        //     label: _t('delete'),
        //     key: 'delete',
        //     display: !!options.deleteDisplay
        // },
    ];

    const items = defaultItems.filter(item => item.display)

    return (
        <Dropdown menu={{ items, onClick }} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
                <Space size={3}>
                    { _t('operation') }
                    <DownOutlined />
                </Space>
            </a>
        </Dropdown>
    );
}
