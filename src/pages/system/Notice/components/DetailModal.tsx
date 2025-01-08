import React, {useEffect, useState} from 'react';
import {Descriptions, DescriptionsProps, Modal} from 'antd';
import {queryNoticeDetail} from "../service";

export interface DetailModalProps {
    onCancel: () => void;
    open: boolean;
    id: number;

}

const DetailModal: React.FC<DetailModalProps> = (props) => {
    const {open, id, onCancel} = props;

    const [title, setTitle] = useState<string>("通知详情");

    const [columns, setColumns] = useState<DescriptionsProps['items']>([]);
    useEffect(() => {
        if (open) {
            queryNoticeDetail({id}).then((res) => {
                setTitle(res.data.noticeType == 1 ? "通知详情" : "公告详情")
                setColumns([
                    {
                        key: '1',
                        label: '公告编号',
                        children: <p>{res.data.id}</p>,
                    },
                    {
                        key: '2',
                        label: '公告标题',
                        children: <p>{res.data.noticeTitle}</p>,
                    },
                    {
                        key: '3',
                        label: '公告类型',
                        children: <p>{res.data.noticeType == 1 ? '通知' : '公告'}</p>,
                    },
                    {
                        key: '5',
                        label: '公告状态',
                        children: <p>{res.data.status == 1 ? '正常' : '关闭'}</p>,
                    },
                    {
                        key: '4',
                        label: '公告内容',
                        children: <p>{res.data.noticeContent}</p>,
                        span: 3
                    },

                    {
                        key: '6',
                        label: '公告备注',
                        children: <p>{res.data.remark}</p>,
                        span: 3
                    },
                    {
                        key: '7',
                        label: '创建时间',
                        children: <p>{res.data.createTime}</p>,
                    },
                    {
                        key: '8',
                        label: '修改时间',
                        children: <p>{res.data.updateTime}</p>,
                    },

                ])
            });
        }
    }, [open]);


    return (
        <Modal forceRender destroyOnClose title={title} open={open} footer={false} width={800} onCancel={onCancel}>
            <Descriptions items={columns} column={2} style={{margin: 30}}/>
        </Modal>
    );
};

export default DetailModal;
