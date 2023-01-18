import {axiosInstance, IResponse} from "../../api/ajax";
import {UserVo, UserListParam} from "./data";
import {message} from "antd";

/**
 * @description: 用户列表
 * @params {req} UserListReq
 * @return {Promise}
 */
export const userList = (req: UserListParam): Promise<IResponse> => {
    return axiosInstance.post('api/user_list', req).then(res => res.data);
};

/**
 * @description: 添加用户
 * @params {user} User
 * @return {Promise}
 */
export const addUser = (user: UserVo): Promise<IResponse> => {
    return axiosInstance.post('api/user_save', user).then(res => res.data);
};

/**
 * @description: 更新用户
 * @params {{user} User
 * @return {Promise}
 */
export const updateUser = (user: UserVo): Promise<IResponse> => {
    return axiosInstance.post('api/user_update', user).then(res => res.data);
};

/**
 * @description: 删除用户
 * @params {ids} number[]
 * @return {Promise}
 */
export const removeUser = (ids: Number[]): Promise<IResponse> => {
    return axiosInstance.post('api/user_delete', {ids: ids}).then(res => res.data);
};

/**
 * @description: 查询用户角色
 * @params {ids} number[]
 * @return {Promise}
 */
export const query_user_role = (user_id: Number): Promise<IResponse> => {
    return axiosInstance.post('api/query_user_role', {user_id: user_id}).then(res => res.data);
};

/**
 * @description: 更新用户角色
 * @params {ids} number[]
 * @return {Promise}
 */
export const update_user_role = (user_id: Number, role_ids: Number[]): Promise<IResponse> => {
    return axiosInstance.post('api/update_user_role', {user_id: user_id, role_ids: role_ids}).then(res => res.data);
};

/**
 * 统一处理
 * @param resp
 */
export const handleResp = (resp: IResponse): boolean => {
    resp.code === 0 ? message.success(resp.msg) : message.error(resp.msg);
    return resp.code === 0
};