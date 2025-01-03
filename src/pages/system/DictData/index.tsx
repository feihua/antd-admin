import React, {useEffect, useState} from 'react';
import {Button, Divider, message, Modal, Space, Table, Tag} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import {DictDataVo} from './data';
import AddModal from "./components/AddModal";
import UpdateModal from "./components/UpdateModal";
import AdvancedSearchForm from "./components/SearchForm";
import DetailModal from "./components/DetailModal";
import {addDictData, handleResp, queryDictDataList, removeDictData, updateDictData} from "./service";

interface DictDataProps {
    dict_type: string;
    open: boolean;
}

const DictData: React.FC<DictDataProps> = ({dict_type, open}) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isShowAddModal, setShowAddModal] = useState<boolean>(false);
    const [isShowEditModal, setShowEditModal] = useState<boolean>(false);
    const [isShowDetailModal, setShowDetailModal] = useState<boolean>(false);
    const [dictDataListData, setDictDataListData] = useState<DictDataVo[]>([]);
    const [currentDictData, setCurrentDictData] = useState<DictDataVo>({
        dict_code: 0,
        dict_sort: 0,
        dict_label: '',
        dict_value: '',
        dict_type: '',
        css_class: '',
        list_class: '',
        is_default: '',
        status: 0,
        remark: '',
        create_time: '',
        update_time: '',
    });
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [total, setTotal] = useState<number>(10);

    const columns: ColumnsType<DictDataVo> = [
        {
            title: '字典编码',
            dataIndex: 'dict_code',
        },

        {
            title: '字典标签',
            dataIndex: 'dict_label',
        },
        {
            title: '字典键值',
            dataIndex: 'dict_value',
        },
        {
            title: '字典排序',
            dataIndex: 'dict_sort',
        },
        {
            title: '字典类型',
            dataIndex: 'dict_type',
        },
        {
            title: '是否默认',
            dataIndex: 'is_default',
            render: (_, {is_default}) => (
                <>
                    {

                        <Tag color={is_default === 'Y' ? 'green' : 'volcano'}
                             style={{width: 50, height: 30, textAlign: "center", paddingTop: 4}}>
                            {is_default === 'Y' ? '是' : '否'}
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

    const handleAddOk = async (param: DictDataVo) => {
        param.dict_type = dict_type
        if (handleResp(await addDictData(param))) {
            setShowAddModal(false);
            const res = await queryDictDataList({current: currentPage, pageSize, dict_type})
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
        param.dict_type = dict_type
        if (handleResp(await updateDictData(param))) {
            setShowEditModal(false);
            const res = await queryDictDataList({
                current: currentPage, pageSize, dict_type
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
            content: `确定删除${param.dict_label}吗?`,
            async onOk() {
                await handleRemove([param.dict_code]);
            },
            onCancel() {
                console.log('Cancel');
            }
        })
    };

    //批量删除
    const handleRemove = async (ids: number[]) => {
        if (handleResp(await removeDictData(ids))) {
            const res = await queryDictDataList({current: currentPage, pageSize, dict_type})
            setTotal(res.total)
            res.code === 0 ? setDictDataListData(res.data) : message.error(res.msg);
        }

    };

    const handleSearchOk = async (param: DictDataVo) => {
        const res = await queryDictDataList({current: currentPage, ...param, pageSize, dict_type})
        setTotal(res.total)
        res.code === 0 ? setDictDataListData(res.data) : message.error(res.msg);
    };

    const handleResetOk = async () => {
        const res = await queryDictDataList({current: currentPage, pageSize, dict_type})
        setTotal(res.total)
        res.code === 0 ? setDictDataListData(res.data) : message.error(res.msg);
    };

    useEffect(() => {
        if (open) {
            queryDictDataList({
                current: currentPage, pageSize, dict_type
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
            console.log('onChange', page, pageSize)
            setCurrentPage(page)
            setPageSize(pageSize)
            const res = await queryDictDataList({current: page, pageSize, dict_type})
            setTotal(res.total)
            res.code === 0 ? setDictDataListData(res.data) : message.error(res.msg);

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
                dataSource={dictDataListData}
                rowKey={'id'}
                pagination={paginationProps}
                // tableLayout={"fixed"}
            />

            <AddModal onCancel={handleAddCancel} onCreate={handleAddOk} open={isShowAddModal}
                      dict_type={dict_type}></AddModal>
            <UpdateModal onCancel={handleEditCancel} onCreate={handleEditOk} open={isShowEditModal}
                         id={currentDictData.dict_code}></UpdateModal>
            <DetailModal onCancel={handleDetailCancel} open={isShowDetailModal}
                         id={currentDictData.dict_code}></DetailModal>

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
