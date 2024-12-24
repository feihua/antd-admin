// @flow
import {Link, useNavigate, useRoutes} from "react-router-dom";

import routes from "../../../router";

import React, {useEffect, useState} from 'react';
import {PieChartOutlined,} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Breadcrumb, Layout, Menu, theme} from 'antd';
import logo from '../../../assets/images/logo.svg'
import MyHeader from '../../header'
import {query_user_menu} from "./service.ts";
import {MyMenuItem, RecordVo} from "./data";
import {tree} from "../../../utils/treeUtils.ts";
import "./index.less"
import useStore from "../../../store";


const {Header, Content, Footer, Sider} = Layout;

type MenuItem = Required<MenuProps>['items'][number];

// function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
//
//     return {key, icon, children, label} as MenuItem;
// }

function getMyItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, parent_id?: number, id?: number): MyMenuItem {

    return {label, key, icon, parent_id, id} as MyMenuItem;
}

// const items: MenuItem[] = [
//     getItem(<Link to={'/home'}><span>首页</span></Link>, '1', <PieChartOutlined/>),
//     getItem(<Link to={'/User'}><span>系统管理</span></Link>, '2', <UserOutlined/>, [
//         getItem(<Link to={'/User'}><span>用户管理</span></Link>, '3'),
//         getItem(<Link to={'/role'}><span>角色管理</span></Link>, '4'),
//         getItem(<Link to={'/menu'}><span>菜单管理</span></Link>, '5'),
//     ]),
//     getItem(<Link to={'/log'}><span>日志管理</span></Link>, '6', <DesktopOutlined/>, [
//         getItem(<Link to={'/log'}><span>登录日志</span></Link>, '7')]),
//     getItem(<Link to={'/pie'}><span>常用图表</span></Link>, '8', <UserOutlined/>, [
//         getItem(<Link to={'/pie'}><span>饼图</span></Link>, '9'),
//         getItem(<Link to={'/line'}><span>线图</span></Link>, '10'),
//         getItem(<Link to={'/bar'}><span>柱状图</span></Link>, '11'),
//     ]),
//     getItem(<Link to={'/center'}><span>个人中心</span></Link>, '12', <UserOutlined/>, [
//         getItem(<Link to={'/center'}><span>个人中心</span></Link>, '13'),
//         getItem(<Link to={'/setting'}><span>个人设置</span></Link>, '14'),
//     ]),
// ];

// const items: MenuItem[] = [
//     getItem(<span>首页</span>, '1', <PieChartOutlined/>),
//     getItem(<span>系统管理</span>, '2', <UserOutlined/>, [
//         getItem(<span>用户管理</span>, '/User'),
//         getItem(<span>角色管理</span>, '/role'),
//         getItem(<span>菜单管理</span>, '/menu'),
//     ]),
//     getItem(<span>日志管理</span>, '6', <DesktopOutlined/>, [
//         getItem(<span>登录日志</span>, '7')]),
//     getItem(<span>常用图表</span>, '8', <UserOutlined/>, [
//         getItem(<span>饼图</span>, '9'),
//         getItem(<span>线图</span>, '10'),
//         getItem(<span>柱状图</span>, '11'),
//     ]),
//     getItem(<span>个人中心</span>, '12', <UserOutlined/>, [
//         getItem(<span>个人中心</span>, '13'),
//         getItem(<span>个人设置</span>, '14'),
//     ]),
// ];

const Admin: React.FC = () => {
    const {setUserName, setAvatar} = useStore()as any;
    const routesElement = useRoutes(routes)

    let navigate = useNavigate();

    const [menuItem, setMenuItem] = useState<MenuItem[]>([]);

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    useEffect(() => {
        query_user_menu().then(res => {
            setUserName(res.data.name)
            setAvatar(res.data.avatar)
            setMenuItem(tree(menuListTree(res.data.sys_menu), 0, "parent_id"))
        })
    }, []);


    const menuListTree = (menuList: RecordVo[]) => {
        return menuList.map(item => {
            return getMyItem(<span>{item.name}</span>, item.path, <PieChartOutlined/>, item.parent_id, item.id)
        })
    }

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} theme={"light"}>
                <Link to='/home' style={{display: "flex", alignItems: "center"}}>
                    <img style={{height: 32, width: 32, margin: 16}} src={logo} alt="logo"/><h1
                    style={{marginBottom: 0, color: "black", fontSize: 20}}>rust</h1>
                </Link>
                <div style={{background: 'rgb(228 229 234)', height: '1px'}}></div>
                <Menu theme="light" defaultSelectedKeys={['/home']} mode="inline" items={menuItem} onClick={(item) => {
                    navigate(item.key)
                }}/>
            </Sider>
            <Layout className="site-layout">
                <Header style={{padding: 0, background: colorBgContainer}}><MyHeader></MyHeader></Header>
                <Content style={{margin: '0 16px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{minHeight: 360, background: colorBgContainer}}>
                        {routesElement}
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
            </Layout>
        </Layout>
    );
};

export default Admin;