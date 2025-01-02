export interface DictDataListParam {
    current: number;
    pageSize?: number;
    dict_label?: string; //字典标签
    dict_value?: string; //字典键值
    dict_type?: string; //字典类型
    css_class?: string; //样式属性（其他样式扩展）
    list_class?: string; //表格回显样式
    is_default?: string; //是否默认（Y是 N否）
    status?: number; //门状态（0：停用，1:正常）

}

export interface DictDataVo {
    dict_code: number; //字典编码
    dict_sort: number; //字典排序
    dict_label: string; //字典标签
    dict_value: string; //字典键值
    dict_type: string; //字典类型
    css_class: string; //样式属性（其他样式扩展）
    list_class: string; //表格回显样式
    is_default: string; //是否默认（Y是 N否）
    status: number; //门状态（0：停用，1:正常）
    remark: string; //备注
    create_time: string; //创建时间
    update_time: string; //修改时间

}
