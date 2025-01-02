
export interface DictTypeListParam {
  current: number;
  pageSize?: number;
  dict_name?: string; //字典名称
  dict_type?: string; //字典类型
  status?: number; //门状态（0：停用，1:正常）

}

export interface DictTypeVo {
  dict_id: number; //字典主键
  dict_name: string; //字典名称
  dict_type: string; //字典类型
  status: number; //门状态（0：停用，1:正常）
  remark: string; //备注
  create_time: string; //创建时间
  update_time: string; //修改时间

}
