import React, {useEffect, useState} from 'react';
import {Button, Divider, message, Modal, Space, Table, Tag} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import * as Icons from '@ant-design/icons';
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import {MenuVo} from './data';
import AddMenuModal from "./components/AddModal.tsx";
import UpdateMenuModal from "./components/UpdateModal.tsx";
import {addMenu, handleResp, queryMenuList, removeMenu, updateMenu} from "./service";
import {tree} from "@/utils/treeUtils.ts";
import {IResponse} from "@/api/ajax.ts";
import DetailModal from "./components/DetailModal.tsx";

const SysMenu: React.FC = () => {
    const [isShowAddModal, setShowAddModal] = useState<boolean>(false);
    const [isShowEditModal, setShowEditModal] = useState<boolean>(false);
    const [isShowDetailModal, setShowDetailModal] = useState<boolean>(false);
    const [menuListData, setMenuListData] = useState<MenuVo[]>([]);
    const [currentMenu, setCurrentMenu] = useState<MenuVo>({
        apiUrl: "",
        createTime: "",
        id: 0,
        menuIcon: "",
        menuName: "",
        menuType: 0,
        menuUrl: "",
        parentId: 0,
        remark: "",
        sort: 0,
        status: 0,
        updateTime: "",
        visible: 0

    });

    const columns: ColumnsType<MenuVo> = [
        {
            title: '菜单名称',
            dataIndex: 'menuName',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: '菜单图标',
            dataIndex: 'menuIcon',

            render: (text: string) => {
                // @ts-ignore
                return text.length == 0 ? text : React.createElement(Icons[text])
            },
        },
        {
            title: '排序',
            dataIndex: 'sort',
        },
        {
            title: '路径',
            dataIndex: 'menuUrl',
        },
        {
            title: '接口地址',
            dataIndex: 'apiUrl',
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
            dataIndex: 'createTime',
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
            content: `确定删除${menu.menuName}吗?`,
            async onOk() {
                await handleRemove(menu.id);
            },
            onCancel() {
                console.log('Cancel');
            }
        })
    };

    //批量删除
    const handleRemove = async (id: number) => {
        if (handleResp(await removeMenu(id))) {
            let res = await queryMenuList({})
            res.code === 0 ? setMenuDataTree(res) : message.error(res.msg);
        }

    };

    const setMenuDataTree = (res: IResponse) => {
        setMenuListData(tree(res.data, 0, "parentId"))
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

            <AddMenuModal onCancel={handleAddCancel} onCreate={handleAddOk} open={isShowAddModal}></AddMenuModal>
            <UpdateMenuModal onCancel={handleEditCancel} onCreate={handleEditOk} open={isShowEditModal}
                             id={currentMenu.id}></UpdateMenuModal>
            <DetailModal onCancel={handleDetailCancel} open={isShowDetailModal} id={currentMenu.id}></DetailModal>


        </div>
    );
};

export default SysMenu;