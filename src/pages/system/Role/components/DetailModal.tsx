import React, {useEffect, useState} from 'react';
import {Descriptions, DescriptionsProps, Modal} from 'antd';
import {queryRoleDetail} from "../service";

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
            queryRoleDetail({id}).then((res) => {
                setColumns([
                    {
                        key: '1',
                        label: '主键',
                        children: <p>{res.data.id}</p>,
                    },
                    {
                        key: '2',
                        label: '名称',
                        children: <p>{res.data.role_name}</p>,
                    },
                    {
                        key: '3',
                        label: '角色权限字符串',
                        children: <p>{res.data.role_key}</p>,
                    },
                    {
                        key: '4',
                        label: '数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限）',
                        children: <p>{res.data.data_scope}</p>,
                    },
                    {
                        key: '5',
                        label: '状态(1:正常，0:禁用)',
                        children: <p>{res.data.status}</p>,
                    },
                    {
                        key: '6',
                        label: '排序',
                        children: <p>{res.data.sort}</p>,
                    },
                    {
                        key: '7',
                        label: '备注',
                        children: <p>{res.data.remark}</p>,
                    },
                    {
                        key: '8',
                        label: '删除标志（0代表删除 1代表存在）',
                        children: <p>{res.data.del_flag}</p>,
                    },
                    {
                        key: '9',
                        label: '创建时间',
                        children: <p>{res.data.create_time}</p>,
                    },
                    {
                        key: '10',
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
