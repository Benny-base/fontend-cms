import cls from './index.less';
import { Crud } from '@/components'
import { RoleStore } from '@/stores'
import { wait } from '@/utils'


const Page = () => {
    const options = {
        api: RoleStore.getList,
        showRowSelection: true,
        table: {

        },
        add: {
            show: true,
            api: RoleStore.addRole
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
            title: '标识',
            key: 'key',
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
            formType: 'select',
            addDisplay: true,
            editDisplay: true,
            opts: {
                data: [{ label: 'abc', value: '1' },{ label: 'def', value: '2' },{ label: 'gds', value: '3' }]
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