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
        element: <Home/>
    },
    {
        path: '/system',
        element: <SystemIndex/>,
        children: [
            {
                path: '/system/user',
                element: <SysUser/>,
            },
            {
                path: '/system/role',
                element: <SysRole/>,
            },
            {
                path: '/system/menu',
                element: <SysMenu/>,
            },
            {
                path: '/system/dept',
                element: <Dept/>,
            },
            {
                path: '/system/post',
                element: <Post/>,
            },
            {
                path: '/system/dictType',
                element: <DictType/>,
            },
            {
                path: '/system/dictData',
                element: <DictData dict_type={""} open={true}/>,
            },
            {
                path: '/system/notice',
                element: <Notice/>,
            },
            {
                path: '/system/loginLog',
                element: <LoginLog/>,
            },
            {
                path: '/system/operateLog',
                element: <OperateLog/>,
            },
            {
                path: '/system/bar',
                element: <Bar/>,
            },
            {
                path: '/system/line',
                element: <Line/>,
            },
            {
                path: '/system/pie',
                element: <Pie/>,
            },
            {
                path: '/system/center',
                element: <Center/>,
            },
            {
                path: '/system/setting',
                element: <Setting/>,
            },
        ],
    },
    {
        path: "/",
        element: <Navigate to="/home"/>
    }
]

export default routes