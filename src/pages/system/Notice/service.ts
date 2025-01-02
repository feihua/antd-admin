import {axiosInstance, IResponse} from "../../../api/ajax";
import { NoticeVo, NoticeListParam } from "./data";
import { message } from "antd";

/**
 * @description: 添加通知公告表
 * @params {record} NoticeVo
 * @return {Promise}
 */
export const addNotice = (params: NoticeVo): Promise<IResponse> => {
    return axiosInstance.post('/api/system/notice/addNotice', params).then(res => res.data);
};

/**
 * @description: 删除通知公告表
 * @params {ids} number[]
 * @return {Promise}
 */
export const removeNotice = (ids: number[]): Promise<IResponse> => {
    return axiosInstance.get('/api/system/notice/deleteNotice?ids=[' + ids + "]").then(res => res.data);
};


/**
 * @description: 更新通知公告表
 * @params {record} NoticeVo
 * @return {Promise}
 */
export const updateNotice = (params: NoticeVo): Promise<IResponse> => {
    return axiosInstance.post('/api/system/notice/updateNotice', params).then(res => res.data);
};

/**
 * @description: 查询通知公告表详情
 * @params {id} number
 * @return {Promise}
 */
export const queryNoticeDetail = (params: { id: number}): Promise<IResponse> => {
    return axiosInstance.post('/api/system/notice/queryNoticeDetail', params).then(res => res.data);
};


/**
 * @description: 分页查询通知公告表列表
 * @params {params} NoticeListParam
 * @return {Promise}
 */
export const queryNoticeList = (params: NoticeListParam): Promise<IResponse> => {
    return axiosInstance.post('/api/system/notice/queryNoticeList', params).then(res => res.data);
};


/**
 * 统一处理
 * @param resp
 */
export const handleResp = (resp: IResponse): boolean => {
    resp.code === 0 ? message.success(resp.msg) : message.error(resp.msg);
    return resp.code === 0
};