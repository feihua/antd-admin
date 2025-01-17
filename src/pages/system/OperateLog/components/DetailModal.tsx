import React, {useEffect, useState} from 'react';
import {Descriptions, DescriptionsProps, Modal} from 'antd';
import {queryOperateLogDetail} from "../service";

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
            queryOperateLogDetail({id}).then((res) => {
                setColumns([
                    {
                        key: '1',
                        label: '主键',
                        children: <p>{res.data.id}</p>,
                    },
                    {
                        key: '2',
                        label: '系统模块',
                        children: <p>{res.data.title}</p>,
                    },
                    {
                        key: '3',
                        label: '操作人员',
                        children: <p>{res.data.userId}</p>,
                    },
                    {
                        key: '4',
                        label: '操作人员',
                        children: <p>{res.data.userName}</p>,
                    },
                    {
                        key: '5',
                        label: '部门id',
                        children: <p>{res.data.deptId}</p>,
                    },
                    {
                        key: '6',
                        label: '部门名称',
                        children: <p>{res.data.deptName}</p>,
                    },
                    {
                        key: '7',
                        label: '平台信息',
                        children: <p>{res.data.platform}</p>,
                    },
                    {
                        key: '8',
                        label: '操作系统',
                        children: <p>{res.data.os}</p>,
                    },
                    {
                        key: '9',
                        label: '浏览器类型',
                        children: <p>{res.data.browser}</p>,
                    },
                    {
                        key: '10',
                        label: '浏览器版本',
                        children: <p>{res.data.version}</p>,
                    },
                    {
                        key: '11',
                        label: '渲染引擎信息',
                        children: <p>{res.data.engine}</p>,
                    },
                    {
                        key: '12',
                        label: 'IP地址',
                        children: <p>{res.data.operateIp}</p>,
                    },
                    {
                        key: '13',
                        label: '请求URL',
                        children: <p>{res.data.operationUrl}</p>,
                    },
                    {
                        key: '14',
                        label: '请求方式',
                        children: <p>{res.data.requestMethod}</p>,
                    },
                    {
                        key: '15',
                        label: '操作描述',
                        children: <p>{res.data.operationDesc}</p>,
                    },
                    {
                        key: '16',
                        label: '操作状态(0:异常,正常)',
                        children: <p>{res.data.status}</p>,
                    },
                    {
                        key: '17',
                        label: '请求参数',
                        children: <p>{res.data.operateParam}</p>,
                    },
                    {
                        key: '18',
                        label: '操作结果',
                        children: <p>{res.data.jsonResult}</p>,
                    },
                    {
                        key: '19',
                        label: '异常消息',
                        children: <p>{res.data.errorMsg}</p>,
                    },
                    {
                        key: '20',
                        label: '详细的异常信息',
                        children: <p>{res.data.errMsgDetail}</p>,
                    },
                    {
                        key: '21',
                        label: '耗时',
                        children: <p>{res.data.costTime}</p>,
                    },
                    {
                        key: '22',
                        label: '操作时间',
                        children: <p>{res.data.operateTime}</p>,
                    },

                ])
            });
        }
    }, [open]);


    return (
        <Modal forceRender destroyOnClose title={"详情"} open={open} footer={false} width={1200} onCancel={onCancel}>
            <Descriptions items={columns} style={{margin: 30}}/>
        </Modal>
    );
};

export default DetailModal;
