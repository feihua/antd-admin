
export interface MenuListParam {
  pageNo: number;
  pageSize?: number;
  menuName?: string; //菜单名称
  menuType?: number; //菜单类型(1：目录   2：菜单   3：按钮)
  visible?: number; //显示状态（0:隐藏, 显示:1）
  status?: number; //菜单状态(1:正常，0:禁用)
  parentId?: number; //父ID
  menuUrl?: string; //路由路径
  apiUrl?: string; //接口URL

}

export interface MenuVo {
  id: number; //主键
  menuName: string; //菜单名称
  menuType: number; //菜单类型(1：目录   2：菜单   3：按钮)
  visible: number; //显示状态（0:隐藏, 显示:1）
  status: number; //菜单状态(1:正常，0:禁用)
  sort: number; //排序
  parentId: number; //父ID
  menuUrl: string; //路由路径
  apiUrl: string; //接口URL
  menuIcon: string; //菜单图标
  remark: string; //备注
  createTime: string; //创建时间
  updateTime: string; //修改时间

}
