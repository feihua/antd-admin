import {BrowserRouter, Routes, Route} from "react-router-dom";
import 'antd/dist/reset.css';
import './App.less';
import Login from "./pages/system/login";
import Admin from "./components/layout/admin";

function App() {
    return (
        <BrowserRouter basename="/antd">
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/*" element={<Admin/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
