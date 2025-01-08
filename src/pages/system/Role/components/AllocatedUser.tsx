import React, {useEffect, useState} from 'react';
import {Button, Divider, message, Modal, Space, Table, Tag} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {EditOutlined, ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons';

import AdvancedSearchUserForm from "./SearchUserForm.tsx";
import {QueryUserListParam, RoleVo} from "../data";
import {UserVo} from "../../User/data";
import {
    batch_auth_user,
    batch_cancel_auth_user,
    cancel_auth_user,
    handleResp,
    query_allocated_list
} from "../service.ts";
import UnallocatedUser from "./UnallocatedUser.tsx";

interface RoleDataProps {
    open: boolean;
    onCancel: () => void;
    roleVo: RoleVo;
}

const AllocatedUser: React.FC<RoleDataProps> = ({roleVo, open, onCancel}) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isShowUnallocatedModal, setShowUnallocatedModal] = useState<boolean>(false);
    const [userListData, setUserListData] = useState<UserVo[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [total, setTotal] = useState<number>(10);
    const [param, setParam] = useState<QueryUserListParam>({
        pageNo: 1, mobile: "", pageSize: 10, roleId: roleVo.id, userName: ""

    });
    const columns: ColumnsType<UserVo> = [
        {
            title: '用户编号',
            dataIndex: 'id',
        },
        {
            title: '手机号码',
            dataIndex: 'mobile',
        },
        {
            title: '用户账号',
            dataIndex: 'userName',
        },
        {
            title: '用户昵称',
            dataIndex: 'nickName',
        },
        {
            title: '状态',
            render: (_, {status}) => (
                <>
                    {

                        <Tag color={status === 1 ? 'green' : 'volcano'}
                             style={{width: 50, height: 30, textAlign: "center", paddingTop: 4}}>
                            {status === 1 ? '正常' : '停用'}
                        </Tag>
                    }
                </>
            ),
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) =>
                <>
                    <Space size="small">
                        <Button type="link" size={'small'} icon={<EditOutlined/>}
                                onClick={() => showCancelConfirm({
                                    roleId: roleVo.id,
                                    userId: record.id
                                })}>取消授权</Button>
                    </Space>
                </>

        },
    ];

    const showStatusConfirm = (ids: number[], roleId: number) => {
        Modal.confirm({
            okText: '确定',
            cancelText: '取消',
            title: `确定？`,
            icon: <ExclamationCircleOutlined/>,
            async onOk() {
                await handleStatus(ids, roleId);
            },
            onCancel() {
            },
        });
    };

    const handleStatus = async (userIds: number[], roleId: number) => {
        const hide = message.loading('正在更新状态');
        if (userIds.length == 0) {
            hide();
            return true;
        }
        try {
            await batch_cancel_auth_user({userIds, roleId});
            hide();
            let res = await query_allocated_list(param);
            setTotal(res.total);
            res.code === 0 ? setUserListData(res.data) : message.error(res.msg);
            message.success('更新状态成功');
            return true;
        } catch (error) {
            hide();
            return false;
        }
    };

    const showUnallocatedModal = () => {
        setShowUnallocatedModal(true);
    };

    const handleUnallocatedCancel = () => {
        setShowUnallocatedModal(false);
    };

    const handleUnallocatedOk = async (params: { userIds: number[], roleId: number }) => {
        if (handleResp(await batch_auth_user(params))) {
            setShowUnallocatedModal(false);
            console.log('param', param)
            let res = await query_allocated_list(param)
            setTotal(res.total)
            res.code === 0 ? setUserListData(res.data) : message.error(res.msg);
        }
    }

    //取消授权用户
    const showCancelConfirm = (params: { userId: number, roleId: number }) => {
        Modal.confirm({
            okText: '确定',
            cancelText: '取消',
            content: `确定取消授权用户吗?`,
            async onOk() {
                if (handleResp(await cancel_auth_user(params))) {

                    let res = await query_allocated_list(param)
                    setTotal(res.total)
                    res.code === 0 ? setUserListData(res.data) : message.error(res.msg);
                }
            },
            onCancel() {
                console.log('Cancel');
            }
        })
    };


    const handleSearchOk = async (user: QueryUserListParam) => {
        user.roleId = roleVo.id
        setParam(user)
        let res = await query_allocated_list(user)
        setTotal(res.total)
        res.code === 0 ? setUserListData(res.data) : message.error(res.msg);
    };

    const handleResetOk = async () => {
        setCurrentPage(1)
        setParam({
            pageNo: 1, mobile: "", pageSize: 10, roleId: roleVo.id, userName: ""

        })
        let res = await query_allocated_list({
            pageNo: 1,
            mobile: "",
            pageSize: pageSize,
            roleId: roleVo.id,
            userName: ""
        })
        setTotal(res.total)
        res.code === 0 ? setUserListData(res.data) : message.error(res.msg);
    };

    useEffect(() => {
        if (open) {

            setParam({
                pageNo: 1, mobile: "", pageSize: 10, roleId: roleVo.id, userName: ""

            })
            console.log('useEffect param', param)
            query_allocated_list({
                roleId: roleVo.id, pageNo: currentPage, pageSize
            }).then(res => {
                setTotal(res.total)
                res.code === 0 ? setUserListData(res.data) : message.error(res.msg);
            });
        }
    }, [open]);


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
            setCurrentPage(page)
            setPageSize(pageSize)
            let res = await query_allocated_list({pageNo: 0, mobile: "", pageSize: 0, roleId: 0, userName: ""})
            setTotal(res.total)
            res.code === 0 ? setUserListData(res.data) : message.error(res.msg);

        },
        onShowSizeChange: (current: number, size: number) => {
            console.log('onShowSizeChange', current, size)
        }
    }

    return (
        <Modal title="已分配的用户"
               destroyOnClose={true}
               onCancel={onCancel}
               open={open}
               width={1400}
               style={{top: 150}}
               footer={null}>

            <div style={{padding: 24}}>

                <div>
                    <Space size={10}>
                        <Button type="primary" icon={<PlusOutlined/>} onClick={showUnallocatedModal}>添加用户</Button>
                        {selectedRowKeys.length > 0 &&
                            <div>
                                <Button color="danger" variant="filled" style={{float: "right"}} icon={<PlusOutlined/>}
                                        onClick={async () => {
                                            showStatusConfirm(selectedRowKeys as number[], roleVo.id);
                                            setSelectedRowKeys([]);
                                        }}
                                >
                                    批量取消授权
                                </Button>
                            </div>
                        }
                        <AdvancedSearchUserForm search={handleSearchOk} reSet={handleResetOk}
                                                key={"allocatedUser"}></AdvancedSearchUserForm>
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
                    dataSource={userListData}
                    rowKey={'id'}
                    pagination={paginationProps}
                />

                <UnallocatedUser onCancel={handleUnallocatedCancel} onBatchAuthUserAll={handleUnallocatedOk}
                                 open={isShowUnallocatedModal} roleVo={roleVo}></UnallocatedUser>


            </div>
        </Modal>
    );
};

export default AllocatedUser;