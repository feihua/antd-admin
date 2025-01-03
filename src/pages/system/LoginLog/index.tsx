import React, {useEffect, useState} from 'react';
import {Button, Divider, message, Modal, Space, Table, Tag} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {LoginLogVo} from './data';
import AdvancedSearchForm from "./components/SearchForm";
import DetailModal from "./components/DetailModal";
import {handleResp, queryLoginLogList, removeLoginLog} from "./service";


const LoginLog: React.FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isShowDetailModal, setShowDetailModal] = useState<boolean>(false);
    const [loginLogListData, setLoginLogListData] = useState<LoginLogVo[]>([]);
    const [currentLoginLog, setCurrentLoginLog] = useState<LoginLogVo>({
        id: 0,
        login_name: '',
        ipaddr: '',
        login_location: '',
        platform: '',
        browser: '',
        version: '',
        os: '',
        arch: '',
        engine: '',
        engine_details: '',
        extra: '',
        status: 0,
        msg: '',
        login_time: '',
    });
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [total, setTotal] = useState<number>(10);

    const columns: ColumnsType<LoginLogVo> = [
        {
            title: '访问编号',
            dataIndex: 'id',
        },
        {
            title: '用户名称',
            dataIndex: 'login_name',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: '登录地址',
            dataIndex: 'ipaddr',
        },
        {
            title: '登录地点',
            dataIndex: 'login_location',
        },
        {
            title: '操作系统',
            dataIndex: 'platform',
        },
        {
            title: '浏览器类型',
            dataIndex: 'browser',
        },
        {
            title: '登录状态',
            dataIndex: 'status',
            render: (_, {status}) => (
                <>
                    {

                        <Tag color={status === 1 ? 'green' : 'red'}
                             style={{width: 50, height: 30, textAlign: "center", paddingTop: 4}}>
                            {status === 1 ? '成功' : '失败'}
                        </Tag>
                    }
                </>
            ),
        },
        {
            title: '操作消息',
            dataIndex: 'msg',
        },
        {
            title: '登录时间',
            dataIndex: 'login_time',
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


    const showDetailModal = (param: LoginLogVo) => {
        setCurrentLoginLog(param)
        setShowDetailModal(true);
    };


    const handleDetailCancel = () => {
        setShowDetailModal(false);
    };

    //删除单条数据
    const showDeleteConfirm = (param: LoginLogVo) => {
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
        if (handleResp(await removeLoginLog(ids))) {
            const res = await queryLoginLogList({current: currentPage, pageSize})
            setTotal(res.total)
            res.code === 0 ? setLoginLogListData(res.data) : message.error(res.msg);
        }

    };

    const handleSearchOk = async (param: LoginLogVo) => {
        const res = await queryLoginLogList({current: currentPage, ...param, pageSize})
        setTotal(res.total)
        res.code === 0 ? setLoginLogListData(res.data) : message.error(res.msg);
    };

    const handleResetOk = async () => {
        const res = await queryLoginLogList({current: currentPage, pageSize})
        setTotal(res.total)
        res.code === 0 ? setLoginLogListData(res.data) : message.error(res.msg);
    };

    useEffect(() => {
        queryLoginLogList({
            current: currentPage, pageSize
        }).then(res => {
            setTotal(res.total)
            res.code === 0 ? setLoginLogListData(res.data) : message.error(res.msg);
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
            const res = await queryLoginLogList({current: page, pageSize})
            setTotal(res.total)
            res.code === 0 ? setLoginLogListData(res.data) : message.error(res.msg);

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
                dataSource={loginLogListData}
                rowKey={'id'}
                pagination={paginationProps}
                // tableLayout={"fixed"}
            />

            <DetailModal onCancel={handleDetailCancel} open={isShowDetailModal} id={currentLoginLog.id}></DetailModal>

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

export default LoginLog;
