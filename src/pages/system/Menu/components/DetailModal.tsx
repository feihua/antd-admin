import React, {useEffect, useState} from 'react';
import {Descriptions, DescriptionsProps, Modal} from 'antd';
import {queryMenuDetail} from "../service";

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
                        label: '主键',
                        children: <p>{res.data.id}</p>,
                    },
                    {
                        key: '2',
                        label: '菜单名称',
                        children: <p>{res.data.menu_name}</p>,
                    },
                    {
                        key: '3',
                        label: '菜单类型(1：目录   2：菜单   3：按钮)',
                        children: <p>{res.data.menu_type}</p>,
                    },
                    {
                        key: '4',
                        label: '状态(1:正常，0:禁用)',
                        children: <p>{res.data.status}</p>,
                    },
                    {
                        key: '5',
                        label: '排序',
                        children: <p>{res.data.sort}</p>,
                    },
                    {
                        key: '6',
                        label: '父ID',
                        children: <p>{res.data.parent_id}</p>,
                    },
                    {
                        key: '7',
                        label: '路由路径',
                        children: <p>{res.data.menu_url}</p>,
                    },
                    {
                        key: '8',
                        label: '接口URL',
                        children: <p>{res.data.api_url}</p>,
                    },
                    {
                        key: '9',
                        label: '菜单图标',
                        children: <p>{res.data.menu_icon}</p>,
                    },
                    {
                        key: '10',
                        label: '备注',
                        children: <p>{res.data.remark}</p>,
                    },
                    {
                        key: '11',
                        label: '创建时间',
                        children: <p>{res.data.create_time}</p>,
                    },
                    {
                        key: '12',
                        label: '修改时间',
                        children: <p>{res.data.update_time}</p>,
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
