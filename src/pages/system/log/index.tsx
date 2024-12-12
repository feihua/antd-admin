import React, {useEffect, useState} from 'react';
import {Button, Divider, message, Modal, Space, Table, Tag} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import {UserVo} from './data.d';
import CreateUserForm from "./components/add_user";
import UpdateUserForm from "./components/update_user";
import {addUser, handleResp, removeUser, updateUser, userList} from "./service";
import AdvancedSearchForm from "./components/search_user";

const User: React.FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isShowAddModal, setShowAddModal] = useState<boolean>(false);
    const [isShowEditModal, setShowEditModal] = useState<boolean>(false);
    const [userListData, setUserListData] = useState<UserVo[]>([]);
    const [currentUser, setCurrentUser] = useState<UserVo>();
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
            dataIndex: 'real_name',
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
                        <Tag color={status_id === 0 ? '#ff4d4f' : '#67c23a'} style={{width: 50, height: 30, textAlign: "center", paddingTop: 4}}>
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
        {
            title: '操作',
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

    const showModal = () => {
        setShowAddModal(true);
    };

    const handleAddOk = async (user: UserVo) => {
        if (handleResp(await addUser(user))) {
            setShowAddModal(false);
            let res = await userList({current: currentPage,})
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
            let res = await userList({
                current: currentPage, mobile: "",
            })
            setTotal(res.total)
            res.code === 0 ? setUserListData(res.data) : message.error(res.msg);
        }
    };

    const handleEditCancel = () => {
        setShowEditModal(false);
    };

    //删除单条数据
    const showDeleteConfirm = (user: UserVo) => {
        Modal.confirm({
            content: `确定删除${user.real_name}吗?`,
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
        if (handleResp(await removeUser(ids))) {
            let res = await userList({current: currentPage, mobile: "",})
            setTotal(res.total)
            res.code === 0 ? setUserListData(res.data) : message.error(res.msg);
        }

    };

    const handleSearchOk = async (user: UserVo) => {
        let res = await userList({current: currentPage, ...user,})
        setTotal(res.total)
        res.code === 0 ? setUserListData(res.data) : message.error(res.msg);
    };

    const handleResetOk = async () => {
        let res = await userList({current: currentPage,})
        setTotal(res.total)
        res.code === 0 ? setUserListData(res.data) : message.error(res.msg);
    };

    useEffect(() => {
        userList({
            current: currentPage,
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
            let res = await userList({current: page, pageSize})
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
                tableLayout={"fixed"}
            />

            <CreateUserForm onCancel={handleAddCancel} onCreate={handleAddOk} open={isShowAddModal}></CreateUserForm>
            <UpdateUserForm onCancel={handleEditCancel} onCreate={handleEditOk} open={isShowEditModal} userVo={currentUser}></UpdateUserForm>

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

export default User;