import React, {useEffect, useState} from 'react';
import {Button, Divider, message, Modal, Space, Table, Tag} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {DeleteOutlined, EditOutlined, PlusOutlined, SettingOutlined} from '@ant-design/icons';
import {RoleVo} from './data.d';
import CreateRoleForm from "./components/add_role";
import UpdateRoleForm from "./components/update_role";
import {addRole, handleResp, removeRole, roleList, update_role_menu, updateRole} from "./service";
import AdvancedSearchForm from "./components/search_role";
import SetRoleMenuForm from "./components/set_role_menu";

const Role: React.FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isShowAddModal, setShowAddModal] = useState<boolean>(false);
    const [isShowEditModal, setShowEditModal] = useState<boolean>(false);
    const [isShowMenuModal, setShowMenuModal] = useState<boolean>(false);
    const [roleListData, setRoleListData] = useState<RoleVo[]>([]);
    const [currentRole, setCurrentRole] = useState<RoleVo>({create_time: "", id: 0, remark: "", role_name: "", sort: 0, status_id: 0, update_time: ""});
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [total, setTotal] = useState<number>(10);

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
                    <Button type="default" style={{backgroundColor: '#626aef', color: 'white'}} icon={<SettingOutlined/>}
                            onClick={() => showRoleMenuModal(record)}>设置菜单</Button>
                    <Button type="primary" danger icon={<DeleteOutlined/>}
                            onClick={() => showDeleteConfirm(record)}>删除</Button>
                </Space>
            ),
        },
    ];

    const showModal = () => {
        setShowAddModal(true);
    };

    const handleAddOk = async (role: RoleVo) => {
        if (handleResp(await addRole(role))) {
            setShowAddModal(false);
            let res = await roleList({current: currentPage, pageSize})
            setTotal(res.total)
            res.code === 0 ? setRoleListData(res.data) : message.error(res.msg);
        }
    }

    const handleAddCancel = () => {
        setShowAddModal(false);
    };


    const showEditModal = (role: RoleVo) => {
        setCurrentRole(role)
        setShowEditModal(true);
    };

    const handleEditOk = async (role: RoleVo) => {
        if (handleResp(await updateRole(role))) {
            setShowEditModal(false);
            let res = await roleList({
                current: currentPage, pageSize
            })
            setTotal(res.total)
            res.code === 0 ? setRoleListData(res.data) : message.error(res.msg);
        }
    };

    const handleEditCancel = () => {
        setShowEditModal(false);
    };

    const showRoleMenuModal = (role: RoleVo) => {
        setCurrentRole(role)
        setShowMenuModal(true);
    };

    const handleMenuOk = async (role_id: Number, menu_ids: Number[]) => {
        if (handleResp(await update_role_menu(role_id, menu_ids))) {
            setShowMenuModal(false);
            let res = await roleList({
                current: currentPage, pageSize
            })
            setTotal(res.total)
            res.code === 0 ? setRoleListData(res.data) : message.error(res.msg);
        }
    };

    const handleMenuCancel = () => {
        setShowMenuModal(false);
    };

    //删除单条数据
    const showDeleteConfirm = (role: RoleVo) => {
        Modal.confirm({
            content: `确定删除${role.role_name}吗?`,
            async onOk() {
                await handleRemove([role.id]);
            },
            onCancel() {
                console.log('Cancel');
            }
        })
    };

    //批量删除
    const handleRemove = async (ids: number[]) => {
        if (handleResp(await removeRole(ids))) {
            let res = await roleList({current: currentPage, pageSize})
            setTotal(res.total)
            res.code === 0 ? setRoleListData(res.data) : message.error(res.msg);
        }

    };

    const handleSearchOk = async (role: RoleVo) => {
        let res = await roleList({current: currentPage, pageSize, ...role,})
        setTotal(res.total)
        res.code === 0 ? setRoleListData(res.data) : message.error(res.msg);
    };

    const handleResetOk = async () => {
        let res = await roleList({current: currentPage, pageSize})
        setTotal(res.total)
        res.code === 0 ? setRoleListData(res.data) : message.error(res.msg);
    };

    useEffect(() => {
        roleList({
            current: currentPage, pageSize
        }).then(res => {
            setTotal(res.total)
            res.code === 0 ? setRoleListData(res.data) : message.error(res.msg);
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
            let res = await roleList({current: page, pageSize})
            setTotal(res.total)
            res.code === 0 ? setRoleListData(res.data) : message.error(res.msg);

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
                dataSource={roleListData}
                rowKey={'id'}
                pagination={paginationProps}
                // tableLayout={"fixed"}
            />

            <CreateRoleForm onCancel={handleAddCancel} onCreate={handleAddOk} open={isShowAddModal}></CreateRoleForm>
            <UpdateRoleForm onCancel={handleEditCancel} onCreate={handleEditOk} open={isShowEditModal} roleVo={currentRole}></UpdateRoleForm>
            <SetRoleMenuForm onCancel={handleMenuCancel} onCreate={handleMenuOk} open={isShowMenuModal} roleVo={currentRole}></SetRoleMenuForm>

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

export default Role;