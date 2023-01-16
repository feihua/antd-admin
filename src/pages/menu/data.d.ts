import React from "react";

export interface MenuListParam {
    mobile?: string;
    status_id?: number;
}

export interface MenuVo {
    create_time: string;
    api_url: string;
    icon: string;
    id: number;
    label: string;
    menu_name: string;
    menu_type: number;
    menu_url: string;
    parent_id: number;
    remark: string;
    sort: number;
    status_id: number;
    update_time: string;
}
