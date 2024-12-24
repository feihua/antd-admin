import {axiosInstance, IResponse} from "../../../api/ajax";
import {RoleListParam, RoleVo} from "./data";
import {message} from "antd";

/**
 * @description: 添加角色信息
 * @params {record} RoleVo
 * @return {Promise}
 */
export const addRole = (params: RoleVo): Promise<IResponse> => {
    return axiosInstance.post('/api/system/role/addRole', params).then(res => res.data);
};

/**
 * @description: 删除角色信息
 * @params {ids} number[]
 * @return {Promise}
 */
export const removeRole = (params: { ids: number[] }): Promise<IResponse> => {
    return axiosInstance.post('/api/system/role/deleteRole', params).then(res => res.data);
};


/**
 * @description: 更新角色信息
 * @params {record} RoleVo
 * @return {Promise}
 */
export const updateRole = (params: RoleVo): Promise<IResponse> => {
    return axiosInstance.post('/api/system/role/updateRole', params).then(res => res.data);
};

/**
 * @description: 批量更新角色信息状态
 @params {ids} number[]
 @params { roleStatus} number
 * @return {Promise}
 */
export const updateRoleStatus = (params: { ids: number[], roleStatus: number }): Promise<IResponse> => {
    return axiosInstance.post('/api/system/role/updateRoleStatus', params).then(res => res.data);
};

/**
 * @description: 查询角色信息详情
 * @params {id} number
 * @return {Promise}
 */
export const queryRoleDetail = (params: { id: number}): Promise<IResponse> => {
    return axiosInstance.post('/api/system/role/queryRoleDetail', params).then(res => res.data);
};


/**
 * @description: 分页查询角色信息列表
 * @params {params} RoleListParam
 * @return {Promise}
 */
export const queryRoleList = (params: RoleListParam): Promise<IResponse> => {
    return axiosInstance.post('/api/system/role/queryRoleList', params).then(res => res.data);
};

/**
 * @description: 查询角色菜单
 * @params {ids} number[]
 * @return {Promise}
 */
export const query_role_menu = (role_id: Number): Promise<IResponse> => {
    return axiosInstance.post('/api/system/role/queryRoleMenu', {role_id: role_id}).then(res => res.data);
};

/**
 * @description: 更新角色菜单
 * @params {ids} number[]
 * @return {Promise}
 */
export const update_role_menu = (role_id: Number, menu_ids: Number[]): Promise<IResponse> => {
    return axiosInstance.post('/api/system/role/updateRoleMenu', {
        role_id: role_id,
        menu_ids: menu_ids
    }).then(res => res.data);
};

/**
 * 统一处理
 * @param resp
 */
export const handleResp = (resp: IResponse): boolean => {
    resp.code === 0 ? message.success(resp.msg) : message.error(resp.msg);
    return resp.code === 0
};