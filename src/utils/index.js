import { useIntl } from 'umi';
import { LoadingStore } from '@/stores'

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

export const _t = (id, params) => {
    return useIntl().formatMessage({id, defaultMessage: id}, params); 
}

export function useLoading(key){
    return !!LoadingStore.models[key]
}



