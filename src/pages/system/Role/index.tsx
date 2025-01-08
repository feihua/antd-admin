import React, {useEffect, useState} from 'react';
import {Button, Divider, message, Modal, Space, Switch, Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {RoleVo} from './data';
import CreateRoleForm from "./components/AddModal.tsx";
import UpdateRoleForm from "./components/UpdateModal.tsx";
import {
    addRole,
    handleResp,
    queryRoleList,
    removeRole,
    update_role_menu,
    updateRole,
    updateRoleStatus
} from "./service";
import AdvancedSearchForm from "./components/SearchForm.tsx";
import SetRoleMenuForm from "./components/RoleMenu.tsx";
import DetailModal from "./components/DetailModal.tsx";
import AllocatedUser from "./components/AllocatedUser.tsx";

const SysRole: React.FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isShowAddModal, setShowAddModal] = useState<boolean>(false);
    const [isShowEditModal, setShowEditModal] = useState<boolean>(false);
    const [isShowDetailModal, setShowDetailModal] = useState<boolean>(false);
    const [isShowMenuModal, setShowMenuModal] = useState<boolean>(false);
    const [isShowUserModal, setShowUserModal] = useState<boolean>(false);
    const [roleListData, setRoleListData] = useState<RoleVo[]>([]);
    const [currentRole, setCurrentRole] = useState<RoleVo>({
        createTime: "",
        dataScope: 0,
        delFlag: 0,
        id: 0,
        remark: "",
        roleKey: "",
        roleName: "",
        status: 0,
        updateTime: ""

    });
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [total, setTotal] = useState<number>(10);

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
            title: '角色编号',
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
            title: '状态',
            render: (_dom, entity) => {
                return (
                    <Switch
                        checked={entity.status == 1}
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
            dataIndex: 'createTime',
        },
        {
            title: '操作',
            key: 'action',
            width: '380px',
            render: (_, record) => (
                <>
                    {record.id != 1 &&
                        <Space size="small">
                            <Button type="link" size={'small'} icon={<EditOutlined/>}
                                    onClick={() => showEditModal(record)}>编辑</Button>
                            <Button type="link" size={'small'} icon={<EditOutlined/>}
                                    onClick={() => showDetailModal(record)}>详情</Button>
                            <Button type="link" size={'small'} icon={<EditOutlined/>}
                                    onClick={() => showRoleMenuModal(record)}>设置菜单</Button>
                            <Button type="link" size={'small'} icon={<EditOutlined/>}
                                    onClick={() => showRoleUserModal(record)}>分配用户</Button>
                            <Button type="link" size={'small'} danger icon={<DeleteOutlined/>}
                                    onClick={() => showDeleteConfirm(record)}>删除</Button>
                        </Space>}

                </>
            ),
        },
    ];

    const showStatusConfirm = (ids: number[], status: number) => {
        Modal.confirm({
            title: `确定${status == 1 ? "启用" : "禁用"}吗？`,
            okText: '确定',
            cancelText: '取消',
            icon: <ExclamationCircleOutlined/>,
            async onOk() {
                await handleStatus(ids, status)
                //actionRef.current?.clearSelected?.();
                //actionRef.current?.reload?.();
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
            await updateRoleStatus({ids, status});
            hide();
            let res = await queryRoleList({pageNo: currentPage, pageSize})
            setTotal(res.total)
            res.code === 0 ? setRoleListData(res.data) : message.error(res.msg);
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

    const handleAddOk = async (role: RoleVo) => {
        if (handleResp(await addRole(role))) {
            setShowAddModal(false);
            let res = await queryRoleList({pageNo: currentPage, pageSize})
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
            let res = await queryRoleList({
                pageNo: currentPage, pageSize
            })
            setTotal(res.total)
            res.code === 0 ? setRoleListData(res.data) : message.error(res.msg);
        }
    };

    const handleEditCancel = () => {
        setShowEditModal(false);
    };

    const showDetailModal = (param: RoleVo) => {
        setCurrentRole(param)
        setShowDetailModal(true);
    };


    const handleDetailCancel = () => {
        setShowDetailModal(false);
    };

    const showRoleMenuModal = (role: RoleVo) => {
        setCurrentRole(role)
        setShowMenuModal(true);
    };

    const handleMenuOk = async (roleId: Number, menuIds: Number[]) => {
        if (handleResp(await update_role_menu(roleId, menuIds))) {
            setShowMenuModal(false);
            let res = await queryRoleList({
                pageNo: currentPage, pageSize
            })
            setTotal(res.total)
            res.code === 0 ? setRoleListData(res.data) : message.error(res.msg);
        }
    };

    const handleMenuCancel = () => {
        setShowMenuModal(false);
    };

    const showRoleUserModal = (role: RoleVo) => {
        setCurrentRole(role)
        setShowUserModal(true);
    };

    const handleUserCancel = () => {
        setShowUserModal(false);
    };

    //删除单条数据
    const showDeleteConfirm = (role: RoleVo) => {
        Modal.confirm({
            okText: '确定',
            cancelText: '取消',
            content: `确定删除${role.roleName}吗?`,
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
        if (handleResp(await removeRole({ids}))) {
            let res = await queryRoleList({pageNo: currentPage, pageSize})
            setTotal(res.total)
            res.code === 0 ? setRoleListData(res.data) : message.error(res.msg);
        }

    };

    const handleSearchOk = async (role: RoleVo) => {
        let res = await queryRoleList({pageNo: currentPage, pageSize, ...role,})
        setTotal(res.total)
        res.code === 0 ? setRoleListData(res.data) : message.error(res.msg);
    };

    const handleResetOk = async () => {
        setCurrentPage(1)
        let res = await queryRoleList({current: 1, pageSize})
        setTotal(res.total)
        res.code === 0 ? setRoleListData(res.data) : message.error(res.msg);
    };

    useEffect(() => {
        queryRoleList({
            pageNo: currentPage, pageSize
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
            let res = await queryRoleList({current: page, pageSize})
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
                size={"small"}
                columns={columns}
                dataSource={roleListData}
                rowKey={'id'}
                pagination={paginationProps}
                // tableLayout={"fixed"}
            />

            <CreateRoleForm onCancel={handleAddCancel} onCreate={handleAddOk} open={isShowAddModal}></CreateRoleForm>
            <UpdateRoleForm onCancel={handleEditCancel} onCreate={handleEditOk} open={isShowEditModal}
                            roleVo={currentRole}></UpdateRoleForm>
            <DetailModal onCancel={handleDetailCancel} open={isShowDetailModal} id={currentRole.id}></DetailModal>
            <SetRoleMenuForm onCancel={handleMenuCancel} onCreate={handleMenuOk} open={isShowMenuModal}
                             roleVo={currentRole}></SetRoleMenuForm>
            <AllocatedUser onCancel={handleUserCancel} open={isShowUserModal}
                           roleVo={currentRole}></AllocatedUser>

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

export default SysRole;