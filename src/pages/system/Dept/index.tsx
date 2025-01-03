import React, {useEffect, useState} from 'react';
import {Button, Divider, Modal, Space, Table, Tag} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import {DeptVo} from './data';
import AddModal from "./components/AddModal";
import UpdateModal from "./components/UpdateModal";
import AdvancedSearchForm from "./components/SearchForm";
import DetailModal from "./components/DetailModal";
import {addDept, handleResp, queryDeptList, removeDept, updateDept} from "./service";


const Dept: React.FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isShowAddModal, setShowAddModal] = useState<boolean>(false);
    const [isShowEditModal, setShowEditModal] = useState<boolean>(false);
    const [isShowDetailModal, setShowDetailModal] = useState<boolean>(false);
    const [deptListData, setDeptListData] = useState<DeptVo[]>([]);
    const [currentDept, setCurrentDept] = useState<DeptVo>({
        id: 0,
        parent_id: 0,
        ancestors: '',
        dept_name: '',
        sort: 0,
        leader: '',
        phone: '',
        email: '',
        status: 0,
        del_flag: 0,
        create_time: '',
        update_time: '',
    });

    const columns: ColumnsType<DeptVo> = [

        {
            title: '部门名称',
            dataIndex: 'dept_name',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: '排序',
            dataIndex: 'sort',
        },

        {
            title: '状态',
            dataIndex: 'status',
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
            dataIndex: 'create_time',
        },

        {
            title: '操作',
            key: 'action',
            width: 280,
            render: (_, record) => (
                <div>
                    <Button type="link" size={'small'} icon={<EditOutlined/>}
                            onClick={() => showEditModal(record)}>编辑</Button>
                    <Button type="link" size={'small'} icon={<EditOutlined/>}
                            onClick={() => showDetailModal(record)}>详情</Button>
                    <Button type="link" size={'small'} danger icon={<DeleteOutlined/>}
                            onClick={() => showDeleteConfirm(record)}>删除</Button>
                </div>
            ),
        },
    ];

    const showModal = () => {
        setShowAddModal(true);
    };

    const handleAddOk = async (param: DeptVo) => {
        if (handleResp(await addDept(param))) {
            setShowAddModal(false);
            setDeptListData(await queryDeptList({}));
        }
    }

    const handleAddCancel = () => {
        setShowAddModal(false);
    };


    const showEditModal = (param: DeptVo) => {
        setCurrentDept(param)
        setShowEditModal(true);
    };

    const handleEditOk = async (param: DeptVo) => {
        if (handleResp(await updateDept(param))) {
            setShowEditModal(false);
            setDeptListData(await queryDeptList({}));
        }
    };

    const handleEditCancel = () => {
        setShowEditModal(false);
    };

    const showDetailModal = (param: DeptVo) => {
        setCurrentDept(param)
        setShowDetailModal(true);
    };


    const handleDetailCancel = () => {
        setShowDetailModal(false);
    };

    //删除单条数据
    const showDeleteConfirm = (param: DeptVo) => {
        Modal.confirm({
            okText: '确定',
            cancelText: '取消',
            content: `确定删除${param.id}吗?`,
            async onOk() {
                await handleRemove([param.id]);
            },
            onCancel() {
                console.log('Cancel');
            }
        })
    };

    //批量删除
    const handleRemove = async (ids: number[]) => {
        if (handleResp(await removeDept(ids))) {
            setDeptListData(await queryDeptList({}));
        }

    };

    const handleSearchOk = async (param: DeptVo) => {
        setDeptListData(await queryDeptList({...param}));
    };

    const handleResetOk = async () => {
        setDeptListData(await queryDeptList({}));
    };

    useEffect(() => {
        queryDeptList({}).then(res => {
            setDeptListData(res);
        });
    }, []);


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
                dataSource={deptListData}
                rowKey={'id'}
                pagination={false}
                // tableLayout={"fixed"}
            />

            <AddModal onCancel={handleAddCancel} onCreate={handleAddOk} open={isShowAddModal}></AddModal>
            <UpdateModal onCancel={handleEditCancel} onCreate={handleEditOk} open={isShowEditModal}
                         id={currentDept.id}></UpdateModal>
            <DetailModal onCancel={handleDetailCancel} open={isShowDetailModal} id={currentDept.id}></DetailModal>

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

export default Dept;
