import React, {useEffect, useState} from 'react';
import {Button, Divider, message, Modal, Space, Switch, Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {UserListParam, UserVo} from './data';
import AddUserModal from "./components/AddModal.tsx";
import UpdateUserModal from "./components/UpdateModal.tsx";
import {addUser, handleResp, removeUser, update_user_role, updateUser, updateUserStatus, queryUserList} from "./service";
import AdvancedSearchForm from "./components/SearchForm.tsx";
import SetUserRoleModal from "./components/UserRoleModal.tsx";
import DetailModal from "./components/DetailModal.tsx";

const SysUser: React.FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isShowAddModal, setShowAddModal] = useState<boolean>(false);
    const [isShowEditModal, setShowEditModal] = useState<boolean>(false);
    const [isShowRoleModal, setShowRoleModal] = useState<boolean>(false);
    const [isShowDetailModal, setShowDetailModal] = useState<boolean>(false);
    const [userListData, setUserListData] = useState<UserVo[]>([]);
    const [currentUser, setCurrentUser] = useState<UserVo>({
        create_time: "", id: 0, mobile: "", user_name: "", remark: "", sort: 0, status_id: 0, update_time: ""
    });
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [total, setTotal] = useState<number>(10);

    const columns: ColumnsType<UserVo> = [
        {
            title: '手机号',
            dataIndex: 'mobile',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: '用户名',
            dataIndex: 'user_name',
        },
        {
            title: '排序',
            dataIndex: 'sort',
        },
        {
            title: '状态',
            dataIndex: 'status_id',
            render: (_dom, entity) => {
                return (
                    <Switch
                        checked={entity.status_id == 1}
                        onChange={(flag) => {
                            showStatusConfirm([entity.id], flag ? 1 : 0);
                        }}
                    />
                );
            },
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
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="small">
                    <Button type="link" size={'small'} icon={<EditOutlined/>}
                            onClick={() => showEditModal(record)}>编辑</Button>
                    <Button type="link" size={'small'} icon={<EditOutlined/>} onClick={() => showDetailModal(record)}>详情</Button>
                    <Button type="link" size={'small'} icon={<EditOutlined/>}
                            onClick={() => showRoleModal(record)}>设置角色</Button>
                    <Button type="link" size={'small'} danger icon={<DeleteOutlined/>}
                            onClick={() => showDeleteConfirm(record)}>删除</Button>
                </Space>
            ),
        },
    ];

    const showStatusConfirm = (ids: number[], status: number) => {
        Modal.confirm({
            title: `确定${status == 1 ? '启用' : '禁用'}吗？`,
            icon: <ExclamationCircleOutlined/>,
            async onOk() {
                await handleStatus(ids, status);
            },
            onCancel() {
            },
        });
    };
    const handleStatus = async (ids: number[], status: number) => {
        const hide = message.loading('正在更新状态');
        if (ids.length == 0) {
            hide();
            return true;
        }
        try {
            await updateUserStatus({ids, status});
            hide();
            let res = await queryUserList({current: currentPage, pageSize});
            setTotal(res.total);
            res.code === 0 ? setUserListData(res.data) : message.error(res.msg);
            message.success('更新状态成功');
            return true;
        } catch (error) {
            hide();
            return false;
        }
    };

    const showModal = () => {
        setShowAddModal(true);
    };

    const handleAddOk = async (user: UserVo) => {
        if (handleResp(await addUser(user))) {
            setShowAddModal(false);
            let res = await queryUserList({current: currentPage, pageSize})
            setTotal(res.total)
            res.code === 0 ? setUserListData(res.data) : message.error(res.msg);
        }
    }

    const handleAddCancel = () => {
        setShowAddModal(false);
    };


    const showEditModal = (user: UserVo) => {
        setCurrentUser(user)
        setShowEditModal(true);
    };

    const handleEditOk = async (user: UserVo) => {
        if (handleResp(await updateUser(user))) {
            setShowEditModal(false);
            let res = await queryUserList({
                current: currentPage, pageSize,
            })
            setTotal(res.total)
            res.code === 0 ? setUserListData(res.data) : message.error(res.msg);
        }
    };

    const handleEditCancel = () => {
        setShowEditModal(false);
    };

    const showDetailModal = (param: UserVo) => {
        setCurrentUser(param)
        setShowDetailModal(true);
    };


    const handleDetailCancel = () => {
        setShowDetailModal(false);
    };

    const showRoleModal = (user: UserVo) => {
        setCurrentUser(user)
        setShowRoleModal(true);
    };

    const handleRoleOk = async (user_id: number, role_ids: number[]) => {
        if (handleResp(await update_user_role(user_id, role_ids))) {
            setShowRoleModal(false);
            let res = await queryUserList({
                current: currentPage, pageSize,
            })
            setTotal(res.total)
            res.code === 0 ? setUserListData(res.data) : message.error(res.msg);
        }
    };

    const handleRoleCancel = () => {
        setShowRoleModal(false);
    };

    //删除单条数据
    const showDeleteConfirm = (user: UserVo) => {
        Modal.confirm({
            content: `确定删除${user.user_name}吗?`,
            async onOk() {
                await handleRemove([user.id]);
            },
            onCancel() {
                console.log('Cancel');
            }
        })
    };

    //批量删除
    const handleRemove = async (ids: number[]) => {
        if (handleResp(await removeUser({ids:ids}))) {
            let res = await queryUserList({current: currentPage, mobile: "", pageSize})
            setTotal(res.total)
            res.code === 0 ? setUserListData(res.data) : message.error(res.msg);
        }

    };

    const handleSearchOk = async (user: UserListParam) => {
        user.current = currentPage
        user.pageSize = pageSize
        let res = await queryUserList({...user})
        setTotal(res.total)
        res.code === 0 ? setUserListData(res.data) : message.error(res.msg);
    };

    const handleResetOk = async () => {
        setCurrentPage(1)
        let res = await queryUserList({current: 1, pageSize})
        setTotal(res.total)
        res.code === 0 ? setUserListData(res.data) : message.error(res.msg);
    };

    useEffect(() => {
        queryUserList({
            current: currentPage, pageSize
        }).then(res => {
            setTotal(res.total)
            res.code === 0 ? setUserListData(res.data) : message.error(res.msg);
        });
    }, []);


    const paginationProps = {
        defaultCurrent: 1,
        defaultPageSize: 10,
        current: currentPage, //当前页码
        pageSize, // 每页数据条数
        pageSizeOptions: [10, 20, 30, 40, 50],
        showQuickJumper: true,
        showTotal: (total: number) => (
            <span>总共{total}条</span>
        ),
        total,
        onChange: async (page: number, pageSize: number) => {
            console.log('onChange', page, pageSize)
            setCurrentPage(page)
            setPageSize(pageSize)
            let res = await queryUserList({current: page, pageSize})
            setTotal(res.total)
            res.code === 0 ? setUserListData(res.data) : message.error(res.msg);

        }, //改变页码的函数
        onShowSizeChange: (current: number, size: number) => {
            console.log('onShowSizeChange', current, size)
        }
    }

    return (
        <div style={{padding: 24}}>
            <div>
                <Space size={100}>
                    <Button type="primary" icon={<PlusOutlined/>} onClick={showModal}>新建</Button>
                    <AdvancedSearchForm search={handleSearchOk} reSet={handleResetOk}></AdvancedSearchForm>
                </Space>
            </div>

            <Divider/>

            <Table
                rowSelection={{
                    onChange: (selectedRowKeys: React.Key[]) => {
                        setSelectedRowKeys(selectedRowKeys)
                    },
                }}
                size={"middle"}
                columns={columns}
                dataSource={userListData}
                rowKey={'id'}
                pagination={paginationProps}
                // tableLayout={"fixed"}
            />

            <AddUserModal onCancel={handleAddCancel} onCreate={handleAddOk} open={isShowAddModal}></AddUserModal>
            <UpdateUserModal onCancel={handleEditCancel} onCreate={handleEditOk} open={isShowEditModal}
                             userVo={currentUser}></UpdateUserModal>
            <DetailModal onCancel={handleDetailCancel}  open={isShowDetailModal} id={currentUser.id}></DetailModal>
            <SetUserRoleModal onCancel={handleRoleCancel} onCreate={handleRoleOk} open={isShowRoleModal}
                              userVo={currentUser}></SetUserRoleModal>

            {selectedRowKeys.length > 0 &&
                <div>
                    已选择 {selectedRowKeys.length} 项
                    <Button style={{float: "right"}} danger icon={<DeleteOutlined/>} type={'primary'}
                            onClick={async () => {
                                await handleRemove(selectedRowKeys as number[]);
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

export default SysUser;