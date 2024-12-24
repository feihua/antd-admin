/**
 * @description: 菜单列表
 * @params {param} ListParam
 * @return {Promise}
 */
import {axiosInstance, IResponse} from "../../../api/ajax.ts";

export const query_user_menu = (): Promise<IResponse> => {
    return axiosInstance.get('api/system/user/queryUserMenu', {}).then(res => res.data);
};

