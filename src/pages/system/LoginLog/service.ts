import {axiosInstance, IResponse} from "../../../api/ajax";
import {LoginLogListParam} from "./data";
import {message} from "antd";


/**
 * @description: 删除系统访问记录
 * @params {ids} number[]
 * @return {Promise}
 */
export const removeLoginLog = (ids: number[]): Promise<IResponse> => {
    return axiosInstance.post('/api/system/loginLog/deleteLoginLog', {ids}).then(res => res.data);
};

/**
 * @description: 查询系统访问记录详情
 * @params {id} number
 * @return {Promise}
 */
export const queryLoginLogDetail = (params: { id: number }): Promise<IResponse> => {
    return axiosInstance.post('/api/system/loginLog/queryLoginLogDetail', params).then(res => res.data);
};


/**
 * @description: 分页查询系统访问记录列表
 * @params {params} LoginLogListParam
 * @return {Promise}
 */
export const queryLoginLogList = (params: LoginLogListParam): Promise<IResponse> => {
    return axiosInstance.post('/api/system/loginLog/queryLoginLogList', params).then(res => res.data);
};


/**
 * 统一处理
 * @param resp
 */
export const handleResp = (resp: IResponse): boolean => {
    resp.code === 0 ? message.success(resp.msg) : message.error(resp.msg);
    return resp.code === 0
};