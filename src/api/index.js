/*
包含 n 个接口请求函数的模块
每个函数返回 promise
*/
import ajax from './ajax'

// 登陆
export const reqLogin = (mobile, password) => ajax('/api/login', {mobile, password},
    'POST');

