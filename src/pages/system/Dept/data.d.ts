export interface DeptListParam {
    current: number;
    pageSize?: number;
    parent_id?: number; //父部门id
    ancestors?: string; //祖级列表
    dept_name?: string; //部门名称
    leader?: string; //负责人
    phone?: string; //联系电话
    email?: string; //邮箱
    status?: number; //部门状态（0：停用，1:正常）
    del_flag?: number; //删除标志（0代表删除 1代表存在）

}

export interface DeptVo {
    id: number; //部门id
    parent_id: number; //父部门id
    ancestors: string; //祖级列表
    dept_name: string; //部门名称
    sort: number; //显示顺序
    leader: string; //负责人
    phone: string; //联系电话
    email: string; //邮箱
    status: number; //部门状态（0：停用，1:正常）
    del_flag: number; //删除标志（0代表删除 1代表存在）
    create_time: string; //创建时间
    update_time: string; //修改时间

}
