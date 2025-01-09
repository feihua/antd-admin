import {Navigate} from "react-router-dom"
import Home from "../components/layout/home";
import SystemIndex from "../pages/system/systemIndex.tsx";
import SysUser from "../pages/system/User";
import SysRole from "../pages/system/Role";
import SysMenu from "../pages/system/Menu";
import Bar from "../pages/system/charts/bar.tsx";
import Line from "../pages/system/charts/line.tsx";
import Pie from "../pages/system/charts/pie.tsx";
import Center from "../pages/system/account/center";
import Setting from "../pages/system/account/settings";
import Notice from "../pages/system/Notice";
import Post from "../pages/system/Post";
import DictType from "../pages/system/DictType";
import DictData from "../pages/system/DictData";
import Dept from "../pages/system/Dept";
import OperateLog from "../pages/system/OperateLog";
import LoginLog from "../pages/system/LoginLog";

const routes = [
    {
        path: "/home",
        title: "首页",
        element: <Home/>
    },
    {
        path: '/system',
        title: "权限管理",
        element: <SystemIndex/>,
        children: [
            {
                path: 'user',
                title: "用户管理",
                element: <SysUser/>,
            },
            {
                path: 'role',
                title: "角色管理",
                element: <SysRole/>,
            },
            {
                path: '/system/menu',
                title: "菜单管理",
                element: <SysMenu/>,
            },
            {
                path: '/system/dept',
                title: "部门管理",
                element: <Dept/>,
            },
            {
                path: '/system/post',
                title: "岗位管理",
                element: <Post/>,
            },
            {
                path: '/system/dictType',
                title: "字典类型",
                element: <DictType/>,
            },
            {
                path: '/system/dictData',
                title: "字典数据",
                element: <DictData dictType={""} open={true}/>,
            },
            {
                path: '/system/notice',
                title: "通知公告",
                element: <Notice/>,
            },
            // {
            //     path: '/system/loginLog',
            //     title: "角色管理",
            //     element: <LoginLog/>,
            // },
            // {
            //     path: '/system/operateLog',
            //     title: "角色管理",
            //     element: <OperateLog/>,
            // },
            // {
            //     path: '/system/bar',
            //     element: <Bar/>,
            // },
            // {
            //     path: '/system/line',
            //     element: <Line/>,
            // },
            // {
            //     path: '/system/pie',
            //     element: <Pie/>,
            // },
            // {
            //     path: '/system/center',
            //     element: <Center/>,
            // },
            // {
            //     path: '/system/setting',
            //     element: <Setting/>,
            // },
        ],
    },
    {
        path: '/log',
        title: "日志管理",
        element: <SystemIndex/>,
        children: [
            {
                path: '/log/loginLog',
                title: "登录日志",
                element: <LoginLog/>,
            },
            {
                path: '/log/operateLog',
                title: "操作日志",
                element: <OperateLog/>,
            },

        ],
    },
    {
        path: "/",
        title: "首页",
        element: <Navigate to="/home"/>
    }
]

export default routes