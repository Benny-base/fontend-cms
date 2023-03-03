import { getLocale, request } from 'umi'
import { langConfig } from '@/utils'
import { UserStore } from '@/stores'

export const requestConfig = {
    timeout: 10000,
    errorConfig: {},
    middlewares: [],
    requestInterceptors: [
        // (url, options) => {
        //     return { url, options }
        // }
    ],
    responseInterceptors: [
        // async(response) => {
        //     const data = await response.clone().json();
        //     console.log(data)
        //     return response
        // }
    ],
}

async function callApi(url, data = {}, method){
    const options = {
        method,
        headers: {
            'lang': langConfig[getLocale()].api,
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${UserStore.info.token || ''}`
        }
    }

    if(method == 'get') options.params = data
    else options.data = data

    const result  = await request(`/cms${url}`, options)

    console.log(url, '\n', `${method}`, data, '\n', result)

    return result
}

export default {
    post(url, data){
        return callApi(url, data, 'post')
    },
    get(url, data){
        return callApi(url, data, 'get')
    }
}


