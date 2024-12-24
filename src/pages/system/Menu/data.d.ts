export interface MenuListParam {


}

export interface MenuVo {
    id: number; //主键
    menu_name: string; //菜单名称
    menu_type: number; //菜单类型(1：目录   2：菜单   3：按钮)
    status_id: number; //状态(1:正常，0:禁用)
    sort: number; //排序
    parent_id: number; //父ID
    menu_url: string; //路由路径
    api_url: string; //接口URL
    menu_icon: string; //菜单图标
    remark: string; //备注
    create_time: string; //创建时间
    update_time: string; //修改时间

}
