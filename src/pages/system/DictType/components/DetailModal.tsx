import React, {useEffect, useState} from 'react';
import {Descriptions, DescriptionsProps, Modal} from 'antd';
import {queryDictTypeDetail} from "../service";

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
            queryDictTypeDetail({id}).then((res) => {
                setColumns([
                    {
                        key: '1',
                        label: '字典主键',
                        children: <p>{res.data.dictId}</p>,
                    },
                    {
                        key: '2',
                        label: '字典名称',
                        children: <p>{res.data.dictName}</p>,
                    },
                    {
                        key: '3',
                        label: '字典类型',
                        children: <p>{res.data.dictType}</p>,
                    },
                    {
                        key: '4',
                        label: '状态',
                        children: <p>{res.data.status == 1 ? '正常' : '停用'}</p>,
                    },
                    {
                        key: '5',
                        label: '备注',
                        children: <p>{res.data.remark}</p>,
                        span: 3
                    },
                    {
                        key: '6',
                        label: '创建时间',
                        children: <p>{res.data.createTime}</p>,
                    },
                    {
                        key: '7',
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
