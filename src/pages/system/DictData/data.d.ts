export interface DictDataListParam {
    pageNo: number;
    pageSize?: number;
    dictLabel?: string; //字典标签
    dictValue?: string; //字典键值
    dictType?: string; //字典类型
    cssClass?: string; //样式属性（其他样式扩展）
    listClass?: string; //表格回显样式
    isDefault?: string; //是否默认（Y是 N否）
    status?: number; //门状态（0：停用，1:正常）

}

export interface DictDataVo {
    dictCode: number; //字典编码
    dictSort: number; //字典排序
    dictLabel: string; //字典标签
    dictValue: string; //字典键值
    dictType: string; //字典类型
    cssClass: string; //样式属性（其他样式扩展）
    listClass: string; //表格回显样式
    isDefault: string; //是否默认（Y是 N否）
    status: number; //门状态（0：停用，1:正常）
    remark: string; //备注
    createTime: string; //创建时间
    updateTime: string; //修改时间

}
