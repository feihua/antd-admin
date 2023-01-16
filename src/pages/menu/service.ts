import {axiosInstance, IResponse} from "../../api/ajax";
import {MenuVo, MenuListParam} from "./data";
import {message} from "antd";

/**
 * @description: 用户列表
 * @params {req} MenuListReq
 * @return {Promise}
 */
export const menuList = (req: MenuListParam): Promise<IResponse> => {
    return axiosInstance.post('api/menu_list', req).then(res => res.data);
};

/**
 * @description: 添加用户
 * @params {menu} Menu
 * @return {Promise}
 */
export const addMenu = (menu: MenuVo): Promise<IResponse> => {
    return axiosInstance.post('api/menu_save', menu).then(res => res.data);
};

/**
 * @description: 更新用户
 * @params {{menu} Menu
 * @return {Promise}
 */
export const updateMenu = (menu: MenuVo): Promise<IResponse> => {
    return axiosInstance.post('api/menu_update', menu).then(res => res.data);
};

/**
 * @description: 删除用户
 * @params {ids} number[]
 * @return {Promise}
 */
export const removeMenu = (ids: Number[]): Promise<IResponse> => {
    return axiosInstance.post('api/menu_delete', {ids: ids}).then(res => res.data);
};

/**
 * 统一处理
 * @param resp
 */
export const handleResp = (resp: IResponse): boolean => {
    resp.code === 0 ? message.success(resp.msg) : message.error(resp.msg);
    return resp.code === 0
};