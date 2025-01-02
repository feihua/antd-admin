import React, {useEffect, useState} from 'react';
import {Descriptions, DescriptionsProps, Modal} from 'antd';
import {queryUserDetail} from "../service";

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
            queryUserDetail({id}).then((res) => {
                setColumns([
                    {
                        key: '1',
                        label: '主键',
                        children: <p>{res.data.id}</p>,
                    },
                    {
                        key: '2',
                        label: '手机号码',
                        children: <p>{res.data.mobile}</p>,
                    },
                    {
                        key: '3',
                        label: '用户账号',
                        children: <p>{res.data.user_name}</p>,
                    },
                    {
                        key: '4',
                        label: '用户昵称',
                        children: <p>{res.data.nick_name}</p>,
                    },
                    {
                        key: '5',
                        label: '用户类型（00系统用户）',
                        children: <p>{res.data.user_type}</p>,
                    },
                    {
                        key: '6',
                        label: '头像路径',
                        children: <p>{res.data.avatar}</p>,
                    },
                    {
                        key: '7',
                        label: '用户邮箱',
                        children: <p>{res.data.email}</p>,
                    },
                    {
                        key: '8',
                        label: '密码',
                        children: <p>{res.data.password}</p>,
                    },
                    {
                        key: '9',
                        label: '状态(1:正常，0:禁用)',
                        children: <p>{res.data.status}</p>,
                    },
                    {
                        key: '10',
                        label: '排序',
                        children: <p>{res.data.sort}</p>,
                    },
                    {
                        key: '11',
                        label: '部门ID',
                        children: <p>{res.data.dept_id}</p>,
                    },
                    {
                        key: '12',
                        label: '最后登录IP',
                        children: <p>{res.data.login_ip}</p>,
                    },
                    {
                        key: '13',
                        label: '最后登录时间',
                        children: <p>{res.data.login_date}</p>,
                    },
                    {
                        key: '14',
                        label: '浏览器类型',
                        children: <p>{res.data.login_browser}</p>,
                    },
                    {
                        key: '15',
                        label: '操作系统',
                        children: <p>{res.data.login_os}</p>,
                    },
                    {
                        key: '16',
                        label: '密码最后更新时间',
                        children: <p>{res.data.pwd_update_date}</p>,
                    },
                    {
                        key: '17',
                        label: '备注',
                        children: <p>{res.data.remark}</p>,
                    },
                    {
                        key: '18',
                        label: '删除标志（0代表删除 1代表存在）',
                        children: <p>{res.data.del_flag}</p>,
                    },
                    {
                        key: '19',
                        label: '创建时间',
                        children: <p>{res.data.create_time}</p>,
                    },
                    {
                        key: '20',
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
