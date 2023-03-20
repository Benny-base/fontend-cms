import cls from './index.less';
import { Crud } from '@/components'
import { MenuStore } from '@/stores'
import { getOptions } from '@/utils'

const Page = () => {
    const options = {
        api: MenuStore.getList,
        showRowSelection: true,
        table: {
            rowKey: 'key'
        },
        add: {
            show: true,
            api: MenuStore.addMenu
        },
        delete: {
            show: true,
        },
        search: {
            show: false
        }
    }
      
    const columns = [
        {
            title: 'id',
            key: 'id',
        },
        {
            title: '上级菜单',
            key: 'parent_key',
            formType: 'select',
            addDisplay: true,
            editDisplay: true,
            hide: true,
            attribute: {
                allowClear: true
            },
            opts: {
                ...getOptions({}, '/api/v1/menus/menuKeys'),
                enum: { label: 'label', value: 'key' }
            }
        },
        {
            title: '菜单名称',
            key: 'label',
            formType: 'input',
            addDisplay: true,
            editDisplay: true,
            rules: [{ required: true }]
        },
        {
            title: '菜单标识',
            key: 'key',
            formType: 'input',
            addDisplay: true,
            editDisplay: true,
            rules: [{ required: true }]
        },
        {
            title: '排序',
            key: 'sort',
            formType: 'input-number',
            addDisplay: true,
            editDisplay: true,
        },
    ]

   return (
        <div>
            <Crud columns={columns} options={options} />
        </div>
   );
}

Page.label = 'menuManage'

export default Page