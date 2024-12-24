import {axiosInstance, IResponse} from "../../../api/ajax";
import { MenuVo, MenuListParam } from "./data";
import { message } from "antd";

/**
 * @description: 添加菜单信息
 * @params {record} MenuVo
 * @return {Promise}
 */
export const addMenu = (params: MenuVo): Promise<IResponse> => {
    return axiosInstance.post('/api/system/menu/addMenu', params).then(res => res.data);
};

/**
 * @description: 删除菜单信息
 * @params {ids} number[]
 * @return {Promise}
 */
export const removeMenu = (ids: number[]): Promise<IResponse> => {
    return axiosInstance.get('/api/system/menu/deleteMenu?ids=[' + ids + "]").then(res => res.data);
};


/**
 * @description: 更新菜单信息
 * @params {record} MenuVo
 * @return {Promise}
 */
export const updateMenu = (params: MenuVo): Promise<IResponse> => {
    return axiosInstance.post('/api/system/menu/updateMenu', params).then(res => res.data);
};

/**
 * @description: 批量更新菜单信息状态
 @params {ids} number[]
 @params { menuStatus} number
 * @return {Promise}
 */
export const updateMenuStatus = (params: { ids: number[], menuStatus: number }): Promise<IResponse> => {
    return axiosInstance.post('/api/system/menu/updateMenuStatus', params).then(res => res.data);
};

/**
 * @description: 查询菜单信息详情
 * @params {id} number
 * @return {Promise}
 */
export const queryMenuDetail = (params: { id: number}): Promise<IResponse> => {
    return axiosInstance.post('/api/system/menu/queryMenuDetail', params).then(res => res.data);
};


/**
 * @description: 分页查询菜单信息列表
 * @params {params} MenuListParam
 * @return {Promise}
 */
export const queryMenuList = (params: MenuListParam): Promise<IResponse> => {
    return axiosInstance.post('/api/system/menu/queryMenuList', {params}).then(res => res.data);
};


/**
 * 统一处理
 * @param resp
 */
export const handleResp = (resp: IResponse): boolean => {
    resp.code === 0 ? message.success(resp.msg) : message.error(resp.msg);
    return resp.code === 0
};