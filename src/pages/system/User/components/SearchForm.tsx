import React from 'react';
import {SearchOutlined} from '@ant-design/icons';
import {Button, Form, Input, Select, Space} from 'antd';
import {UserListParam} from "../data";

const {Option} = Select;

interface SearchFormProps {
    search: (values: UserListParam) => void;
    reSet: () => void;
}

const AdvancedSearchForm: React.FC<SearchFormProps> = ({search, reSet}) => {
    const FormItem = Form.Item;
    const [form] = Form.useForm();

    const onFinish = (param: UserListParam) => {
        param.pageNo = 1
        param.pageSize = 10
        search(param)
    };

    const onReset = () => {
        form.resetFields();
        reSet()
    };

    const searchForm = () => {
        return (
            <>
                <FormItem
                    label={'手机号码'}
                    name="mobile"
                >
                    <Input placeholder="手机号码"/>
                </FormItem>
                <FormItem
                    label={'用户名'}
                    name="userName"
                >
                    <Input placeholder="用户名"/>
                </FormItem>
                <FormItem
                    label={'状态'}
                    name="status"
                >
                    <Select style={{width: 200}} placeholder="状态">
                        <Option value={1}>启用</Option>
                        <Option value={0}>禁用</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Space>
                        <Button type="primary" htmlType="submit" icon={<SearchOutlined/>} style={{width: 120}}>
                            查询
                        </Button>
                        <Button htmlType="button" onClick={onReset} style={{width: 100}}>
                            重置
                        </Button>
                    </Space>
                </FormItem>
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