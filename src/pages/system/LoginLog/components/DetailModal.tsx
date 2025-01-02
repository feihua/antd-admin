import React, {useEffect, useState} from 'react';
import {Descriptions, DescriptionsProps, Modal} from 'antd';
import {queryLoginLogDetail} from "../service";

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
            queryLoginLogDetail({id}).then((res) => {
                setColumns([
                    {
                        key: '1',
                        label: '访问编号',
                        children: <p>{res.data.id}</p>,
                    },
                    {
                        key: '2',
                        label: '用户名称',
                        children: <p>{res.data.login_name}</p>,
                    },
                    {
                        key: '3',
                        label: '登录地址',
                        children: <p>{res.data.ipaddr}</p>,
                    },
                    {
                        key: '4',
                        label: '登录地点',
                        children: <p>{res.data.login_location}</p>,
                    },
                    {
                        key: '5',
                        label: '浏览器类型',
                        children: <p>{res.data.browser}</p>,
                    },
                    {
                        key: '6',
                        label: '操作系统',
                        children: <p>{res.data.os}</p>,
                    },
                    {
                        key: '7',
                        label: '登录状态',
                        children: <p>{res.data.status == 1 ? '成功' : '失败'}</p>,
                    },
                    {
                        key: '8',
                        label: '操作消息',
                        children: <p>{res.data.msg}</p>,
                    },
                    {
                        key: '9',
                        label: '登录时间',
                        children: <p>{res.data.login_time}</p>,
                    },

                ])
            });
        }
    }, [open]);


    return (
        <Modal forceRender destroyOnClose title={"详情"} open={open} footer={false} width={1200} onCancel={onCancel}>
            <Descriptions items={columns} style={{margin: 30}} column={2}/>
        </Modal>
    );
};

export default DetailModal;
