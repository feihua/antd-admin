export interface PostListParam {
    pageNo: number;
    pageSize?: number;
    postCode?: string; //岗位编码
    postName?: string; //岗位名称
    status?: number; //部门状态（0：停用，1:正常）

}

export interface PostVo {
    id: number; //岗位id
    postCode: string; //岗位编码
    postName: string; //岗位名称
    sort: number; //显示顺序
    status: number; //部门状态（0：停用，1:正常）
    remark: string; //备注
    createTime: string; //创建时间
    updateTime: string; //更新时间

}
