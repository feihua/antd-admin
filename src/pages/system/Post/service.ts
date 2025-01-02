import {axiosInstance, IResponse} from "../../../api/ajax";
import {PostListParam, PostVo} from "./data";
import {message} from "antd";

/**
 * @description: 添加岗位信息表
 * @params {record} PostVo
 * @return {Promise}
 */
export const addPost = (params: PostVo): Promise<IResponse> => {
    return axiosInstance.post('/api/system/post/addPost', params).then(res => res.data);
};

/**
 * @description: 删除岗位信息表
 * @params {ids} number[]
 * @return {Promise}
 */
export const removePost = (ids: number[]): Promise<IResponse> => {
    return axiosInstance.post('/api/system/post/deletePost', {ids}).then(res => res.data);
};


/**
 * @description: 更新岗位信息表
 * @params {record} PostVo
 * @return {Promise}
 */
export const updatePost = (params: PostVo): Promise<IResponse> => {
    return axiosInstance.post('/api/system/post/updatePost', params).then(res => res.data);
};

/**
 * @description: 批量更新岗位信息表状态
 @params {ids} number[]
 @params { postStatus} number
 * @return {Promise}
 */
export const updatePostStatus = (params: { ids: number[], postStatus: number }): Promise<IResponse> => {
    return axiosInstance.post('/api/system/post/updatePostStatus', params).then(res => res.data);
};

/**
 * @description: 查询岗位信息表详情
 * @params {id} number
 * @return {Promise}
 */
export const queryPostDetail = (params: { id: number }): Promise<IResponse> => {
    return axiosInstance.post('/api/system/post/queryPostDetail', params).then(res => res.data);
};


/**
 * @description: 分页查询岗位信息表列表
 * @params {params} PostListParam
 * @return {Promise}
 */
export const queryPostList = (params: PostListParam): Promise<IResponse> => {
    return axiosInstance.post('/api/system/post/queryPostList', params).then(res => res.data);
};


/**
 * 统一处理
 * @param resp
 */
export const handleResp = (resp: IResponse): boolean => {
    resp.code === 0 ? message.success(resp.msg) : message.error(resp.msg);
    return resp.code === 0
};