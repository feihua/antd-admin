import axios, {AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from 'axios';

import {showMessage} from "./status";
import {message} from 'antd';
import {storageUtils} from "../utils/storageUtils";


// 返回res.data的interface
export interface IResponse {
    code: number | string;
    data: any;
    msg: string;
    total: number
}
const baseUrl = import.meta.env.VITE_APP_PROXY_URL;
export const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
});

// axios实例拦截响应
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        // if (response.headers.authorization) {
        //     localStorage.setItem('app_token', response.headers.authorization);
        // } else {
        //     if (response.data && response.data.token) {
        //         localStorage.setItem('app_token', response.data.token);
        //     }
        // }

        if (response.status === 200) {
            return response;
        } else {
            showMessage(response.status);
            return response;
        }
    },
    // 请求失败
    (error: any) => {
        const {response} = error;
        if (response) {
            // 请求已发出，但是不在2xx的范围
            showMessage(response.status);
            if (response.status === 401) {
                storageUtils.logout()
                window.location.href = "/antd/login";
            }
            return Promise.reject(response.data);
        } else {
            message.error('网络连接异常,请稍后再试!');
        }
    }
);

// axios实例拦截请求
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = storageUtils.getToken()
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
)



