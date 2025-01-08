export interface DeptListParam {
    parentId?: number; //父部门id
    ancestors?: string; //祖级列表
    deptName?: string; //部门名称
    leader?: string; //负责人
    phone?: string; //联系电话
    email?: string; //邮箱
    status?: number; //部门状态（0：停用，1:正常）
    delFlag?: number; //删除标志（0代表删除 1代表存在）

}

export interface DeptVo {
    id: number; //部门id
    parentId: number; //父部门id
    ancestors: string; //祖级列表
    deptName: string; //部门名称
    sort: number; //显示顺序
    leader: string; //负责人
    phone: string; //联系电话
    email: string; //邮箱
    status: number; //部门状态（0：停用，1:正常）
    delFlag: number; //删除标志（0代表删除 1代表存在）
    createTime: string; //创建时间
    updateTime: string; //修改时间

}
