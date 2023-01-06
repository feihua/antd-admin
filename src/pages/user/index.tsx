import React, {useEffect, useState} from 'react';
import {Button, Divider, Input, message, Modal, Space, Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import {UserVo} from './data.d';
import CreateUserForm from "./components/add_user";
import UpdateUserForm from "./components/update_user";
import {addUser, removeUser, updateUser, userList} from "./service";
import {IResponse} from "../../api/ajax";
import AdvancedSearchForm from "./components/search_user";


const User: React.FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isShowAddModal, setShowAddModal] = useState<boolean>(false);
    const [isShowEditModal, setShowEditModal] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [userListData, setUserListData] = useState<UserVo[]>([]);
    const [currentUser, setCurrentUser] = useState<UserVo>();


    const columns: ColumnsType<UserVo> = [
        {
            title: '手机号',
            dataIndex: 'mobile',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: '用户名',
            dataIndex: 'real_name',
        },
        {
            title: '排序',
            dataIndex: 'sort',
        },
        {
            title: '状态',
            dataIndex: 'status_id',
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
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="small">
                    <Button type="primary" icon={<EditOutlined/>} onClick={() => showEditModal(record)}>编辑</Button>
                    <Button type="primary" danger icon={<DeleteOutlined/>}
                            onClick={() => showDeleteConfirm(record)}>删除</Button>
                </Space>
            ),
        },
    ];


    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: UserVo[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectedRowKeys(selectedRowKeys)
        },
    };

    const showModal = () => {
        setShowAddModal(true);
    };

    const handleAddOk = (user: UserVo) => {
        setConfirmLoading(true);
        addUser(user).then(res => {
            if (res.code === 0) {
                setShowAddModal(false);
                setConfirmLoading(false);
                message.success(res.msg);

                userList({current: 0, mobile: "", pageSize: 10, status_id: ""}).then(res => {
                    if (res.code === 0) {
                        setUserListData(res.data)
                        message.success(res.msg);
                    } else {
                        message.error(res.msg);
                    }
                });
            } else {
                setConfirmLoading(false);
                message.error(res.msg);
            }
        });
    }

    const handleAddCancel = () => {
        setShowAddModal(false);
    };


    const showEditModal = (user: UserVo) => {
        console.log(user)
        setCurrentUser(user)
        setShowEditModal(true);
    };

    const handleEditOk = (user: UserVo) => {
        setConfirmLoading(true);
        updateUser(user).then(res => {
            if (res.code === 0) {
                setShowEditModal(false);
                setConfirmLoading(false);
                message.success(res.msg);

                userList({current: 0, mobile: "", pageSize: 10, status_id: ""}).then(res => {
                    if (res.code === 0) {
                        setUserListData(res.data)
                        message.success(res.msg);
                    } else {
                        message.error(res.msg);
                    }
                });
            } else {
                setConfirmLoading(false);
                message.error(res.msg);
            }
        });
    };

    const handleEditCancel = () => {
        setShowEditModal(false);
    };

    //删除单条数据
    const showDeleteConfirm = (user: UserVo) => {
        Modal.confirm({
            content: `确定删除${user.real_name}吗?`,
            async onOk() {
                let res: IResponse = await removeUser([user.id as number]);
                if (res.code === 0) {
                    message.success(res.msg);
                    userList({current: 0, mobile: "", pageSize: 10, status_id: ""}).then(res => {
                        if (res.code === 0) {
                            setUserListData(res.data)
                            message.success(res.msg);
                        } else {
                            message.error(res.msg);
                        }
                    });
                } else {
                    message.error(res.msg);
                }
            },
            onCancel() {
                console.log('Cancel');
            }
        })
    };

    //批量删除
    const handleRemove = async (selectedRows: React.Key[]) => {
        console.log(selectedRows.map(row => Number(row.toString)))
        let res: IResponse = await removeUser(selectedRows as Number[]);
        if (res.code === 0) {
            message.success(res.msg);
            userList({current: 0, mobile: "", pageSize: 10, status_id: ""}).then(res => {
                if (res.code === 0) {
                    setUserListData(res.data)
                    message.success(res.msg);
                } else {
                    message.error(res.msg);
                }
            });
        } else {
            message.error(res.msg);
        }

    };

    const handleSearchOk = (user: UserVo) => {

        userList({current: 0, mobile: user.mobile, pageSize: 10, status_id: ""}).then(res => {
            if (res.code === 0) {
                setUserListData(res.data)
                message.success(res.msg);
            } else {
                message.error(res.msg);
            }
        });
    };

    const handleResetOk = () => {

        userList({current: 0, mobile: '', pageSize: 10, status_id: ""}).then(res => {
            if (res.code === 0) {
                setUserListData(res.data)
                message.success(res.msg);
            } else {
                message.error(res.msg);
            }
        });
    };

    useEffect(() => {
        userList({current: 0, mobile: "", pageSize: 10, status_id: ""}).then(res => {
            if (res.code === 0) {
                setUserListData(res.data)
                message.success(res.msg);
            } else {
                message.error(res.msg);
            }
        });
    }, []);

    return (
        <div>
            <div>
                <Space size={100}>
                    <Button type="primary" icon={<PlusOutlined/>} onClick={showModal}>新建</Button>
                    <AdvancedSearchForm search={handleSearchOk} reSet={handleResetOk}></AdvancedSearchForm>
                </Space>
            </div>

            <Divider/>

            <Table
                rowSelection={{
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={userListData}
                rowKey={'id'}
            />

            <CreateUserForm onCancel={handleAddCancel} onCreate={handleAddOk} open={isShowAddModal} confirmLoading={confirmLoading}></CreateUserForm>
            <UpdateUserForm onCancel={handleEditCancel} onCreate={handleEditOk} open={isShowEditModal} confirmLoading={confirmLoading} userVo={currentUser}></UpdateUserForm>

            {selectedRowKeys.length > 0 &&
                <div>
                    已选择 {selectedRowKeys.length} 项
                    <Button style={{float: "right"}} danger icon={<DeleteOutlined/>} type={'primary'}
                            onClick={async () => {
                                await handleRemove(selectedRowKeys);
                                setSelectedRowKeys([]);
                            }}
                    >
                        批量删除
                    </Button>
                </div>
            }

        </div>
    );
};

export default User;