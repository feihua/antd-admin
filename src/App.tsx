import {BrowserRouter, Routes, Route} from "react-router-dom";
import 'antd/dist/reset.css';
import './App.less';
import Login from "./pages/system/login";
import Admin from "./components/layout/admin";

const baseUrl: string = import.meta.env.VITE_APP_DEPLOY_PATH;

function App() {
    return (
        <BrowserRouter basename={baseUrl}>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/*" element={<Admin/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
