import React, {useEffect, useState} from 'react';
import {Button, Divider, message, Modal, Space, Table, Tag} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import {MenuListParam, MenuVo} from './data';
import AddModal from "./components/AddModal";
import UpdateModal from "./components/UpdateModal";
import AdvancedSearchForm from "./components/SearchForm";
import DetailModal from "./components/DetailModal";
import {addMenu, handleResp, queryMenuList, removeMenu, updateMenu} from "./service";

interface CreateFormProps {
    open: boolean;
}

const Menu: React.FC<CreateFormProps> = ({open}) => {

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isShowAddModal, setShowAddModal] = useState<boolean>(false);
    const [isShowEditModal, setShowEditModal] = useState<boolean>(false);
    const [isShowDetailModal, setShowDetailModal] = useState<boolean>(false);
    const [menuListData, setMenuListData] = useState<MenuVo[]>([]);
    const [currentMenu, setCurrentMenu] = useState<MenuVo>({
        id: 0,//主键
        menuName: '',//菜单名称
        menuType: 0,//菜单类型(1：目录   2：菜单   3：按钮)
        visible: 0,//显示状态（0:隐藏, 显示:1）
        status: 0,//菜单状态(1:正常，0:禁用)
        sort: 0,//排序
        parentId: 0,//父ID
        menuUrl: '',//路由路径
        apiUrl: '',//接口URL
        menuIcon: '',//菜单图标
        remark: '',//备注
        createTime: '',//创建时间
        updateTime: '',//修改时间
    });
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [total, setTotal] = useState<number>(10);

    const columns: ColumnsType<MenuVo> = [
        {
            title: '主键',
            dataIndex: 'id',
        },
        {
            title: '菜单名称',
            dataIndex: 'menuName',
        },
        {
            title: '显示状态',
            dataIndex: 'visible',
            render: (_, entity) => {
                return (
                    entity.visible == 1 ?
                        <Tag bordered={false} color="success">
                            显示
                        </Tag> :
                        <Tag bordered={false} color="error">
                            隐藏
                        </Tag>
                );
            },
        },
        {
            title: '菜单状态',
            dataIndex: 'status',
            render: (_, entity) => {
                return (
                    entity.status == 1 ?
                        <Tag bordered={false} color="success">
                            正常
                        </Tag> :
                        <Tag bordered={false} color="error">
                            禁用
                        </Tag>
                );
            },
        },
        {
            title: '排序',
            dataIndex: 'sort',
        },

        {
            title: '接口URL',
            dataIndex: 'apiUrl',
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
                    <Button type="link" size={'small'} icon={<EditOutlined/>} onClick={() => showEditModal(record)}>编辑</Button>
                    <Button type="link" size={'small'} icon={<EditOutlined/>} onClick={() => showDetailModal(record)}>详情</Button>
                    <Button type="link" size={'small'} danger icon={<DeleteOutlined/>}
                            onClick={() => showDeleteConfirm(record)}>删除</Button>
                </div>
            ),
        },
    ];


    const showModal = () => {
        setShowAddModal(true);
    };

    const handleAddOk = async (param: MenuVo) => {
        if (handleResp(await addMenu(param))) {
            setShowAddModal(false);
            const res = await queryMenuList({pageNo: currentPage, pageSize, parentId: param.parentId})
            setTotal(res.total)
            res.code === 0 ? setMenuListData(res.data) : message.error(res.msg);
        }
    }

    const handleAddCancel = () => {
        setShowAddModal(false);
    };


    const showEditModal = (param: MenuVo) => {
        setCurrentMenu(param)
        setShowEditModal(true);
    };

    const handleEditOk = async (param: MenuVo) => {
        if (handleResp(await updateMenu(param))) {
            setShowEditModal(false);
            const res = await queryMenuList({
                pageNo: currentPage, pageSize
            })
            setTotal(res.total)
            res.code === 0 ? setMenuListData(res.data) : message.error(res.msg);
        }
    };

    const handleEditCancel = () => {
        setShowEditModal(false);
    };

    const showDetailModal = (param: MenuVo) => {
        setCurrentMenu(param)
        setShowDetailModal(true);
    };


    const handleDetailCancel = () => {
        setShowDetailModal(false);
    };

    //删除单条数据
    const showDeleteConfirm = (param: MenuVo) => {
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
        if (handleResp(await removeMenu(ids))) {
            const res = await queryMenuList({pageNo: currentPage, pageSize})
            setTotal(res.total)
            res.code === 0 ? setMenuListData(res.data) : message.error(res.msg);
        }

    };

    const handleSearchOk = async (param: MenuListParam) => {
        const res = await queryMenuList(param)
        setTotal(res.total)
        res.code === 0 ? setMenuListData(res.data) : message.error(res.msg);
    };

    const handleResetOk = async () => {
        const res = await queryMenuList({pageNo: currentPage, pageSize})
        setTotal(res.total)
        res.code === 0 ? setMenuListData(res.data) : message.error(res.msg);
    };

    useEffect(() => {
        queryMenuList({
            pageNo: currentPage, pageSize
        }).then(res => {
            setTotal(res.total)
            res.code === 0 ? setMenuListData(res.data) : message.error(res.msg);
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
            const res = await queryMenuList({pageNo: page, pageSize})
            setTotal(res.total)
            res.code === 0 ? setMenuListData(res.data) : message.error(res.msg);

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
                    <AdvancedSearchForm open={open} search={handleSearchOk} reSet={handleResetOk}></AdvancedSearchForm>
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
                dataSource={menuListData}
                rowKey={'id'}
                pagination={paginationProps}
                // tableLayout={"fixed"}
            />

            <AddModal onCancel={handleAddCancel} onCreate={handleAddOk} open={isShowAddModal}></AddModal>
            <UpdateModal onCancel={handleEditCancel} onCreate={handleEditOk} open={isShowEditModal} id={currentMenu.id}></UpdateModal>
            <DetailModal onCancel={handleDetailCancel} open={isShowDetailModal} id={currentMenu.id}></DetailModal>

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

export default Menu;
