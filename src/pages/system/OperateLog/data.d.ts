export interface OperateLogListParam {
    pageNo: number;
    pageSize?: number;
    title?: string; //模块标题
    businessType?: number; //业务类型（0其它 1新增 2修改 3删除）
    method?: string; //方法名称
    requestMethod?: string; //请求方式
    operatorType?: number; //操作类别（0其它 1后台用户 2手机端用户）
    operateName?: string; //操作人员
    deptName?: string; //部门名称
    operateUrl?: string; //请求URL
    operateIp?: string; //主机地址
    operateLocation?: string; //操作地点
    operateParam?: string; //请求参数
    jsonResult?: string; //返回参数
    status?: number; //操作状态(0:异常,正常)
    errorMsg?: string; //错误消息
    operateTime?: string; //操作时间
    costTime?: number; //消耗时间

}

export interface OperateLogVo {
    id: number; //日志主键
    title: string; //模块标题
    businessType: number; //业务类型（0其它 1新增 2修改 3删除）
    method: string; //方法名称
    requestMethod: string; //请求方式
    operatorType: number; //操作类别（0其它 1后台用户 2手机端用户）
    operateName: string; //操作人员
    deptName: string; //部门名称
    operateUrl: string; //请求URL
    operateIp: string; //主机地址
    operateLocation: string; //操作地点
    operateParam: string; //请求参数
    jsonResult: string; //返回参数
    status: number; //操作状态(0:异常,正常)
    errorMsg: string; //错误消息
    operateTime: string; //操作时间
    costTime: number; //消耗时间

}
