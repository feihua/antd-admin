import React, {useEffect, useState} from 'react';
import {Descriptions, DescriptionsProps, Modal} from 'antd';
import {queryMenuDetail} from "../service";
import * as Icons from "@ant-design/icons";

export interface DetailModalProps {
    onCancel: () => void;
    open: boolean;
    id: number;

}

const DetailModal: React.FC<DetailModalProps> = (props) => {
    const {open, id, onCancel} = props;

    const [columns, setColumns] = useState<DescriptionsProps['items']>([]);
    useEffect(() => {
        if (open) {
            queryMenuDetail({id}).then((res) => {
                setColumns([
                    {
                        key: '1',
                        label: '菜单编号',
                        children: <p>{res.data.id}</p>,
                    },
                    {
                        key: '2',
                        label: '菜单名称',
                        children: <p>{res.data.menuName}</p>,
                    },
                    {
                        key: '3',
                        label: '菜单类型',
                        children: <p>{ res.data.menuType===1 ? '目录' : res.data.menuType===2 ? '菜单' : '按钮' }</p>,
                    },
                    {
                        key: '4',
                        label: '显示状态',
                        children: <p>{ res.data.visible===1 ? '显示' : '隐藏' }</p>,
                    },
                    {
                        key: '13',
                        label: '菜单状态',
                        children: <p>{ res.data.status===1 ? '正常' : '禁用' }</p>,
                    },
                    {
                        key: '5',
                        label: '排序',
                        children: <p>{res.data.sort}</p>,
                    },
                    {
                        key: '6',
                        label: '上级菜单',
                        children: <p>{res.data.parentId}</p>,
                    },
                    {
                        key: '7',
                        label: '路由路径',
                        children: <p>{res.data.menuUrl}</p>,
                    },
                    {
                        key: '9',
                        label: '菜单图标',
                        // @ts-ignore
                        children: <p>{React.createElement(Icons[res.data.menuIcon])}</p>,
                    },
                    {
                        key: '10',
                        label: '备注',
                        children: <p>{res.data.remark}</p>,
                    },
                    {
                        key: '11',
                        label: '创建时间',
                        children: <p>{res.data.createTime}</p>,
                    },
                    {
                        key: '12',
                        label: '修改时间',
                        children: <p>{res.data.updateTime}</p>,
                    },

                ])
            });
        }
    }, [open]);


    return (
        <Modal forceRender destroyOnClose title={"详情"} open={open} footer={false} width={800} onCancel={onCancel}>
            <Descriptions items={columns} style={{margin: 30}} column={2}/>
        </Modal>
    );
};

export default DetailModal;
