import React, {useEffect, useState} from 'react';
import {Button, Divider, message, Modal, Space, Table, Tag} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import {MenuVo} from './data.d';
import CreateMenuForm from "./components/add_menu";
import UpdateMenuForm from "./components/update_menu";
import {addMenu, handleResp, removeMenu, updateMenu, menuList} from "./service";
import AdvancedSearchForm from "./components/search_menu";
import {tree} from "../../utils/treeUtils";
import {IResponse} from "../../api/ajax";

const Menu: React.FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isShowAddModal, setShowAddModal] = useState<boolean>(false);
    const [isShowEditModal, setShowEditModal] = useState<boolean>(false);
    const [menuListData, setMenuListData] = useState<MenuVo[]>([]);
    const [currentMenu, setCurrentMenu] = useState<MenuVo>();

    const columns: ColumnsType<MenuVo> = [
        {
            title: '菜单名称',
            dataIndex: 'menu_name',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: '路径',
            dataIndex: 'menu_url',
        },
        {
            title: '接口地址',
            dataIndex: 'api_url',
        },
        {
            title: '类型',
            dataIndex: 'menu_type',
        },
        {
            title: '排序',
            dataIndex: 'sort',
        },
        {
            title: '图标',
            dataIndex: 'icon',
        },
        {
            title: '状态',
            dataIndex: 'status_id',
            render: (_, {status_id}) => (
                <>
                    {
                        <Tag color={status_id === 0 ? '#ff4d4f' : '#67c23a'} style={{width: 50, height: 30, textAlign: "center", paddingTop: 4}}>
                            {status_id === 0 ? '禁用' : '启用'}
                        </Tag>
                    }
                </>
            ),
        },
        {
            title: '备注',
            dataIndex: 'remark',
        },
        // {
        //     title: '创建时间',
        //     dataIndex: 'create_time',
        // },
        // {
        //     title: '更新时间',
        //     dataIndex: 'update_time',
        // },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="small">
                    <Button type="primary" icon={<EditOutlined/>} onClick={() => showEditModal(record)}>编辑</Button>
                    <Button type="primary" danger icon={<DeleteOutlined/>}
                            onClick={() => showDeleteConfirm(record)}>删除</Button>
                </Space>
            ),
        },
    ];

    const showModal = () => {
        setShowAddModal(true);
    };

    const handleAddOk = async (menu: MenuVo) => {
        console.log(menu)
        if (handleResp(await addMenu(menu))) {
            setShowAddModal(false);
            let res = await menuList({})
            res.code === 0 ? setMenuDataTree(res) : message.error(res.msg);
        }
    }

    const handleAddCancel = () => {
        setShowAddModal(false);
    };


    const showEditModal = (menu: MenuVo) => {
        setCurrentMenu(menu)
        setShowEditModal(true);
    };

    const handleEditOk = async (menu: MenuVo) => {
        if (handleResp(await updateMenu(menu))) {
            setShowEditModal(false);
            let res = await menuList({})
            res.code === 0 ? setMenuDataTree(res) : message.error(res.msg);
        }
    };

    const handleEditCancel = () => {
        setShowEditModal(false);
    };

    //删除单条数据
    const showDeleteConfirm = (menu: MenuVo) => {
        Modal.confirm({
            content: `确定删除${menu.menu_name}吗?`,
            async onOk() {
                await handleRemove([menu.id]);
            },
            onCancel() {
                console.log('Cancel');
            }
        })
    };

    //批量删除
    const handleRemove = async (ids: number[]) => {
        if (handleResp(await removeMenu(ids))) {
            let res = await menuList({})
            res.code === 0 ? setMenuDataTree(res) : message.error(res.msg);
        }

    };

    const handleSearchOk = async (menu: MenuVo) => {
        let res = await menuList({...menu,})
        res.code === 0 ? setMenuDataTree(res) : message.error(res.msg);
    };

    const handleResetOk = async () => {
        let res = await menuList({})
        res.code === 0 ? setMenuDataTree(res) : message.error(res.msg);
    };

    const setMenuDataTree = (res: IResponse) => {
        setMenuListData(tree(res.data, 0, "parent_id"))
    }

    useEffect(() => {
        menuList({}).then(res => {
            res.code === 0 ? setMenuDataTree(res) : message.error(res.msg);
        });
    }, []);


    return (
        <div style={{padding: 24}}>
            <div>
                <Space>
                    <Button type="primary" icon={<PlusOutlined/>} onClick={showModal}>新建</Button>
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
                tableLayout={"fixed"}
                pagination={false}
            />

            <CreateMenuForm onCancel={handleAddCancel} onCreate={handleAddOk} open={isShowAddModal} menuListData={menuListData}></CreateMenuForm>
            <UpdateMenuForm onCancel={handleEditCancel} onCreate={handleEditOk} open={isShowEditModal} menuVo={currentMenu}></UpdateMenuForm>

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