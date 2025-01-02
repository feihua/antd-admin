import React, {useEffect, useState} from 'react';
import {Descriptions, DescriptionsProps, Modal} from 'antd';
import {queryPostDetail} from "../service";

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
            queryPostDetail({id}).then((res) => {
                setColumns([
                    {
                        key: '1',
                        label: '岗位id',
                        children: <p>{res.data.id}</p>,
                    },
                    {
                        key: '2',
                        label: '岗位编码',
                        children: <p>{res.data.post_code}</p>,
                    },
                    {
                        key: '3',
                        label: '岗位名称',
                        children: <p>{res.data.post_name}</p>,
                    },
                    {
                        key: '4',
                        label: '显示顺序',
                        children: <p>{res.data.sort}</p>,
                    },
                    {
                        key: '5',
                        label: '部门状态',
                        children: <p>{res.data.status == 1 ? '正常' : '停用'}</p>,
                    },
                    {
                        key: '6',
                        label: '备注',
                        children: <p>{res.data.remark}</p>,
                    },
                    {
                        key: '7',
                        label: '创建时间',
                        children: <p>{res.data.create_time}</p>,
                    },
                    {
                        key: '8',
                        label: '更新时间',
                        children: <p>{res.data.update_time}</p>,
                    },

                ])
            });
        }
    }, [open]);


    return (
        <Modal forceRender destroyOnClose title={"title"} open={open} footer={false} width={800} onCancel={onCancel}>
            <Descriptions items={columns} style={{margin: 30}} column={2}/>
        </Modal>
    );
};

export default DetailModal;
