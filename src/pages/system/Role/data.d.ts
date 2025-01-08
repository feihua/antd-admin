export interface RoleListParam {
    pageNo: number;
    pageSize?: number;
    roleName?: string; //名称
    roleKey?: string; //角色权限字符串
    dataScope?: number; //数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限）
    status?: number; //状态(1:正常，0:禁用)

}

export interface RoleVo {
    id: number; //主键
    roleName: string; //名称
    roleKey: string; //角色权限字符串
    dataScope: number; //数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限）
    status: number; //状态(1:正常，0:禁用)
    remark: string; //备注
    delFlag: number; //删除标志（0代表删除 1代表存在）
    createTime: string; //创建时间
    updateTime: string; //修改时间

}

export interface QueryUserListParam {
    pageNo?: number;
    pageSize?: number;
    roleId: number; //角色id
    userName?: string; //用户账号
    mobile?: string; //手机号码
}
