import React, {useEffect, useState} from 'react';
import {Divider, message, Modal, Space, Table, Tag} from 'antd';
import type {ColumnsType} from 'antd/es/table';

import AdvancedSearchUserForm from "./SearchUserForm.tsx";
import {UserVo} from "../../User/data";
import {query_unallocated_list} from "../service.ts";
import {QueryUserListParam, RoleVo} from "../data";

interface RoleDataProps {
    open: boolean;
    onCancel: () => void;
    onBatchAuthUserAll: (values: { userIds: number[], roleId: number }) => void;
    roleVo: RoleVo;
}

const UnallocatedUser: React.FC<RoleDataProps> = ({roleVo, open, onCancel, onBatchAuthUserAll}) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
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
    ];


    const handleOk = () => {
        onBatchAuthUserAll({userIds: selectedRowKeys as number[], roleId: roleVo.id});
    }

    const handleSearchOk = async (user: QueryUserListParam) => {
        user.roleId = roleVo.id
        setParam(user)
        let res = await query_unallocated_list(user)
        setTotal(res.total)
        res.code === 0 ? setUserListData(res.data) : message.error(res.msg);
    };

    const handleResetOk = async () => {
        setCurrentPage(1)
        setParam({
            pageNo: 1, mobile: "", pageSize: 10, roleId: roleVo.id, userName: ""

        })
        let res = await query_unallocated_list({
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
        if (open){
            query_unallocated_list(param).then(res => {
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
            let res = await query_unallocated_list({
                pageNo: page,
                mobile: param.mobile,
                pageSize,
                roleId: roleVo.id,
                userName: param.userName,
            })
            setTotal(res.total)
            res.code === 0 ? setUserListData(res.data) : message.error(res.msg);

        }, //改变页码的函数
        onShowSizeChange: (current: number, size: number) => {
            console.log('onShowSizeChange', current, size)
        }
    }

    return (
        <Modal title="选择用户"
               destroyOnClose={true}
               okText="保存"
               cancelText="取消"
               onOk={handleOk}
               onCancel={onCancel}
               open={open}
               width={1400}
               style={{top: 150}}>

            <div style={{padding: 24}}>

                <div>
                    <Space size={100}>
                        <AdvancedSearchUserForm search={handleSearchOk} reSet={handleResetOk} key={"unallocatedUser"}></AdvancedSearchUserForm>
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


            </div>
        </Modal>
    );
};

export default UnallocatedUser;