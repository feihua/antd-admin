import React from 'react';
import {SearchOutlined} from '@ant-design/icons';
import {Button, Form, Input, Select, Space} from 'antd';
import {RoleVo} from "../data";

const {Option} = Select;

interface SearchFormProps {
    search: (values: RoleVo) => void;
    reSet: () => void;
}

const AdvancedSearchForm: React.FC<SearchFormProps> = ({search, reSet}) => {
    const FormItem = Form.Item;
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        search(values)
    };

    const onReset = () => {
        form.resetFields();
        reSet()
    };

    const searchForm = () => {
        return (
            <>
                <FormItem
                    label={'角色名称'}
                    name="role_name"
                >
                    <Input placeholder="角色名称"/>
                </FormItem>
                <FormItem
                    label={'状态'}
                    name="status_id"
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