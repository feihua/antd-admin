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
                        label: '平台信息',
                        children: <p>{res.data.platform}</p>,
                    },
                    {
                        key: '6',
                        label: '浏览器类型',
                        children: <p>{res.data.browser}</p>,
                    },
                    {
                        key: '7',
                        label: '浏览器版本',
                        children: <p>{res.data.version}</p>,
                    },
                    {
                        key: '8',
                        label: '操作系统',
                        children: <p>{res.data.os}</p>,
                    },
                    {
                        key: '9',
                        label: '体系结构信息',
                        children: <p>{res.data.arch}</p>,
                    },
                    {
                        key: '10',
                        label: '渲染引擎信息',
                        children: <p>{res.data.engine}</p>,
                    },
                    {
                        key: '11',
                        label: '渲染引擎详细信息',
                        children: <p>{res.data.engine_details}</p>,
                    },
                    {
                        key: '12',
                        label: '其他信息（可选）',
                        children: <p>{res.data.extra}</p>,
                    },
                    {
                        key: '13',
                        label: '登录状态(0:失败,1:成功)',
                        children: <p>{res.data.status}</p>,
                    },
                    {
                        key: '14',
                        label: '提示消息',
                        children: <p>{res.data.msg}</p>,
                    },
                    {
                        key: '15',
                        label: '访问时间',
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
