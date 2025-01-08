// @flow
import {Link, useNavigate, useRoutes} from "react-router-dom";

import routes from "../../../router";

import React, {useEffect, useState} from 'react';
import {PieChartOutlined,} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Layout, Menu, theme} from 'antd';
import logo from '../../../assets/images/logo.svg'
import MyHeader from '../../header'
import {query_user_menu} from "./service.ts";
import {MyMenuItem, RecordVo} from "./data";
import {tree} from "../../../utils/treeUtils.ts";
import "./index.less"
import useStore from "../../../store";


const {Header, Content, Footer, Sider} = Layout;

type MenuItem = Required<MenuProps>['items'][number];


function getMyItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, parentId?: number, id?: number): MyMenuItem {

    return {label, key, icon, parentId, id} as MyMenuItem;
}


const Admin: React.FC = () => {
    const {setUserName, setAvatar} = useStore() as any;
    const routesElement = useRoutes(routes)

    let navigate = useNavigate();

    const [menuItem, setMenuItem] = useState<MenuItem[]>([]);
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    useEffect(() => {
        query_user_menu().then(res => {
            setUserName(res.data.name)
            setAvatar(res.data.avatar)
            setMenuItem(tree(menuListTree(res.data.sysMenu), 0, "parentId"))
            const storedOpenKeys = localStorage.getItem('openKeys');
            const storedSelectedKeys = localStorage.getItem('selectedKeys');
            if (storedOpenKeys && storedSelectedKeys) {
                console.log('storedOpenKeys.storedSelectedKeys', storedOpenKeys, storedSelectedKeys);
                setOpenKeys(JSON.parse(storedOpenKeys));
                setSelectedKeys(JSON.parse(storedSelectedKeys));
            }
        })
    }, []);


    const menuListTree = (menuList: RecordVo[]) => {
        return menuList.map(item => {
            return getMyItem(<span>{item.name}</span>, item.path, <PieChartOutlined/>, item.parentId, item.id)
        })
    }

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} theme={"light"}>
                <Link to='/home' style={{display: "flex", alignItems: "center"}} onClick={()=> {
                    localStorage.setItem('selectedKeys', JSON.stringify(['/home']));
                    setSelectedKeys(['/home'])
                }}>
                    <img style={{height: 32, width: 32, margin: 16}} src={logo} alt="logo"/><h1
                    style={{marginBottom: 0, color: "black", fontSize: 20}}>rust</h1>
                </Link>
                <div style={{background: 'rgb(228 229 234)', height: '1px'}}></div>
                <Menu theme="light"
                      openKeys={openKeys}
                      selectedKeys={selectedKeys}
                      mode="inline" items={menuItem}
                      onClick={(item) => {
                          navigate(item.key)
                      }}
                      onOpenChange={keys => {
                          localStorage.setItem('openKeys', JSON.stringify(keys));
                          setOpenKeys(keys)
                      }}
                      onSelect={({key}) => {
                          localStorage.setItem('selectedKeys', JSON.stringify([key]));
                          setSelectedKeys([key])
                      }}
                />
            </Sider>
            <Layout className="site-layout">
                <Header style={{padding: 0, background: colorBgContainer}}><MyHeader></MyHeader></Header>
                <Content style={{margin: '0 12px'}}>
                    <div style={{minHeight: 360, background: colorBgContainer, marginTop: '12px'}}>
                        {routesElement}
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
            </Layout>
        </Layout>
    );
};

export default Admin;