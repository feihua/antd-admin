import {axiosInstance, IResponse} from "../../../api/ajax";
import {ILogin} from "./data";

/**
 * @description: 用户登录
 * @params {ILogin} params
 * @return {Promise}
 */
export const reqLogin = (params: ILogin): Promise<IResponse> => {
    return axiosInstance.post('api/system/user/login', params).then(res => res.data);
};
