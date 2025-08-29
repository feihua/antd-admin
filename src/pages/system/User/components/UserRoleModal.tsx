import React, {useEffect, useState} from 'react';
import {Modal, Table} from 'antd';
import {RoleVo, UserVo} from "../data";
import {ColumnsType} from "antd/es/table";
import {query_user_role} from "../service";

interface UserRoleFormProps {
    open: boolean;
    onCreate: (userId: number, roleIds: number[]) => void;
    onCancel: () => void;
    userVo: UserVo;
}


const SetUserRoleModal: React.FC<UserRoleFormProps> = ({open, onCreate, onCancel, userVo}) => {
    const [roleList, setRoleList] = useState<RoleVo[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    //（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限）
    const getDataScope = function (scope: number): string {
        let text = '';
        switch (scope) {
            case 1:
                text = '全部数据权限'
                break;
            case 2:
                text = '自定数据权限'
                break;
            case 3:
                text = '本部门数据权限'
                break;
            default:
                text = '本部门及以下数据权限'
        }

        return text;

    }

    const columns: ColumnsType<RoleVo> = [
        {
            title: '角色编码',
            dataIndex: 'id',
        },
        {
            title: '角色名称',
            dataIndex: 'roleName',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: '权限字符',
            dataIndex: 'roleKey',
        },
        {
            title: '数据范围',
            dataIndex: 'dataScope',
            render: (_, {dataScope}) => (
                <>
                    {getDataScope(dataScope)}
                </>
            ),
        },
        {
            title: '备注',
            dataIndex: 'remark',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
        },
    ];


    useEffect(() => {
        if (open) {
            setRoleList([]);
            setSelectedRowKeys([]);
            query_user_role({pageNo: 1, pageSize: 10, userId:userVo.id}).then((res) => {
                setRoleList(res.data.sysRoleList);

                if (res.data.userRoleIds) {
                    setSelectedRowKeys(res.data.userRoleIds)
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