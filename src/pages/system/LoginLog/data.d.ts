
export interface LoginLogListParam {
  current: number;
  pageSize?: number;
  login_name?: string; //登录账号
  ipaddr?: string; //登录IP地址
  login_location?: string; //登录地点
  browser?: string; //浏览器类型
  os?: string; //操作系统
  status?: number; //登录状态(0:失败,1:成功)
  msg?: string; //提示消息
  login_time?: string; //访问时间

}

export interface LoginLogVo {
  id: number; //访问ID
  login_name: string; //登录账号
  ipaddr: string; //登录IP地址
  login_location: string; //登录地点
  browser: string; //浏览器类型
  os: string; //操作系统
  status: number; //登录状态(0:失败,1:成功)
  msg: string; //提示消息
  login_time: string; //访问时间

}
