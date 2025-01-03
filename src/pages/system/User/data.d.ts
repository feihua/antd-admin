
export interface UserListParam {
    current: number;
    pageSize?: number;
    mobile?: string; //手机号码
    user_name?: string; //用户账号
    nick_name?: string; //用户昵称
    user_type?: string; //用户类型（00系统用户）
    avatar?: string; //头像路径
    email?: string; //用户邮箱
    status?: number; //状态(1:正常，0:禁用)
    dept_id?: number; //部门ID
    login_ip?: string; //最后登录IP
    login_date?: string; //最后登录时间
    login_browser?: string; //浏览器类型
    login_os?: string; //操作系统
    del_flag?: number; //删除标志（0代表删除 1代表存在）

}

export interface UserVo {
    id: number; //主键
    mobile: string; //手机号码
    user_name: string; //用户账号
    nick_name: string; //用户昵称
    user_type: string; //用户类型（00系统用户）
    avatar: string; //头像路径
    email: string; //用户邮箱
    password: string; //密码
    status: number; //状态(1:正常，0:禁用)
    sort: number; //排序
    dept_id: number; //部门ID
    post_ids: number; //岗位ids
    login_ip: string; //最后登录IP
    login_date: string; //最后登录时间
    login_browser: string; //浏览器类型
    login_os: string; //操作系统
    pwd_update_date: string; //密码最后更新时间
    remark: string; //备注
    del_flag: number; //删除标志（0代表删除 1代表存在）
    create_time: string; //创建时间
    update_time: string; //修改时间

}


export interface RoleVo {
    id: number; //主键
    role_name: string; //名称
    role_key: string; //角色权限字符串
    data_scope: number; //数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限）
    status: number; //状态(1:正常，0:禁用)
    sort: number; //排序
    remark: string; //备注
    del_flag: number; //删除标志（0代表删除 1代表存在）
    create_time: string; //创建时间
    update_time: string; //修改时间


}