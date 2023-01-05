// @flow
import {useRoutes} from "react-router-dom";

import routes from "../../router";

import React, {useState} from 'react';
import {DesktopOutlined, PieChartOutlined, UserOutlined,} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Breadcrumb, Layout, Menu, theme} from 'antd';
import {Link} from 'react-router-dom'
import logo from '../../assets/images/logo.svg'
import MyHeader from '../../components/header'

const {Header, Content, Footer, Sider} = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[],): MenuItem {

    return {key, icon, children, label,} as MenuItem;
}

const items: MenuItem[] = [
    getItem(<Link to={'/home'}><span>首页</span></Link>, '1', <PieChartOutlined/>),
    getItem(<Link to={'/user'}><span>系统管理</span></Link>, '2', <UserOutlined/>, [
        getItem(<Link to={'/user'}><span>用户管理</span></Link>, '3'),
        getItem(<Link to={'/role'}><span>角色管理</span></Link>, '4'),
        getItem(<Link to={'/menu'}><span>菜单管理</span></Link>, '5'),
    ]),
    getItem(<Link to={'/log'}><span>日志管理</span></Link>, '6', <DesktopOutlined/>, [
        getItem(<Link to={'/log'}><span>登录日志</span></Link>, '7')]),
    getItem(<Link to={'/pie'}><span>常用图表</span></Link>, '8', <UserOutlined/>, [
        getItem(<Link to={'/pie'}><span>饼图</span></Link>, '9'),
        getItem(<Link to={'/line'}><span>线图</span></Link>, '10'),
        getItem(<Link to={'/bar'}><span>柱状图</span></Link>, '11'),
    ]),
    getItem(<Link to={'/center'}><span>个人信息</span></Link>, '12', <UserOutlined/>, [
        getItem(<Link to={'/center'}><span>个人中心</span></Link>, '13'),
        getItem(<Link to={'/setting'}><span>个人设置</span></Link>, '14'),
    ]),
];

const Admin: React.FC = () => {
    const routesElement = useRoutes(routes)

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <Link to='/home' style={{display: "flex", alignItems: "center"}}>
                    <img style={{height: 32, width: 32, margin: 16}} src={logo} alt="logo"/><h1
                    style={{marginBottom: 0, color: "white", fontSize: 20}}>hello pro</h1>
                </Link>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}/>
            </Sider>
            <Layout className="site-layout">
                <Header style={{padding: 0, background: colorBgContainer}}><MyHeader></MyHeader></Header>
                <Content style={{margin: '0 16px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{padding: 24, minHeight: 360, background: colorBgContainer}}>
                        {routesElement}
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
            </Layout>
        </Layout>
    );
};

export default Admin;