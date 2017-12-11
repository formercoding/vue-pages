import axios from 'axios';
import qs from 'qs';
import {Message} from 'element-ui'
// import {
//     login
// } from '../config/index';

let ajaxUrl = {
    article: '/api/article', // 文章操作
}

axios.get('/api/seller').then(() => {
    Message('dd')
})

axios.defaults.timeout = 60 * 1000;

// 请求拦截器
axios.interceptors.request.use(
    config => {
        if (config.method === 'post') {
            config.data = qs.stringify(config.data);
        }

        return config;
    },

    // 错误处理
    error => {
        alertTip(['请求参数错误', 2000]);
        return Promise.reject(error);
    }
);

// 返回过滤器
axios.interceptors.response.use(
    // 正确处理
    res => {
        let [data, status, msg] = [res.data, data.return_code, data.return_msg];

        // status   SUCCESS:成功  
        if (status === 'SUCCESS') {
            return msg;
        } else {
            Message(msg);
            return Promise.reject(msg);
        }
    },

    // 错误处理
    error => {
        let res = error.response;
        
        if (res) {
            Message(res.status + ':网络错误，请刷新重试');
        } else {
            Message('请求超时，请刷新重试');
        };

        return Promise.reject(error);
    }
);

// get请求方法
export function fetchGet(url, config) {
    return new Promise((resolve, reject) => {
        axios.get(url, config).then(
            res => {
                resolve(res);
            },

            error => {
                reject(error)
            }
        ).catch((error) => {
            reject(error);
        });
    })
}

// post请求方法
export function fetchPost(url, config) {
    return new Promise((resolve, reject) => {
        axios.post(url, config).then(
            res => {
                resolve(res);
            },

            error => {
                reject(error)
            }
        ).catch((error) => {
            reject(error);
        })
    })
}

/**
 * post上传文件方法
 * @param {String} url 请求URL
 * @param {Object} data 文件参数
 * @param {Object} sign 校验签名信息
 * @param {Function} progressFn 进度回调函数
 */
export function fetchUpload(url, config, sign, progressFn) {
    return new Promise((resolve, reject) => {
        axios.post(url, data, {
            // 签名信息
            params: sign,

            // 上传进度执行的函数
            onUploadProgress: (progressEvent) => {
                let progress = parseInt((progressEvent.loaded / progressEvent.total) * 100) + '%';

                if ((typeof progressFn).toLocaleLowerCase() === 'function') {
                    progressFn(progress);
                }
            }
        }).then(
            res => {
                resolve(res);
            },

            error => {
                reject(error);
            }
        ).catch((error) => {
            reject(error);
        })
    })
}

export default {
    // 获取用户信息
    getUserInfo(config) {
        return fetchGet(ajaxUrl.getUserInfo, config);
    }
}
