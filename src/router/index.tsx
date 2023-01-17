import {Navigate} from "react-router-dom"
import User from "../pages/user";
import Home from "../pages/home";
import Role from "../pages/role";
import Menu from "../pages/menu";
import Bar from "../pages/charts/bar";
import Line from "../pages/charts/line";
import Pie from "../pages/charts/pie";
import Log from "../pages/log/index";
import Center from "../pages/account/center";
import Setting from "../pages/account/settings";

const routes = [
    {
        path: "/home",
        element: <Home/>
    },
    {
        path: "/user",
        element: <User/>
    },
    {
        path: "/role",
        element: <Role/>
    },
    {
        path: "/menu",
        element: <Menu/>
    },
    {
        path: "/log",
        element: <Log/>
    },
    {
        path: "/bar",
        element: <Bar/>
    },
    {
        path: "/line",
        element: <Line/>
    },
    {
        path: "/pie",
        element: <Pie/>
    },
    {
        path: "/center",
        element: <Center/>
    },
    {
        path: "/setting",
        element: <Setting/>
    },
    {
        path: "/",
        element: <Navigate to="/home"/>
    }
]

export default routes