import { useEffect, useState, useRef } from 'react'
import cls from './index.less';
import { Table, Button, Space, message, Drawer } from 'antd'
import OperationDropdown from './OperationDropdown'
import SearchList from './SearchList'
import { MyForm } from '@/components'
import { useI18n } from '@/utils'
import _ from 'lodash'

export default (props) => {
    const _t = useI18n()
    const formRef = useRef(null)
    const [ dataSource, setDataSource ] = useState([]);
    const [ selectedRowKeys, setSelectedRowKeys ] = useState([]);
    const [ searchParams, setSearchParams ] = useState({ pageIndex: 1, limit: 10 });
    const [ drawer, setDrawer ] = useState({ visible: false, type: 'add' });
    const { columns = [], options = {
        api: undefined,                 // 列表的api
        table: {},                      // 设置默认API 其他看Ant Design -> Table组件
        add: {},                        // 新增按钮
        delete: {},                     // 删除按钮
        showRowSelection: false,        // 显示行选择
        operation: {},                  // 配置操作列
        pagination: {},                 // 设置默认API 其他看Ant Design -> Pagination组件
        search: {},                     // 搜索相关配置
        form: {},                       // 表单相关配置
        beforeOpenAdd: Function,        // 新增 Drawer 打开前func
        beforeOpenEdit: Function,       // 编辑 Drawer 打开前func
    } } = props

    const rowSelection = {
        selectedRowKeys,
        onChange: setSelectedRowKeys,
    }

    useEffect(() => {
        getList()
    }, [searchParams])

    const getList = async() => {
        const res = await defaultOptions.api(searchParams)
        if(res.code) return
        setDataSource(res.data.list)
    }

    const handleFormSubmit = async(values) => {
        console.log(values)
        if(drawer.type == 'add'){
            defaultOptions.add.api?.(values)
        }
        else if(drawer.type == 'edit'){

        }
        handleDrawerClose()
    }

    const handleSearch = (params) => {
        setSearchParams({ ...searchParams, pageIndex: 1,  ...params })
    }

    const handleDelete = () => {
        if(_.isEmpty(selectedRowKeys)) return message.error(_t('selectLeastOneItem'))
        console.log(selectedRowKeys)
    }

    const handleDrawerOpen = (type) => {
        setDrawer({ ...drawer, visible: true, type })
    }

    const handleDrawerClose = async() => {
        setDrawer({ ...drawer, visible: false })
        formRef.current.reset()
    }

    const handleAddAction = async() => {
        await defaultOptions.beforeOpenAdd?.()
        handleDrawerOpen('add')
    }

    const handleEditAction = async(record) => {
        await defaultOptions.beforeOpenEdit?.(record)
        handleDrawerOpen('edit')
    }

    const defaultOptions = {
        api: options.api,
        table: {
            rowKey: 'id',
            size: 'middle',
            rowSelection: options.showRowSelection ? rowSelection : undefined,
            ...options.table
        },
        pagination: {
            current: searchParams.pageIndex,
            pageSize: searchParams.limit,
            size: 'middle',
            showQuickJumper: true,
            onChange: (pageIndex, limit) => { setSearchParams({ ...searchParams, pageIndex, limit }) },
            ...options.pagination
        },
        add: {
            show: false,
            ...options.add
        },
        delete: {
            show: false,
            ...options.delete
        },
        operation: {
            show: true,
            // title: _t('operation'),
            fixed: 'right',
            width: 100,
            editDisplay: true,
            editAction: handleEditAction,
            render: (record) => <OperationDropdown record={record} options={defaultOptions.operation} />,
            ...options.operation
        },
        search: {
            show: true,
            ...options.search
        },
        form: {
            showSubmit: false,
            showReset: false,
            ...options.form
        },
        beforeOpenAdd: options.beforeOpenAdd,
        beforeOpenEdit: options.beforeOpenEdit,
    }

    return (
        <div>
            { defaultOptions.search.show && <SearchList columns={columns} options={defaultOptions.search} submit={handleSearch} /> }

            <Space size={'middle'} className={cls.space}>
                { defaultOptions.add.show && <Button type="primary" onClick={handleAddAction}>{ _t('add') }</Button> }
                { defaultOptions.delete.show && <Button type="primary" danger onClick={handleDelete}>{ _t('delete') }</Button> }
            </Space>

            <Table dataSource={dataSource} {...defaultOptions.table} pagination={defaultOptions.pagination}>
                {
                    columns.map(item => !item.hide && (<Table.Column dataIndex={item.key} {...item} />))
                }
                { defaultOptions.operation.show && <Table.Column dataIndex={'operation'} {...defaultOptions.operation}></Table.Column> }
            </Table>

            <Drawer
                title={_t(drawer.type)}
                width={720}
                onClose={handleDrawerClose}
                open={drawer.visible}
                bodyStyle={{ paddingBottom: 80 }}
                extra={
                    <Space size={'middle'}>
                        <Button onClick={handleDrawerClose}>{ _t('cancel') }</Button>
                        <Button onClick={() => formRef.current.finish()} type="primary">{ _t('submit') }</Button>
                    </Space>
                }
            >
                <MyForm ref={formRef} columns={columns} options={defaultOptions.form} type={drawer.type} submit={handleFormSubmit} />
            </Drawer>
        </div>
    );
}
