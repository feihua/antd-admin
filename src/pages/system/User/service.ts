import {axiosInstance, IResponse} from "@/api/ajax.ts";
import {UserListParam, UserRoleListParam, UserVo} from "./data";
import {message} from "antd";

/**
 * @description: 添加用户信息
 * @params {record} UserVo
 * @return {Promise}
 */
export const addUser = (params: UserVo): Promise<IResponse> => {
    return axiosInstance.post('/api/system/user/addUser', params).then(res => res.data);
};

/**
 * @description: 删除用户信息
 * @params {ids} number[]
 * @return {Promise}
 */
export const removeUser = (params: { ids: number[] }): Promise<IResponse> => {
    return axiosInstance.post('/api/system/user/deleteUser', params).then(res => res.data);
};


/**
 * @description: 更新用户信息
 * @params {record} UserVo
 * @return {Promise}
 */
export const updateUser = (params: UserVo): Promise<IResponse> => {
    return axiosInstance.post('/api/system/user/updateUser', params).then(res => res.data);
};

/**
 * @description: 批量更新用户信息状态
 @params {ids} number[]
 @params { userStatus} number
 * @return {Promise}
 */
export const updateUserStatus = (params: { ids: number[], status: number }): Promise<IResponse> => {
    return axiosInstance.post('/api/system/user/updateUserStatus', params).then(res => res.data);
};

/**
 * @description: 查询用户信息详情
 * @params {id} number
 * @return {Promise}
 */
export const queryUserDetail = (params: { id: number }): Promise<IResponse> => {
    return axiosInstance.post('/api/system/user/queryUserDetail', params).then(res => res.data);
};


/**
 * @description: 分页查询用户信息列表
 * @params {params} UserListParam
 * @return {Promise}
 */
export const queryUserList = (params: UserListParam): Promise<IResponse> => {
    return axiosInstance.post('/api/system/user/queryUserList', params).then(res => res.data);
};

/**
 * @description: 查询用户角色
 * @params {ids} number[]
 * @return {Promise}
 */
export const query_user_role = (param: UserRoleListParam): Promise<IResponse> => {
    return axiosInstance.post('/api/system/user/queryUserRole', param).then(res => res.data);
};

/**
 * @description: 更新用户角色
 * @params {ids} number[]
 * @return {Promise}
 */
export const update_user_role = (userId: Number, roleIds: Number[]): Promise<IResponse> => {
    return axiosInstance.post('/api/system/user/updateUserRole', {
        userId: userId,
        roleIds: roleIds
    }).then(res => res.data);
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