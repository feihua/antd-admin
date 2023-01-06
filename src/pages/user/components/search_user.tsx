import React, {useEffect, useState} from 'react';
import {SearchOutlined} from '@ant-design/icons';
import {Button, Form, Input, Select, Space} from 'antd';
import {UserVo} from "../data";

const {Option} = Select;

interface CreateUserFormProps {
    search: (values: UserVo) => void;
    reSet: () => void;
}

const AdvancedSearchForm: React.FC<CreateUserFormProps> = ({search, reSet}) => {

    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Finish:', values);
        search(values)
    };

    const onReset = () => {
        form.resetFields();
        reSet()
    };

    const searchForm = () => {
        return (
            <>
                <Form.Item
                    label={'手机号码'}
                    name="mobile"
                >
                    <Input placeholder="手机号码"/>
                </Form.Item>
                <Form.Item
                    label={'状态'}
                    name="status_id"
                >
                    <Select style={{width: 200}}>
                        <Option value="1">启用</Option>
                        <Option value="2">禁用</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit" icon={<SearchOutlined/>} style={{width: 120}}>
                            查询
                        </Button>
                        <Button htmlType="button" onClick={onReset} style={{width: 100}}>
                            重置
                        </Button>
                    </Space>
                </Form.Item>
            </>
        )
    }
    return (
        <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
            {searchForm()}
        </Form>
    );
};

export default AdvancedSearchForm;