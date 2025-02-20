import {axiosInstance, IResponse} from "@/api/ajax.ts";
import {DictDataListParam, DictDataVo} from "./data";
import {message} from "antd";

/**
 * @description: 添加字典数据表
 * @params {record} DictDataVo
 * @return {Promise}
 */
export const addDictData = (params: DictDataVo): Promise<IResponse> => {
    return axiosInstance.post('/api/system/dictData/addDictData', params).then(res => res.data);
};

/**
 * @description: 删除字典数据表
 * @params {ids} number[]
 * @return {Promise}
 */
export const removeDictData = (ids: number[]): Promise<IResponse> => {
    return axiosInstance.post('/api/system/dictData/deleteDictData', {ids}).then(res => res.data);
};


/**
 * @description: 更新字典数据表
 * @params {record} DictDataVo
 * @return {Promise}
 */
export const updateDictData = (params: DictDataVo): Promise<IResponse> => {
    return axiosInstance.post('/api/system/dictData/updateDictData', params).then(res => res.data);
};

/**
 * @description: 批量更新字典数据表状态
 @params {ids} number[]
 @params { dictDataStatus} number
 * @return {Promise}
 */
export const updateDictDataStatus = (params: { ids: number[], dictDataStatus: number }): Promise<IResponse> => {
    return axiosInstance.post('/api/system/dictData/updateDictDataStatus', params).then(res => res.data);
};

/**
 * @description: 查询字典数据表详情
 * @params {id} number
 * @return {Promise}
 */
export const queryDictDataDetail = (params: { id: number }): Promise<IResponse> => {
    return axiosInstance.post('/api/system/dictData/queryDictDataDetail', params).then(res => res.data);
};


/**
 * @description: 分页查询字典数据表列表
 * @params {params} DictDataListParam
 * @return {Promise}
 */
export const queryDictDataList = (params: DictDataListParam): Promise<IResponse> => {
    return axiosInstance.post('/api/system/dictData/queryDictDataList', params).then(res => res.data);
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