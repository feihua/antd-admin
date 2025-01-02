import React, {useEffect, useState} from 'react';
import {Button, Divider, message, Modal, Space, Table, Tag} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {OperateLogVo} from './data';
import AdvancedSearchForm from "./components/SearchForm";
import DetailModal from "./components/DetailModal";
import {handleResp, queryOperateLogList, removeOperateLog} from "./service";


const OperateLog: React.FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isShowDetailModal, setShowDetailModal] = useState<boolean>(false);
    const [operateLogListData, setOperateLogListData] = useState<OperateLogVo[]>([]);
    const [currentOperateLog, setCurrentOperateLog] = useState<OperateLogVo>({
        id: 0,
        title: '',
        business_type: 0,
        method: '',
        request_method: '',
        operator_type: 0,
        operate_name: '',
        dept_name: '',
        operate_url: '',
        operate_ip: '',
        operate_location: '',
        operate_param: '',
        json_result: '',
        status: 0,
        error_msg: '',
        operate_time: '',
        cost_time: 0,
    });
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [total, setTotal] = useState<number>(10);

    const columns: ColumnsType<OperateLogVo> = [
        {
            title: '日志编号',
            dataIndex: 'id',
        },
        {
            title: '系统模块',
            dataIndex: 'title',
        },
        {
            title: '操作类型',
            dataIndex: 'business_type',
        },
        {
            title: '操作人员',
            dataIndex: 'operate_name',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: '部门名称',
            dataIndex: 'dept_name',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: '操作地点',
            dataIndex: 'operate_location',
        },

        {
            title: '操作状态',
            dataIndex: 'status',
            render: (_, {status}) => (
                <>
                    {

                        <Tag color={status === 1 ? 'green' : 'red'}
                             style={{width: 50, height: 30, textAlign: "center", paddingTop: 4}}>
                            {status === 1 ? '正常' : '异常'}
                        </Tag>
                    }
                </>
            ),
        },

        {
            title: '操作时间',
            dataIndex: 'operate_time',
        },
        {
            title: '消耗时间',
            dataIndex: 'cost_time',
        },

        {
            title: '操作',
            key: 'action',
            width: 280,
            render: (_, record) => (
                <div>
                    <Button type="link" size={'small'} icon={<EditOutlined/>}
                            onClick={() => showDetailModal(record)}>详情</Button>
                    <Button type="link" size={'small'} danger icon={<DeleteOutlined/>}
                            onClick={() => showDeleteConfirm(record)}>删除</Button>
                </div>
            ),
        },
    ];


    const showDetailModal = (param: OperateLogVo) => {
        setCurrentOperateLog(param)
        setShowDetailModal(true);
    };


    const handleDetailCancel = () => {
        setShowDetailModal(false);
    };

    //删除单条数据
    const showDeleteConfirm = (param: OperateLogVo) => {
        Modal.confirm({
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
        if (handleResp(await removeOperateLog(ids))) {
            const res = await queryOperateLogList({current: currentPage, pageSize})
            setTotal(res.total)
            res.code === 0 ? setOperateLogListData(res.data) : message.error(res.msg);
        }

    };

    const handleSearchOk = async (param: OperateLogVo) => {
        const res = await queryOperateLogList({current: currentPage, ...param, pageSize})
        setTotal(res.total)
        res.code === 0 ? setOperateLogListData(res.data) : message.error(res.msg);
    };

    const handleResetOk = async () => {
        const res = await queryOperateLogList({current: currentPage, pageSize})
        setTotal(res.total)
        res.code === 0 ? setOperateLogListData(res.data) : message.error(res.msg);
    };

    useEffect(() => {
        queryOperateLogList({
            current: currentPage, pageSize
        }).then(res => {
            setTotal(res.total)
            res.code === 0 ? setOperateLogListData(res.data) : message.error(res.msg);
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
            const res = await queryOperateLogList({current: page, pageSize})
            setTotal(res.total)
            res.code === 0 ? setOperateLogListData(res.data) : message.error(res.msg);

        }, //改变页码的函数
        onShowSizeChange: (current: number, size: number) => {
            console.log('onShowSizeChange', current, size)
        }
    }

    return (
        <div style={{padding: 24}}>
            <div>
                <Space size={100}>
                    {/*<Button type="primary" icon={<PlusOutlined/>} onClick={showModal}>新建</Button>*/}
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
                dataSource={operateLogListData}
                rowKey={'id'}
                pagination={paginationProps}
                // tableLayout={"fixed"}
            />
            <DetailModal onCancel={handleDetailCancel} open={isShowDetailModal} id={currentOperateLog.id}></DetailModal>

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

export default OperateLog;
