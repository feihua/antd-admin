export interface RoleListParam {
    current: number;
    pageSize?: number;
    role_name?: string; //名称
    status_id?: number; //状态(1:正常，0:禁用)

}

export interface RoleVo {
    id: number; //主键
    role_name: string; //名称
    status_id: number; //状态(1:正常，0:禁用)
    sort: number; //排序
    remark: string; //备注
    create_time: string; //创建时间
    update_time: string; //修改时间

}
