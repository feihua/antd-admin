
export interface PostListParam {
  current: number;
  pageSize?: number;
  post_code?: string; //岗位编码
  post_name?: string; //岗位名称
  status?: number; //部门状态（0：停用，1:正常）

}

export interface PostVo {
  id: number; //岗位id
  post_code: string; //岗位编码
  post_name: string; //岗位名称
  sort: number; //显示顺序
  status: number; //部门状态（0：停用，1:正常）
  remark: string; //备注
  create_time: string; //创建时间
  update_time: string; //更新时间

}
