import React from "react";

export interface RecordVo {
    api_url: string;
    icon: string;
    id: number;
    menu_type: number;
    name: string;
    parent_id: number;
    path: string;
}

export interface MyMenuItem {
    label: React.ReactNode;
    key: React.Key;
    icon?: React.ReactNode;
    parent_id: number;
    id: number;
}