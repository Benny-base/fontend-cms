import { useIntl } from 'umi';
import { LoadingStore } from '@/stores'
import dayjs from 'dayjs'
import _ from 'lodash'

// key对应umi语言配置 value为对应其他语言配置
export const langConfig = {
    'zh-CN': { api: 'zh-cn' },
    'zh-HK': { api: 'zh-hk' },
    'en-US': { api: 'en' },
}

export const langList = [
    { text: '简体中文', lang: 'zh-CN' },
    { text: '繁體中文', lang: 'zh-HK' },
    { text: 'English', lang: 'en-US' },
]

export const saveSetting = (key, value) => {
    localStorage.setItem(key, value);
}

export const readSetting = (key) => {
    return localStorage.getItem(key);
}

export const useI18n = () => {
    const intl = useIntl();
    return (id, params) => {
        if(!id) return ''
        return intl.formatMessage({id, defaultMessage: id}, params);
    }
}

export const useLoading = (key) => {
    return !!LoadingStore.models[key]
}

export const wait = (ms = 500) => {
    return new Promise((resolve) => setTimeout(() => {resolve()}, ms))
}

// 格式化Form表单提交数据
export const formatFormData = (columns, values) => {
    columns.map(item => {
        if(item.formType == 'date-picker' && values[item.key]){
            values[item.key] = dayjs(values[item.key]).format(item.attribute?.format)
        }
    })
    return values
}

// 反格式化Form表单提交数据
export const reformatFormData = (columns, values) => {
    columns.map(item => {
        if(item.formType == 'date-picker' && values[item.key]){
            values[item.key] = dayjs(values[item.key])
        }
    })
    return values
}

// 转换键值对  兼容组件的对应可用的key value
export const transformEnum = (enumObj = { label: 'label', value: 'value' }, data) => {
    _.forIn(enumObj, (val, key) => {
        data = data.map(item => {
            item[key] = item[val]
            return item
        })
    })
    return data
}

// 获取对应可选项
export const getOptions = (data = {}, url = '/api/v1/menus/menuKeys', method = 'post') => {
    return { url, method, body: data }
}

