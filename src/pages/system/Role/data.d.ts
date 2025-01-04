
export interface RoleListParam {
    current: number;
    pageSize?: number;
    role_name?: string; //名称
    role_key?: string; //角色权限字符串
    data_scope?: number; //数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限）
    status?: number; //状态(1:正常，0:禁用)

}

export interface RoleVo {
    id: number; //主键
    role_name: string; //名称
    role_key: string; //角色权限字符串
    data_scope: number; //数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限）
    status: number; //状态(1:正常，0:禁用)
    remark: string; //备注
    del_flag: number; //删除标志（0代表删除 1代表存在）
    create_time: string; //创建时间
    update_time: string; //修改时间

}
