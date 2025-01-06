import {axiosInstance, IResponse} from "../../../api/ajax";
import {OperateLogListParam} from "./data";
import {message} from "antd";


/**
 * @description: 删除操作日志记录
 * @params {ids} number[]
 * @return {Promise}
 */
export const removeOperateLog = (ids: number[]): Promise<IResponse> => {
    return axiosInstance.post('/api/system/operateLog/deleteOperateLog', {ids}).then(res => res.data);
};


/**
 * @description: 查询操作日志记录详情
 * @params {id} number
 * @return {Promise}
 */
export const queryOperateLogDetail = (params: { id: number }): Promise<IResponse> => {
    return axiosInstance.post('/api/system/operateLog/queryOperateLogDetail', params).then(res => res.data);
};


/**
 * @description: 分页查询操作日志记录列表
 * @params {params} OperateLogListParam
 * @return {Promise}
 */
export const queryOperateLogList = (params: OperateLogListParam): Promise<IResponse> => {
    return axiosInstance.post('/api/system/operateLog/queryOperateLogList', params).then(res => res.data);
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