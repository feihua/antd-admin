import {Navigate} from "react-router-dom"
import {User} from "../pages/user";
import {Home} from "../pages/home";
import {Role} from "../pages/role";
import {Menu} from "../pages/menu";

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
        path: "/",
        element: <Navigate to="/home"/>
    }
]

export default routes