import React, {useEffect, useState} from 'react';
import {Button, Divider, message, Modal, Space, Table, Tag} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import {DictTypeVo} from './data';
import AddModal from "./components/AddModal";
import UpdateModal from "./components/UpdateModal";
import AdvancedSearchForm from "./components/SearchForm";
import DetailModal from "./components/DetailModal";
import {addDictType, handleResp, queryDictTypeList, removeDictType, updateDictType} from "./service";
import DictDataModal from "./components/DictDataModal.tsx";


const DictType: React.FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isShowAddModal, setShowAddModal] = useState<boolean>(false);
    const [isShowEditModal, setShowEditModal] = useState<boolean>(false);
    const [isShowDetailModal, setShowDetailModal] = useState<boolean>(false);
    const [isShowDictDataModal, setShowDictDataModal] = useState<boolean>(false);
    const [dictTypeListData, setDictTypeListData] = useState<DictTypeVo[]>([]);
    const [currentDictType, setCurrentDictType] = useState<DictTypeVo>({
        dict_id: 0,
        dict_name: '',
        dict_type: '',
        status: 0,
        remark: '',
        create_time: '',
        update_time: '',
    });
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [total, setTotal] = useState<number>(10);

    const columns: ColumnsType<DictTypeVo> = [
        {
            title: '字典主键',
            dataIndex: 'dict_id',
        },
        {
            title: '字典名称',
            dataIndex: 'dict_name',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: '字典类型',
            dataIndex: 'dict_type',
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
            title: '备注',
            dataIndex: 'remark',
        },
        {
            title: '创建时间',
            dataIndex: 'create_time',
        },
        {
            title: '修改时间',
            dataIndex: 'update_time',
        },

        {
            title: '操作',
            key: 'action',
            width: 320,
            render: (_, record) => (
                <div>
                    <Button type="link" size={'small'} icon={<EditOutlined/>}
                            onClick={() => showEditModal(record)}>编辑</Button>
                    <Button type="link" size={'small'} icon={<EditOutlined/>}
                            onClick={() => showDetailModal(record)}>详情</Button>
                    <Button type="link" size={'small'} icon={<EditOutlined/>}
                            onClick={() => showDictDataModal(record)}>字典数据</Button>
                    <Button type="link" size={'small'} danger icon={<DeleteOutlined/>}
                            onClick={() => showDeleteConfirm(record)}>删除</Button>
                </div>
            ),
        },
    ];

    const showModal = () => {
        setShowAddModal(true);
    };

    const handleAddOk = async (param: DictTypeVo) => {
        if (handleResp(await addDictType(param))) {
            setShowAddModal(false);
            const res = await queryDictTypeList({current: currentPage, pageSize})
            setTotal(res.total)
            res.code === 0 ? setDictTypeListData(res.data) : message.error(res.msg);
        }
    }

    const handleAddCancel = () => {
        setShowAddModal(false);
    };


    const showEditModal = (param: DictTypeVo) => {
        setCurrentDictType(param)
        setShowEditModal(true);
    };

    const handleEditOk = async (param: DictTypeVo) => {
        if (handleResp(await updateDictType(param))) {
            setShowEditModal(false);
            const res = await queryDictTypeList({
                current: currentPage, pageSize,
            })
            setTotal(res.total)
            res.code === 0 ? setDictTypeListData(res.data) : message.error(res.msg);
        }
    };

    const handleEditCancel = () => {
        setShowEditModal(false);
    };

    const showDetailModal = (param: DictTypeVo) => {
        setCurrentDictType(param)
        setShowDetailModal(true);
    };


    const handleDetailCancel = () => {
        setShowDetailModal(false);
    };

    const showDictDataModal = (param: DictTypeVo) => {
        setCurrentDictType(param)
        setShowDictDataModal(true);
    };


    const handleDictDataCancel = () => {
        setShowDictDataModal(false);
    };


    //删除单条数据
    const showDeleteConfirm = (param: DictTypeVo) => {
        Modal.confirm({
            okText: '确定',
            cancelText: '取消',
            content: `确定删除${param.dict_name}吗?`,
            async onOk() {
                await handleRemove([param.dict_id]);
            },
            onCancel() {
                console.log('Cancel');
            }
        })
    };

    //批量删除
    const handleRemove = async (ids: number[]) => {
        if (handleResp(await removeDictType(ids))) {
            const res = await queryDictTypeList({current: currentPage, pageSize})
            setTotal(res.total)
            res.code === 0 ? setDictTypeListData(res.data) : message.error(res.msg);
        }

    };

    const handleSearchOk = async (param: DictTypeVo) => {
        const res = await queryDictTypeList({current: currentPage, ...param, pageSize})
        setTotal(res.total)
        res.code === 0 ? setDictTypeListData(res.data) : message.error(res.msg);
    };

    const handleResetOk = async () => {
        const res = await queryDictTypeList({current: currentPage, pageSize})
        setTotal(res.total)
        res.code === 0 ? setDictTypeListData(res.data) : message.error(res.msg);
    };

    useEffect(() => {
        queryDictTypeList({
            current: currentPage, pageSize
        }).then(res => {
            setTotal(res.total)
            res.code === 0 ? setDictTypeListData(res.data) : message.error(res.msg);
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
            const res = await queryDictTypeList({current: page, pageSize})
            setTotal(res.total)
            res.code === 0 ? setDictTypeListData(res.data) : message.error(res.msg);

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
                dataSource={dictTypeListData}
                rowKey={'id'}
                pagination={paginationProps}
                // tableLayout={"fixed"}
            />

            <AddModal onCancel={handleAddCancel} onCreate={handleAddOk} open={isShowAddModal}></AddModal>
            <UpdateModal onCancel={handleEditCancel} onCreate={handleEditOk} open={isShowEditModal}
                         id={currentDictType.dict_id}></UpdateModal>
            <DetailModal onCancel={handleDetailCancel} open={isShowDetailModal}
                         id={currentDictType.dict_id}></DetailModal>
            <DictDataModal onCancel={handleDictDataCancel} open={isShowDictDataModal}
                           dict_type={currentDictType.dict_type}></DictDataModal>

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

export default DictType;
