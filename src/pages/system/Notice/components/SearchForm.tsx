import React from 'react';
import {SearchOutlined} from '@ant-design/icons';
import {Button, Form, FormProps, Input, Select, Space} from 'antd';
import {NoticeListParam} from "../data";

interface CreateFormProps {
    search: (values: NoticeListParam) => void;
    reSet: () => void;
}

const AdvancedSearchForm: React.FC<CreateFormProps> = ({search, reSet}) => {
    const FormItem = Form.Item;
    const [form] = Form.useForm();


    const onFinish: FormProps<NoticeListParam>['onFinish'] = (param) => {
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
                    name="noticeTitle"
                    label="公告标题"
                >
                    <Input id="search-noticeTitle" placeholder={'公告标题'}/>
                </FormItem>
                <FormItem
                    name="noticeType"
                    label="公告类型"
                >
                    <Select style={{width: 200}} placeholder={'公告类型'}>
                        <Select.Option value={1}>通知</Select.Option>
                        <Select.Option value={2}>公告</Select.Option>
                    </Select>
                </FormItem>
                <FormItem
                    name="status"
                    label="公告状态"
                >
                    <Select style={{width: 200}} placeholder={'公告状态'}>
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