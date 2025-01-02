import {axiosInstance, IResponse} from "../../../api/ajax";
import {DeptListParam, DeptVo} from "./data";
import {message} from "antd";

/**
 * @description: 添加部门表
 * @params {record} DeptVo
 * @return {Promise}
 */
export const addDept = (params: DeptVo): Promise<IResponse> => {
    return axiosInstance.post('/api/system/dept/addDept', params).then(res => res.data);
};

/**
 * @description: 删除部门表
 * @params {ids} number[]
 * @return {Promise}
 */
export const removeDept = (ids: number[]): Promise<IResponse> => {
    return axiosInstance.post('/api/system/dept/deleteDept', {ids}).then(res => res.data);
};


/**
 * @description: 更新部门表
 * @params {record} DeptVo
 * @return {Promise}
 */
export const updateDept = (params: DeptVo): Promise<IResponse> => {
    return axiosInstance.post('/api/system/dept/updateDept', params).then(res => res.data);
};

/**
 * @description: 批量更新部门表状态
 @params {ids} number[]
 @params { deptStatus} number
 * @return {Promise}
 */
export const updateDeptStatus = (params: { ids: number[], deptStatus: number }): Promise<IResponse> => {
    return axiosInstance.post('/api/system/dept/updateDeptStatus', params).then(res => res.data);
};

/**
 * @description: 查询部门表详情
 * @params {id} number
 * @return {Promise}
 */
export const queryDeptDetail = (params: { id: number }): Promise<IResponse> => {
    return axiosInstance.post('/api/system/dept/queryDeptDetail', params).then(res => res.data);
};


/**
 * @description: 分页查询部门表列表
 * @params {params} DeptListParam
 * @return {Promise}
 */
export const queryDeptList = (params: DeptListParam): Promise<IResponse> => {
    return axiosInstance.post('/api/system/dept/queryDeptList', params).then(res => res.data);
};


/**
 * 统一处理
 * @param resp
 */
export const handleResp = (resp: IResponse): boolean => {
    resp.code === 0 ? message.success(resp.msg) : message.error(resp.msg);
    return resp.code === 0
};