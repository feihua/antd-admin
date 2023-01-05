import {axiosInstance, IResponse} from "../../api/ajax";
import {ILogin, IUser} from "./data";

/**
 * @description: 用户登录
 * @params {ILogin} params
 * @return {Promise}
 */
export const reqLogin = (params: ILogin): Promise<IResponse> => {
    return axiosInstance.post('api/login', params).then(res => res.data);
};

/**
 * @description: 通过id获取用户
 * @params {IUser} params
 * @return {Promise}
 */
export const getUserInfo = (params: IUser): Promise<IResponse> => {
    return axiosInstance.post('user/getInfo', params).then(res => res.data);
};