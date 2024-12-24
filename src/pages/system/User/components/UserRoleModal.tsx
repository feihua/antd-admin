import React, {useEffect, useState} from 'react';
import {Modal, Table, Tag} from 'antd';
import {UserVo, RoleVo} from "../data";
import {ColumnsType} from "antd/es/table";
import {query_user_role} from "../service";

interface UserRoleFormProps {
    open: boolean;
    onCreate: (user_id: number, role_ids: number[]) => void;
    onCancel: () => void;
    userVo: UserVo;
}

const columns: ColumnsType<RoleVo> = [
    {
        title: '角色名称',
        dataIndex: 'role_name',
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: '排序',
        dataIndex: 'sort',
    },
    {
        title: '状态',
        dataIndex: 'status_id',
        render: (_, {status_id}) => (
            <>
                {
                    <Tag color={status_id === 0 ? '#ff4d4f' : '#67c23a'}
                         style={{width: 50, height: 30, textAlign: "center", paddingTop: 4}}>
                        {status_id === 0 ? '禁用' : '启用'}
                    </Tag>
                }
            </>
        ),
    },
    {
        title: '备注',
        dataIndex: 'remark',
    },
    {
        title: '创建时间',
        dataIndex: 'create_time',
    },
    {
        title: '更新时间',
        dataIndex: 'update_time',
    },
];

const SetUserRoleModal: React.FC<UserRoleFormProps> = ({open, onCreate, onCancel, userVo}) => {
    const [roleList, setRoleList] = useState<RoleVo[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    useEffect(() => {
        if (open) {
            setRoleList([]);
            setSelectedRowKeys([]);
            query_user_role(userVo.id).then((res) => {
                setRoleList(res.data.sys_role_list);

                if (res.data.user_role_ids) {
                    setSelectedRowKeys(res.data.user_role_ids)
                }
            });
        }
    }, [open]);

    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys: React.Key[]) => {
            setSelectedRowKeys(newSelectedRowKeys);
        },
    };

    const handleOk = () => {
        onCreate(userVo.id, selectedRowKeys.map((i) => Number(i)))
    }

    return (
        <Modal title="更新" okText="保存" onOk={handleOk} onCancel={onCancel} cancelText="取消" open={open} width={1000}
               style={{top: 150}}>
            <Table rowKey="id" rowSelection={rowSelection} columns={columns} dataSource={roleList}/>
        </Modal>
    );
};

export default SetUserRoleModal;