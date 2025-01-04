import React, {useEffect, useState} from 'react';
import {Button, Divider, message, Modal, Space, Table, Tag} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import {MenuVo} from './data';
import AddMenuModal from "./components/AddModal.tsx";
import UpdateMenuModal from "./components/UpdateModal.tsx";
import {addMenu, handleResp, queryMenuList, removeMenu, updateMenu} from "./service";
import {tree} from "../../../utils/treeUtils";
import {IResponse} from "../../../api/ajax";
import DetailModal from "./components/DetailModal.tsx";

const SysMenu: React.FC = () => {
    const [isShowAddModal, setShowAddModal] = useState<boolean>(false);
    const [isShowEditModal, setShowEditModal] = useState<boolean>(false);
    const [isShowDetailModal, setShowDetailModal] = useState<boolean>(false);
    const [menuListData, setMenuListData] = useState<MenuVo[]>([]);
    const [currentMenu, setCurrentMenu] = useState<MenuVo>();

    const columns: ColumnsType<MenuVo> = [
        {
            title: '菜单名称',
            dataIndex: 'menu_name',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: '菜单图标',
            dataIndex: 'menu_icon',
        },
        {
            title: '排序',
            dataIndex: 'sort',
        },
        {
            title: '路径',
            dataIndex: 'menu_url',
        },
        {
            title: '接口地址',
            dataIndex: 'api_url',
        },
        // {
        //     title: '类型',
        //     dataIndex: 'menu_type',
        //     render: (_, {menu_type}) => (
        //         <>
        //             {
        //                 menu_type === 1 && (
        //                     <Tag color={'#ef62df'} style={{width: 50, height: 30, textAlign: "center", paddingTop: 4}}>
        //                         目录
        //                     </Tag>)
        //             }
        //             {
        //                 menu_type === 2 && (
        //                     <Tag color={'#3f80e9'} style={{width: 50, height: 30, textAlign: "center", paddingTop: 4}}>
        //                         菜单
        //                     </Tag>)
        //             }
        //             {
        //                 menu_type === 3 && (
        //                     <Tag color={'#67c23a'} style={{width: 50, height: 30, textAlign: "center", paddingTop: 4}}>
        //                         功能
        //                     </Tag>)
        //             }
        //         </>
        //     ),
        // },
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
            render: (_, record) => (
                <Space size="small">
                    <Button type="link" size={'small'} icon={<EditOutlined/>}
                            onClick={() => showEditModal(record)}>编辑</Button>
                    <Button type="link" size={'small'} icon={<EditOutlined/>}
                            onClick={() => showDetailModal(record)}>详情</Button>
                    <Button type="link" size={'small'} danger icon={<DeleteOutlined/>}
                            onClick={() => showDeleteConfirm(record)}>删除</Button>
                </Space>
            ),
        },
    ];

    const showModal = () => {
        setShowAddModal(true);
    };

    const handleAddOk = async (menu: MenuVo) => {
        if (handleResp(await addMenu(menu))) {
            setShowAddModal(false);
            let res = await queryMenuList({})
            console.log(res)
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
            let res = await queryMenuList({})
            res.code === 0 ? setMenuDataTree(res) : message.error(res.msg);
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
    const showDeleteConfirm = (menu: MenuVo) => {
        Modal.confirm({
            okText: '确定',
            cancelText: '取消',
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
            let res = await queryMenuList({})
            res.code === 0 ? setMenuDataTree(res) : message.error(res.msg);
        }

    };

    const setMenuDataTree = (res: IResponse) => {
        setMenuListData(tree(res.data, 0, "parent_id"))
    }

    useEffect(() => {
        queryMenuList({}).then(res => {
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
                size={"small"}
                columns={columns}
                dataSource={menuListData}
                rowKey={'id'}
                pagination={false}
            />

            <AddMenuModal onCancel={handleAddCancel} onCreate={handleAddOk} open={isShowAddModal}
                          menuListData={menuListData}></AddMenuModal>
            <UpdateMenuModal onCancel={handleEditCancel} onCreate={handleEditOk} open={isShowEditModal}
                             id={currentMenu?.id || 0} menuListData={menuListData}></UpdateMenuModal>
            <DetailModal onCancel={handleDetailCancel} open={isShowDetailModal} id={currentMenu?.id || 0}></DetailModal>


        </div>
    );
};

export default SysMenu;