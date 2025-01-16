import React from 'react';
import {SearchOutlined} from '@ant-design/icons';
import {Button, Form, Input, Space} from 'antd';
import {QueryUserListParam} from "../data";

interface SearchFormProps {
    search: (param: QueryUserListParam) => void;
    reSet: () => void;
}

const AdvancedSearchUserForm: React.FC<SearchFormProps> = ({search, reSet}) => {
    const FormItem = Form.Item;
    const [form] = Form.useForm();

    const onFinish = (param: QueryUserListParam) => {
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
        <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish} key={"searchUserForm"}>
            {searchForm()}
        </Form>
    );
};

export default AdvancedSearchUserForm;