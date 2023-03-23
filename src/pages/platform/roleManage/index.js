import cls from './index.less';
import { Crud } from '@/components'
import { RoleStore } from '@/stores'
import { wait, getOptions } from '@/utils'


const Page = () => {
    const options = {
        api: RoleStore.getList,
        showRowSelection: true,
        table: {

        },
        add: {
            show: true,
            api: RoleStore.addRole,
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
            title: '名字',
            key: 'name',
            formType: 'input',
            addDisplay: true,
            editDisplay: true,
            rules: [{ required: true }]
        },
        {
            title: '备注',
            key: 'remark',
            formType: 'text-area',
            addDisplay: true,
            editDisplay: true,
            span: 24,
        },
        {
            title: '菜单',
            key: 'menus',
            formType: 'treeSelect',
            addDisplay: true,
            editDisplay: true,
            width: 250,
            ellipsis: true,
            attribute: {
                treeCheckable: true,
                allowClear: true,
                showArrow: true,
                maxTagCount: 'responsive'
            },
            opts: {
                ...getOptions({pageIndex: 1, limit: 200}, '/api/v1/menus/menusList'),
                enum: { label: 'label', value: 'key' }
            }
        },
    ]

   return (
        <div>
            <Crud columns={columns} options={options} />
        </div>
   );
}

Page.label = 'roleManage'

export default Page