import {axiosInstance, IResponse} from "../../api/ajax";
import {RoleVo, RoleListParam} from "./data";
import {message} from "antd";

/**
 * @description: 角色列表
 * @params {req} RoleListParam
 * @return {Promise}
 */
export const roleList = (req: RoleListParam): Promise<IResponse> => {
    return axiosInstance.post('api/role_list', req).then(res => res.data);
};

/**
 * @description: 添加角色
 * @params {role} RoleVo
 * @return {Promise}
 */
export const addRole = (role: RoleVo): Promise<IResponse> => {
    return axiosInstance.post('api/role_save', role).then(res => res.data);
};

/**
 * @description: 更新角色
 * @params {{role} RoleVo
 * @return {Promise}
 */
export const updateRole = (role: RoleVo): Promise<IResponse> => {
    return axiosInstance.post('api/role_update', role).then(res => res.data);
};

/**
 * @description: 删除角色
 * @params {ids} number[]
 * @return {Promise}
 */
export const removeRole = (ids: Number[]): Promise<IResponse> => {
    return axiosInstance.post('api/role_delete', {ids: ids}).then(res => res.data);
};

/**
 * 统一处理
 * @param resp
 */
export const handleResp = (resp: IResponse): boolean => {
    resp.code === 0 ? message.success(resp.msg) : message.error(resp.msg);
    return resp.code === 0
};