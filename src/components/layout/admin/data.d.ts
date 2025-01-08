import React from "react";

export interface RecordVo {
    api_url: string;
    icon: string;
    id: number;
    menuType: number;
    name: string;
    parentId: number;
    path: string;
}

export interface MyMenuItem {
    label: React.ReactNode;
    key: React.Key;
    icon?: React.ReactNode;
    parentId: number;
    id: number;
}