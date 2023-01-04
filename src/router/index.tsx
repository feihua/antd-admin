import {Navigate} from "react-router-dom"
import {User} from "../pages/user";
import {Home} from "../pages/home";
import {Role} from "../pages/role";
import {Menu} from "../pages/menu";
import Bar from "../pages/charts/bar";
import Line from "../pages/charts/line";
import Pie from "../pages/charts/pie";

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
        path: "/",
        element: <Navigate to="/home"/>
    }
]

export default routes