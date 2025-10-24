import React, {useEffect, useState} from 'react';
import {Button, Divider, message, Modal, Space, Table, Tag} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import {DictDataListParam, DictDataVo} from './data';
import AddModal from "./components/AddModal";
import UpdateModal from "./components/UpdateModal";
import AdvancedSearchForm from "./components/SearchForm";
import DetailModal from "./components/DetailModal";
import {addDictData, handleResp, queryDictDataList, removeDictData, updateDictData} from "./service";

interface DictDataProps {
    dictType: string;
    open: boolean;
}

const DictData: React.FC<DictDataProps> = ({dictType, open}) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isShowAddModal, setShowAddModal] = useState<boolean>(false);
    const [isShowEditModal, setShowEditModal] = useState<boolean>(false);
    const [isShowDetailModal, setShowDetailModal] = useState<boolean>(false);
    const [dictDataListData, setDictDataListData] = useState<DictDataVo[]>([]);
    const [currentDictData, setCurrentDictData] = useState<DictDataVo>({
        id: 0,
        dictSort: 0,
        dictLabel: '',
        dictValue: '',
        dictType: '',
        cssClass: '',
        listClass: '',
        isDefault: '',
        status: 0,
        remark: '',
        createTime: '',
        updateTime: '',
    });
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [total, setTotal] = useState<number>(10);

    const columns: ColumnsType<DictDataVo> = [
        {
            title: '字典编码',
            dataIndex: 'id',
        },

        {
            title: '字典标签',
            dataIndex: 'dictLabel',
        },
        {
            title: '字典键值',
            dataIndex: 'dictValue',
        },
        {
            title: '字典排序',
            dataIndex: 'dictSort',
        },
        {
            title: '字典类型',
            dataIndex: 'dictType',
        },
        {
            title: '是否默认',
            dataIndex: 'isDefault',
            render: (_, {isDefault}) => (
                <>
                    {

                        <Tag color={isDefault === 'Y' ? 'green' : 'volcano'}
                             style={{width: 50, height: 30, textAlign: "center", paddingTop: 4}}>
                            {isDefault === 'Y' ? '是' : '否'}
                        </Tag>
                    }
                </>
            ),
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
            dataIndex: 'createTime',
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

    const handleAddOk = async (param: DictDataVo) => {
        param.dictType = dictType
        if (handleResp(await addDictData(param))) {
            setShowAddModal(false);
            const res = await queryDictDataList({pageNo: currentPage, pageSize, dictType})
            setTotal(res.total)
            res.code === 0 ? setDictDataListData(res.data) : message.error(res.msg);
        }
    }

    const handleAddCancel = () => {
        setShowAddModal(false);
    };


    const showEditModal = (param: DictDataVo) => {
        setCurrentDictData(param)
        setShowEditModal(true);
    };

    const handleEditOk = async (param: DictDataVo) => {
        param.dictType = dictType
        if (handleResp(await updateDictData(param))) {
            setShowEditModal(false);
            const res = await queryDictDataList({
                pageNo: currentPage, pageSize, dictType
            })
            setTotal(res.total)
            res.code === 0 ? setDictDataListData(res.data) : message.error(res.msg);
        }
    };

    const handleEditCancel = () => {
        setShowEditModal(false);
    };

    const showDetailModal = (param: DictDataVo) => {
        setCurrentDictData(param)
        setShowDetailModal(true);
    };


    const handleDetailCancel = () => {
        setShowDetailModal(false);
    };

    //删除单条数据
    const showDeleteConfirm = (param: DictDataVo) => {
        Modal.confirm({
            okText: '确定',
            cancelText: '取消',
            content: `确定删除${param.dictLabel}吗?`,
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
        if (handleResp(await removeDictData(ids))) {
            const res = await queryDictDataList({pageNo: currentPage, pageSize, dictType})
            setTotal(res.total)
            res.code === 0 ? setDictDataListData(res.data) : message.error(res.msg);
        }

    };

    const handleSearchOk = async (param: DictDataListParam) => {
        const res = await queryDictDataList({...param, dictType})
        setTotal(res.total)
        res.code === 0 ? setDictDataListData(res.data) : message.error(res.msg);
    };

    const handleResetOk = async () => {
        const res = await queryDictDataList({pageNo: currentPage, pageSize, dictType})
        setTotal(res.total)
        res.code === 0 ? setDictDataListData(res.data) : message.error(res.msg);
    };

    useEffect(() => {
        if (open) {
            queryDictDataList({
                pageNo: currentPage, pageSize, dictType
            }).then(res => {
                setTotal(res.total)
                res.code === 0 ? setDictDataListData(res.data) : message.error(res.msg);
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
            const res = await queryDictDataList({pageNo: page, pageSize, dictType})
            setTotal(res.total)
            res.code === 0 ? setDictDataListData(res.data) : message.error(res.msg);

        }, 
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
                dataSource={dictDataListData}
                rowKey={'id'}
                pagination={paginationProps}
                // tableLayout={"fixed"}
            />

            <AddModal onCancel={handleAddCancel} onCreate={handleAddOk} open={isShowAddModal}
                      dictType={dictType}></AddModal>
            <UpdateModal onCancel={handleEditCancel} onCreate={handleEditOk} open={isShowEditModal}
                         id={currentDictData.id}></UpdateModal>
            <DetailModal onCancel={handleDetailCancel} open={isShowDetailModal}
                         id={currentDictData.id}></DetailModal>

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

export default DictData;
