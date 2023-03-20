import React, { useEffect, useState } from 'react'
import cls from './index.less';
import { Row, Col, Input, InputNumber, Form, Button, Space, Select, Cascader, DatePicker } from 'antd'
import { useI18n, formatFormData, transformEnum } from '@/utils'
import _ from 'lodash'
import request from '@/utils/request'

export default (props) => {
    const _t = useI18n()
    const [ form ] = Form.useForm();
    const [optData, setOptData] = useState({});
    const { 
        columns = [], 
        options = {
            labelCol: undefined
        } 
    } = props


    useEffect(() => {
        init()
    }, [])

    const init = async() => {
        let formOpts = {}
        const results = await Promise.all(columns.map(item => {
            // 处理一些组件的可选项  有.url便请求数据 有.data直接使用该数据
            if(!item.hide && item.opts?.url){
                return request[item.opts?.method || 'get'](item.opts?.url, item.otps?.body)
            }
            else if(!item.hide && _.isArray(item.opts?.data)){
                formOpts[item.key] = transformEnum(item.opts?.enum, item.opts.data)
            }
        }))
        results.map((item, i) => {
            if(!_.isEmpty(item)){
                formOpts[columns[i].key] = transformEnum(columns[i].opts?.enum, item.data.list)
            }
        })
        setOptData(formOpts)
    }

    const onFinish = (values) => {
        values = formatFormData(columns, values)
        props.submit?.(values)
    };

    const onReset = () => {
        form.resetFields();
    };

    const renderComponent = (item) => {
        switch (item.formType) {
            case 'input': return <Input style={{ width: '100%' }} {...item.attribute} />
            case 'input-number': return <InputNumber style={{ width: '100%' }} {...item.attribute} />
            case 'select': return <Select options={optData[item.key]} {...item.attribute} />
            case 'cascader': return <Cascader options={optData[item.key]} {...item.attribute} />
            case 'date-picker': return <DatePicker style={{ width: '100%' }} {...item.attribute} />
            default: return <Row />
        }
    }

    return (
        <Form
            form={form}
            onFinish={onFinish}
            // layout={'vertical'}
        >
            <Row gutter={[32,0]}>
                {
                    columns.map(item => 
                        !!item.search && (
                        <Col xs={24} md={12} lg={8} xl={6} key={item.key}>
                            <Form.Item 
                                label={item.title} 
                                name={item.key} 
                                labelCol={options.labelCol || { span: 8 }}
                            >
                                { renderComponent(item) }
                            </Form.Item>
                        </Col>
                    ))
                }
            </Row>

            <Row justify={'center'} className={cls.space}>
                <Space size={'large'}>
                    <Button type="primary" htmlType="submit">{ _t('search') }</Button>
                    <Button onClick={onReset}>{ _t('reset') }</Button>
                </Space>
            </Row>
        </Form>
    )
}
