import React, {useEffect, useState} from 'react';
import type {MenuProps} from 'antd';
import {Avatar, Dropdown, Space} from 'antd';
import {DownOutlined, LogoutOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons";
import {storageUtils} from "../../utils/storageUtils";
import moment from 'moment'
import {useNavigate} from "react-router-dom";

const items: MenuProps['items'] = [
    // {
    //     key: '1',
    //     label: '个人中心',
    //     icon: <UserOutlined/>
    // },
    // {
    //     key: '2',
    //     label: '个人设置',
    //     icon: <SettingOutlined/>
    // },
    {
        type: 'divider',
    },
    {
        key: '3',
        label: '退出登录',
        icon: <LogoutOutlined/>
    },
];


const MyHeader: React.FC = () => {
    let navigate = useNavigate();

    const [currentTime, setCurrentTime] = useState<string>(moment().format('YYYY-MM-DD HH:mm:ss'));

    useEffect(() => {
        setInterval(() => {
            setCurrentTime(moment().format('YYYY-MM-DD HH:mm:ss'))
        }, 1000)
    }, []);

    const onClick: MenuProps['onClick'] = ({key}) => {
        if (key === "1") {
            navigate("/center")
        } else if (key === "2") {
            navigate("/setting")
        } else {
            storageUtils.logout()
            navigate("/login", {replace: true})
        }
    };

    return (
        <Space style={{float: "right", marginRight: 30}}>
            <Avatar src={'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'}
                    alt="avatar"/>
            <Dropdown menu={{items, onClick}} placement="bottom" arrow>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        {storageUtils.getUserName()}
                        <DownOutlined/>
                    </Space>
                </a>
            </Dropdown>
            {/*{currentTime}*/}
        </Space>
    );

};

export default MyHeader;