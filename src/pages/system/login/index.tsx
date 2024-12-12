import React from 'react';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Checkbox, Form, Input, message} from 'antd';
import "./index.less"
import logo from '../../../assets/images/logo.svg'
import {reqLogin} from "./service";
import {IResponse} from "../../../api/ajax";
import {useNavigate} from "react-router-dom";
import {storageUtils} from "../../../utils/storageUtils";

const Login: React.FC = () => {

    let navigate = useNavigate();

    const onFinish = async (values: any) => {
        const {mobile, password} = values;
        let res: IResponse = await reqLogin({mobile, password})
        if (res.code === 0) {
            storageUtils.saveToken(res.data)
            // if (res.data.user_id) {
            //     localStorage.setItem('user_id', res.data.user_id);
            // }
            navigate('/home')
            message.success(res.msg);
        } else {
            message.error(res.msg);
        }
    };


    return (
        <div className='container'>
            <div className={'header'}>
                <img src={logo} alt="logo"/>
                <h1>React 项目: 后台管理系统</h1></div>
            <div className={'content'}>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="mobile"
                        rules={[{required: true, message: '用户名是必填项！'}]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{required: true, message: '密码是必填项！'}]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item className={'login-form-item'}>
                        <Form.Item name="remember" valuePropName="checked" className={'login-form-remember'}>
                            <Checkbox>自动登录</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                            忘记密码
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form></div>
        </div>
    );
};

export default Login;