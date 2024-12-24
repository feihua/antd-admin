import {Navigate} from "react-router-dom"
import Home from "../components/layout/home";
import SystemIndex from "../pages/system/systemIndex.tsx";
import User from "../pages/system/User";
import Role from "../pages/system/role";
import Menu from "../pages/system/menu";
import Log from "../pages/system/log";
import Bar from "../pages/system/charts/bar.tsx";
import Line from "../pages/system/charts/line.tsx";
import Pie from "../pages/system/charts/pie.tsx";
import Center from "../pages/system/account/center";
import Setting from "../pages/system/account/settings";

const routes = [
    {
        path: "/home",
        element: <Home/>
    },
    {
        path: '/system',
        element: <SystemIndex />,
        children: [
            {
                path: '/system/user',
                element: <User />,
            },
            {
                path: '/system/role',
                element: <Role />,
            },
            {
                path: '/system/menu',
                element: <Menu />,
            },
            {
                path: '/system/operateLog',
                element: <Log />,
            },
            {
                path: '/system/bar',
                element: <Bar />,
            },
            {
                path: '/system/line',
                element: <Line />,
            },
            {
                path: '/system/pie',
                element: <Pie />,
            },
            {
                path: '/system/center',
                element: <Center />,
            },
            {
                path: '/system/setting',
                element: <Setting />,
            },
        ],
    },
    {
        path: "/",
        element: <Navigate to="/home"/>
    }
]

export default routes