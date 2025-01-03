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
                        label: '日志主键',
                        children: <p>{res.data.id}</p>,
                    },
                    {
                        key: '2',
                        label: '模块标题',
                        children: <p>{res.data.title}</p>,
                    },
                    {
                        key: '3',
                        label: '业务类型（0其它 1新增 2修改 3删除）',
                        children: <p>{res.data.business_type}</p>,
                    },
                    {
                        key: '4',
                        label: '方法名称',
                        children: <p>{res.data.method}</p>,
                    },
                    {
                        key: '5',
                        label: '请求方式',
                        children: <p>{res.data.request_method}</p>,
                    },
                    {
                        key: '6',
                        label: '操作类别（0其它 1后台用户 2手机端用户）',
                        children: <p>{res.data.operator_type}</p>,
                    },
                    {
                        key: '7',
                        label: '操作人员',
                        children: <p>{res.data.operate_name}</p>,
                    },
                    {
                        key: '8',
                        label: '部门名称',
                        children: <p>{res.data.dept_name}</p>,
                    },
                    {
                        key: '9',
                        label: '请求URL',
                        children: <p>{res.data.operate_url}</p>,
                    },
                    {
                        key: '10',
                        label: '主机地址',
                        children: <p>{res.data.operate_ip}</p>,
                    },
                    {
                        key: '11',
                        label: '操作地点',
                        children: <p>{res.data.operate_location}</p>,
                    },
                    {
                        key: '12',
                        label: '请求参数',
                        children: <p>{res.data.operate_param}</p>,
                    },
                    {
                        key: '13',
                        label: '返回参数',
                        children: <p>{res.data.json_result}</p>,
                    },
                    {
                        key: '14',
                        label: '操作状态(0:异常,正常)',
                        children: <p>{res.data.status}</p>,
                    },
                    {
                        key: '15',
                        label: '错误消息',
                        children: <p>{res.data.error_msg}</p>,
                    },
                    {
                        key: '16',
                        label: '操作时间',
                        children: <p>{res.data.operate_time}</p>,
                    },
                    {
                        key: '17',
                        label: '消耗时间',
                        children: <p>{res.data.cost_time}</p>,
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
