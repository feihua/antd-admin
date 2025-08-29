export interface DictTypeListParam {
    pageNo: number;
    pageSize?: number;
    dictName?: string; //字典名称
    dictType?: string; //字典类型
    status?: number; //门状态（0：停用，1:正常）

}

export interface DictTypeVo {
    id: number; //字典主键
    dictName: string; //字典名称
    dictType: string; //字典类型
    status: number; //门状态（0：停用，1:正常）
    remark: string; //备注
    createTime: string; //创建时间
    updateTime: string; //修改时间

}
