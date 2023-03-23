import cls from './index.less';
import { Crud } from '@/components'
import { EnumerateStore } from '@/stores'
import { wait } from '@/utils'
import dayjs from 'dayjs'

const Page = () => {
    const options = {
        api: EnumerateStore.getList,
        showRowSelection: true,
        table: {

        },
        add: {
            show: true,
            // api: RoleStore.addRole
        },
        delete: {
            show: true,
        },
        search: {
            // show: false
        },
        operation: {
            
        }
    }
      
    const columns = [
        {
            title: '名称',
            key: 'label',
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
            title: '排序',
            key: 'sort',
            formType: 'input-number',
            addDisplay: true,
            editDisplay: true,
        },
        {
            title: '创建时间',
            key: 'createdAt',
            render: (date) => dayjs(date).format('YYYY-MM-DD HH:mm:ss')
        },
    ]

   return (
        <div>
            <Crud columns={columns} options={options} />
        </div>
   );
}

Page.label = 'enumManage'

export default Page