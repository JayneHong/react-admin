/*封装axios库*/

import axios from 'axios'
import { message } from 'antd'

export default function ajax(url, data = {}, type = 'GET') {


    console.log('data: ' + { ...arguments }, url);

    return new Promise((resolve, reject) => {
        let axiosPromise = null;
        if (type === 'GET') {
            axiosPromise = axios.get(url, { params: data });
        } else {
            axiosPromise = axios.post(url, data);
        }
        axiosPromise.then(response => {
            //请求成功回调
            resolve(response);
        }).catch(error => {
            //请求失败回调
            message.error('请求出错了: ' + error.message);
            reject();
        })
    })
}