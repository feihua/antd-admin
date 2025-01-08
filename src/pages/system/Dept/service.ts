import {axiosInstance, IResponse} from "../../../api/ajax";
import {DeptListParam, DeptVo} from "./data";
import {message} from "antd";
import {tree} from "../../../utils/treeUtils.ts";

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
 * @params {ids} number
 * @return {Promise}
 */
export const removeDept = (id: number): Promise<IResponse> => {
    return axiosInstance.post('/api/system/dept/deleteDept', {id}).then(res => res.data);
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
export const queryDeptList = async (params: DeptListParam): Promise<DeptVo[]> => {
    const res = await axiosInstance.post('/api/system/dept/queryDeptList', params);
    let {code, msg, data} = res.data
    if (code === 0) {
        return tree(data, 0, "parentId")
    }
    message.error(msg)
    return [];
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