import React from "react";

export interface RoleListParam {
    current: number;
    pageSize?: number;
    role_name?: string;
    status_id?: number;
}

export interface RoleVo {
    create_time: string;
    id: number;
    remark: string;
    role_name: string;
    sort: number;
    status_id: number;
    update_time: string;
}
