import React, {useEffect, useState} from 'react';
import {Button, Divider, message, Modal, Space, Table, Tag} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import {NoticeVo} from './data';
import AddModal from "./components/AddModal";
import UpdateModal from "./components/UpdateModal";
import AdvancedSearchForm from "./components/SearchForm";
import DetailModal from "./components/DetailModal";
import {addNotice, handleResp, queryNoticeList, removeNotice, updateNotice} from "./service";


const Notice: React.FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isShowAddModal, setShowAddModal] = useState<boolean>(false);
    const [isShowEditModal, setShowEditModal] = useState<boolean>(false);
    const [isShowDetailModal, setShowDetailModal] = useState<boolean>(false);
    const [noticeListData, setNoticeListData] = useState<NoticeVo[]>([]);
    const [currentNotice, setCurrentNotice] = useState<NoticeVo>({
        id: 0,
        notice_title: '',
        notice_type: 0,
        notice_content: '',
        status: 0,
        remark: '',
        create_time: '',
        update_time: '',
    });
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [total, setTotal] = useState<number>(10);

    const columns: ColumnsType<NoticeVo> = [
        {
            title: '公告编号',
            dataIndex: 'id',
        },
        {
            title: '公告标题',
            dataIndex: 'notice_title',
        },
        {
            title: '公告类型',
            dataIndex: 'notice_type',
            render: (_, {notice_type}) => (
                <>
                    {

                        <Tag color={notice_type === 1 ? 'green' : 'geekblue'}
                             style={{width: 50, height: 30, textAlign: "center", paddingTop: 4}}>
                            {notice_type === 1 ? '通知' : '公告'}
                        </Tag>
                    }
                </>
            ),
        },
        {
            title: '公告状态',
            dataIndex: 'status',
            render: (_, {status}) => (
                <>
                    {

                        <Tag color={status === 1 ? 'green' : 'volcano'}
                             style={{width: 50, height: 30, textAlign: "center", paddingTop: 4}}>
                            {status === 1 ? '正常' : '关闭'}
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

    const handleAddOk = async (param: NoticeVo) => {
        if (handleResp(await addNotice(param))) {
            setShowAddModal(false);
            const res = await queryNoticeList({current: currentPage, pageSize})
            setTotal(res.total)
            res.code === 0 ? setNoticeListData(res.data) : message.error(res.msg);
        }
    }

    const handleAddCancel = () => {
        setShowAddModal(false);
    };


    const showEditModal = (param: NoticeVo) => {
        setCurrentNotice(param)
        setShowEditModal(true);
    };

    const handleEditOk = async (param: NoticeVo) => {
        if (handleResp(await updateNotice(param))) {
            setShowEditModal(false);
            const res = await queryNoticeList({
                current: currentPage, pageSize,
            })
            setTotal(res.total)
            res.code === 0 ? setNoticeListData(res.data) : message.error(res.msg);
        }
    };

    const handleEditCancel = () => {
        setShowEditModal(false);
    };

    const showDetailModal = (param: NoticeVo) => {
        setCurrentNotice(param)
        setShowDetailModal(true);
    };


    const handleDetailCancel = () => {
        setShowDetailModal(false);
    };

    //删除单条数据
    const showDeleteConfirm = (param: NoticeVo) => {
        Modal.confirm({
            okText: '确定',
            cancelText: '取消',
            content: `确定删除${param.notice_title}吗?`,
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
        if (handleResp(await removeNotice(ids))) {
            const res = await queryNoticeList({current: currentPage, pageSize})
            setTotal(res.total)
            res.code === 0 ? setNoticeListData(res.data) : message.error(res.msg);
        }

    };

    const handleSearchOk = async (param: NoticeVo) => {
        const res = await queryNoticeList({current: currentPage, ...param, pageSize})
        setTotal(res.total)
        res.code === 0 ? setNoticeListData(res.data) : message.error(res.msg);
    };

    const handleResetOk = async () => {
        const res = await queryNoticeList({current: currentPage, pageSize})
        setTotal(res.total)
        res.code === 0 ? setNoticeListData(res.data) : message.error(res.msg);
    };

    useEffect(() => {
        queryNoticeList({
            current: currentPage, pageSize
        }).then(res => {
            setTotal(res.total)
            res.code === 0 ? setNoticeListData(res.data) : message.error(res.msg);
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
            const res = await queryNoticeList({current: page, pageSize})
            setTotal(res.total)
            res.code === 0 ? setNoticeListData(res.data) : message.error(res.msg);

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
                dataSource={noticeListData}
                rowKey={'id'}
                pagination={paginationProps}
                // tableLayout={"fixed"}
            />

            <AddModal onCancel={handleAddCancel} onCreate={handleAddOk} open={isShowAddModal}></AddModal>
            <UpdateModal onCancel={handleEditCancel} onCreate={handleEditOk} open={isShowEditModal}
                         id={currentNotice.id}></UpdateModal>
            <DetailModal onCancel={handleDetailCancel} open={isShowDetailModal} id={currentNotice.id}></DetailModal>

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

export default Notice;
