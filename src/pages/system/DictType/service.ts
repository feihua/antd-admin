import {axiosInstance, IResponse} from "@/api/ajax.ts";
import {DictTypeListParam, DictTypeVo} from "./data";
import {message} from "antd";

/**
 * @description: 添加字典类型表
 * @params {record} DictTypeVo
 * @return {Promise}
 */
export const addDictType = (params: DictTypeVo): Promise<IResponse> => {
    return axiosInstance.post('/api/system/dictType/addDictType', params).then(res => res.data);
};

/**
 * @description: 删除字典类型表
 * @params {ids} number[]
 * @return {Promise}
 */
export const removeDictType = (ids: number[]): Promise<IResponse> => {
    return axiosInstance.post('/api/system/dictType/deleteDictType', {ids}).then(res => res.data);
};


/**
 * @description: 更新字典类型表
 * @params {record} DictTypeVo
 * @return {Promise}
 */
export const updateDictType = (params: DictTypeVo): Promise<IResponse> => {
    return axiosInstance.post('/api/system/dictType/updateDictType', params).then(res => res.data);
};

/**
 * @description: 批量更新字典类型表状态
 @params {ids} number[]
 @params { dictTypeStatus} number
 * @return {Promise}
 */
export const updateDictTypeStatus = (params: { ids: number[], dictTypeStatus: number }): Promise<IResponse> => {
    return axiosInstance.post('/api/system/dictType/updateDictTypeStatus', params).then(res => res.data);
};

/**
 * @description: 查询字典类型表详情
 * @params {id} number
 * @return {Promise}
 */
export const queryDictTypeDetail = (params: { id: number }): Promise<IResponse> => {
    return axiosInstance.post('/api/system/dictType/queryDictTypeDetail', params).then(res => res.data);
};


/**
 * @description: 分页查询字典类型表列表
 * @params {params} DictTypeListParam
 * @return {Promise}
 */
export const queryDictTypeList = (params: DictTypeListParam): Promise<IResponse> => {
    return axiosInstance.post('/api/system/dictType/queryDictTypeList', params).then(res => res.data);
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