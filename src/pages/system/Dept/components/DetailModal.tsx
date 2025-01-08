import React, {useEffect, useState} from 'react';
import {Descriptions, DescriptionsProps, Modal} from 'antd';
import {queryDeptDetail} from "../service";

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
            queryDeptDetail({id}).then((res) => {
                setColumns([
                    {
                        key: '1',
                        label: '部门id',
                        children: <p>{res.data.id}</p>,
                    },
                    {
                        key: '2',
                        label: '父部门id',
                        children: <p>{res.data.parentId}</p>,
                    },
                    {
                        key: '3',
                        label: '祖级列表',
                        children: <p>{res.data.ancestors}</p>,
                    },
                    {
                        key: '4',
                        label: '部门名称',
                        children: <p>{res.data.deptName}</p>,
                    },
                    {
                        key: '5',
                        label: '显示顺序',
                        children: <p>{res.data.sort}</p>,
                    },
                    {
                        key: '6',
                        label: '负责人',
                        children: <p>{res.data.leader}</p>,
                    },
                    {
                        key: '7',
                        label: '联系电话',
                        children: <p>{res.data.phone}</p>,
                    },
                    {
                        key: '8',
                        label: '邮箱',
                        children: <p>{res.data.email}</p>,
                    },
                    {
                        key: '9',
                        label: '部门状态',
                        children: <p>{res.data.status == 1 ? '正常' : '停用'}</p>,
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
