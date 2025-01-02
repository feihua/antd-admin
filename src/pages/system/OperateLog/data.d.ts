export interface OperateLogListParam {
    current: number;
    pageSize?: number;
    title?: string; //模块标题
    business_type?: number; //业务类型（0其它 1新增 2修改 3删除）
    method?: string; //方法名称
    request_method?: string; //请求方式
    operator_type?: number; //操作类别（0其它 1后台用户 2手机端用户）
    operate_name?: string; //操作人员
    dept_name?: string; //部门名称
    operate_url?: string; //请求URL
    operate_ip?: string; //主机地址
    operate_location?: string; //操作地点
    operate_param?: string; //请求参数
    json_result?: string; //返回参数
    status?: number; //操作状态(0:异常,正常)
    error_msg?: string; //错误消息
    operate_time?: string; //操作时间
    cost_time?: number; //消耗时间

}

export interface OperateLogVo {
    id: number; //日志主键
    title: string; //模块标题
    business_type: number; //业务类型（0其它 1新增 2修改 3删除）
    method: string; //方法名称
    request_method: string; //请求方式
    operator_type: number; //操作类别（0其它 1后台用户 2手机端用户）
    operate_name: string; //操作人员
    dept_name: string; //部门名称
    operate_url: string; //请求URL
    operate_ip: string; //主机地址
    operate_location: string; //操作地点
    operate_param: string; //请求参数
    json_result: string; //返回参数
    status: number; //操作状态(0:异常,正常)
    error_msg: string; //错误消息
    operate_time: string; //操作时间
    cost_time: number; //消耗时间

}
