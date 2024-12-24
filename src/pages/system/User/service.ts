import {axiosInstance, IResponse} from "../../../api/ajax";
import {UserListParam, UserVo} from "./data";
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
export const removeUser = (params: { ids: number[]}): Promise<IResponse> => {
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
export const queryUserDetail = (params: { id: number}): Promise<IResponse> => {
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
export const query_user_role = (user_id: Number): Promise<IResponse> => {
    return axiosInstance.post('/api/system/user/queryUserRole', {user_id: user_id}).then(res => res.data);
};

/**
 * @description: 更新用户角色
 * @params {ids} number[]
 * @return {Promise}
 */
export const update_user_role = (user_id: Number, role_ids: Number[]): Promise<IResponse> => {
    return axiosInstance.post('/api/system/user/updateUserRole', {user_id: user_id, role_ids: role_ids}).then(res => res.data);
};

/**
 * 统一处理
 * @param resp
 */
export const handleResp = (resp: IResponse): boolean => {
    resp.code === 0 ? message.success(resp.msg) : message.error(resp.msg);
    return resp.code === 0
};