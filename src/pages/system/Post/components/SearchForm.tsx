import React from 'react';
import {SearchOutlined} from '@ant-design/icons';
import {Button, Form, Input, Select, Space} from 'antd';
import {PostListParam} from "../data";

interface CreateFormProps {
    search: (values: PostListParam) => void;
    reSet: () => void;
}

const AdvancedSearchForm: React.FC<CreateFormProps> = ({search, reSet}) => {
    const FormItem = Form.Item;
    const [form] = Form.useForm();


    const onFinish = (param: PostListParam) => {
        param.pageNo = 1
        param.pageSize = 10
        search(param);
    };

    const onReset = () => {
        form.resetFields();
        reSet()
    };

    const searchForm = () => {
        return (
            <>
                <FormItem
                    name="postCode"
                    label="岗位编码"
                >
                    <Input id="search-postCode" placeholder={'请输入岗位编码'}/>
                </FormItem>
                <FormItem
                    name="postName"
                    label="岗位名称"
                >
                    <Input id="search-postName" placeholder={'请输入岗位名称'}/>
                </FormItem>
                <FormItem
                    name="status"
                    label="状态"
                >
                    <Select style={{width: 200}} placeholder={'选择岗位状态'}>
                        <Select.Option value={1}>正常</Select.Option>
                        <Select.Option value={0}>禁用</Select.Option>
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