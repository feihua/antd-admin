export interface UserListParam {
    pageNo: number;
    pageSize?: number;
    mobile?: string; //手机号码
    userName?: string; //用户账号
    nickName?: string; //用户昵称
    userType?: string; //用户类型（00系统用户）
    avatar?: string; //头像路径
    email?: string; //用户邮箱
    status?: number; //状态(1:正常，0:禁用)
    deptId?: number; //部门ID
    loginIp?: string; //最后登录IP
    loginDate?: string; //最后登录时间
    loginBrowser?: string; //浏览器类型
    loginOs?: string; //操作系统
    delFlag?: number; //删除标志（0代表删除 1代表存在）

}

export interface UserVo {
    id: number; //主键
    mobile: string; //手机号码
    userName: string; //用户账号
    nickName: string; //用户昵称
    userType: string; //用户类型（00系统用户）
    avatar: string; //头像路径
    email: string; //用户邮箱
    password: string; //密码
    status: number; //状态(1:正常，0:禁用)
    sort: number; //排序
    deptId: number; //部门ID
    postIds: number; //岗位ids
    loginIp: string; //最后登录IP
    loginDate: string; //最后登录时间
    loginBrowser: string; //浏览器类型
    loginOs: string; //操作系统
    pwdUpdateDate: string; //密码最后更新时间
    remark: string; //备注
    delFlag: number; //删除标志（0代表删除 1代表存在）
    createTime: string; //创建时间
    updateTime: string; //修改时间

}


export interface RoleVo {
    id: number; //主键
    roleName: string; //名称
    roleKey: string; //角色权限字符串
    dataScope: number; //数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限）
    status: number; //状态(1:正常，0:禁用)
    sort: number; //排序
    remark: string; //备注
    delFlag: number; //删除标志（0代表删除 1代表存在）
    createTime: string; //创建时间
    updateTime: string; //修改时间


}

export interface UserRoleListParam {
    pageNo: number;
    pageSize?: number;
    mobile?: string; //手机号码
    userName?: string; //用户账号
    userId?: number; //用户ID

}