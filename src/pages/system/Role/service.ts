import {axiosInstance, IResponse} from "@/api/ajax.ts";
import {QueryUserListParam, RoleListParam, RoleVo} from "./data";
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
export const updateRoleStatus = (params: { ids: number[], status: number }): Promise<IResponse> => {
    return axiosInstance.post('/api/system/role/updateRoleStatus', params).then(res => res.data);
};

/**
 * @description: 查询角色信息详情
 * @params {id} number
 * @return {Promise}
 */
export const queryRoleDetail = (params: { id: number }): Promise<IResponse> => {
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
export const query_role_menu = (roleId: Number): Promise<IResponse> => {
    return axiosInstance.post('/api/system/role/queryRoleMenu', {roleId: roleId}).then(res => res.data);
};

/**
 * @description: 更新角色菜单
 * @params {ids} number[]
 * @return {Promise}
 */
export const update_role_menu = (roleId: Number, menuIds: Number[]): Promise<IResponse> => {
    return axiosInstance.post('/api/system/role/updateRoleMenu', {
        roleId: roleId,
        menuIds: menuIds
    }).then(res => res.data);
};

/**
 * @description: 查询已分配用户角色列表
 * @params param
 * @return {Promise}
 */
export const query_allocated_list = (param: QueryUserListParam): Promise<IResponse> => {
    return axiosInstance.post('/api/system/role/queryAllocatedList', param).then(res => res.data);
};

/**
 * @description: 查询未分配用户角色列表
 * @params param
 * @return {Promise}
 */
export const query_unallocated_list = (param: QueryUserListParam): Promise<IResponse> => {
    return axiosInstance.post('/api/system/role/queryUnallocatedList', param).then(res => res.data);
};

/**
 * @description: 取消授权用户
 * @params param
 * @return {Promise}
 */
export const cancel_auth_user = (param: { userId: number, roleId: number }): Promise<IResponse> => {
    return axiosInstance.post('/api/system/role/cancelAuthUser', param).then(res => res.data);
};

/**
 * @description: 批量取消授权用户
 * @params param
 * @return {Promise}
 */
export const batch_cancel_auth_user = (param: { userIds: number[], roleId: number }): Promise<IResponse> => {
    return axiosInstance.post('/api/system/role/batchCancelAuthUser', param).then(res => res.data);
};

/**
 * @description: 批量选择用户授权
 * @params param
 * @return {Promise}
 */
export const batch_auth_user = (param: { userIds: number[], roleId: number }): Promise<IResponse> => {
    return axiosInstance.post('/api/system/role/batchAuthUser', param).then(res => res.data);
};

/**
 * 统一处理
 * @param resp
 */
export const handleResp = (resp: IResponse): boolean => {
    if (resp.code === 0) {
        message.success(resp.msg)
    } else {
        message.error(resp.msg)
    }
    return resp.code === 0
};