export interface LoginLogListParam {
    current: number;
    pageSize?: number;
    login_name?: string; //登录账号
    ipaddr?: string; //登录IP地址
    login_location?: string; //登录地点
    platform?: string; //平台信息
    browser?: string; //浏览器类型
    version?: string; //浏览器版本
    os?: string; //操作系统
    arch?: string; //体系结构信息
    engine?: string; //渲染引擎信息
    engine_details?: string; //渲染引擎详细信息
    extra?: string; //其他信息（可选）
    status?: number; //登录状态(0:失败,1:成功)
    msg?: string; //提示消息
    login_time?: string; //访问时间

}

export interface LoginLogVo {
    id: number; //访问ID
    login_name: string; //登录账号
    ipaddr: string; //登录IP地址
    login_location: string; //登录地点
    platform: string; //平台信息
    browser: string; //浏览器类型
    version: string; //浏览器版本
    os: string; //操作系统
    arch: string; //体系结构信息
    engine: string; //渲染引擎信息
    engine_details: string; //渲染引擎详细信息
    extra: string; //其他信息（可选）
    status: number; //登录状态(0:失败,1:成功)
    msg: string; //提示消息
    login_time: string; //访问时间

}
