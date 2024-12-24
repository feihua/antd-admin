export interface UserListParam {
    current?: number;
    pageSize?: number;
    mobile?: string; //手机
    user_name?: string; //姓名
    status_id?: number; //状态(1:正常，0:禁用)

}

export interface UserVo {
    id: number; //主键
    mobile: string; //手机
    user_name: string; //姓名
    status_id: number; //状态(1:正常，0:禁用)
    sort: number; //排序
    remark: string; //备注
    create_time: string; //创建时间
    update_time: string; //修改时间

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