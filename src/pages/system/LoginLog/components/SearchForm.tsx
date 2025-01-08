import React from 'react';
import {SearchOutlined} from '@ant-design/icons';
import {Button, Form, FormProps, Input, Select, Space} from 'antd';
import {LoginLogVo} from "../data";

interface CreateFormProps {
    search: (values: LoginLogVo) => void;
    reSet: () => void;
}

const AdvancedSearchForm: React.FC<CreateFormProps> = ({search, reSet}) => {
    const FormItem = Form.Item;
    const [form] = Form.useForm();


    const onFinish: FormProps<LoginLogVo>['onFinish'] = (values) => {
        search(values);
    };

    const onReset = () => {
        form.resetFields();
        reSet()
    };

    const searchForm = () => {
        return (
            <>
                <FormItem
                    name="loginName"
                    label="用户名称"
                >
                    <Input id="search-loginName" placeholder={'请输入登录账号'}/>
                </FormItem>
                <FormItem
                    name="ipaddr"
                    label="登录地址"
                >
                    <Input id="search-ipaddr" placeholder={'请输入登录IP地址'}/>
                </FormItem>
                <FormItem
                    name="status"
                    label="状态"
                >
                    <Select style={{width: 200}} placeholder={'选择登录状态'}>
                        <Select.Option value={1}>成功</Select.Option>
                        <Select.Option value={0}>失败</Select.Option>
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