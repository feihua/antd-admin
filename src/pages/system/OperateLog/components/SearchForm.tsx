import React from 'react';
import {SearchOutlined} from '@ant-design/icons';
import {Button, Form, FormProps, Input, Select, Space} from 'antd';
import {OperateLogVo} from "../data";

interface CreateFormProps {
    search: (values: OperateLogVo) => void;
    reSet: () => void;
}

const AdvancedSearchForm: React.FC<CreateFormProps> = ({search, reSet}) => {
    const FormItem = Form.Item;
    const [form] = Form.useForm();


    const onFinish: FormProps<OperateLogVo>['onFinish'] = (values) => {
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
                    name="title"
                    label="模块标题"
                >
                    <Input id="search-title" placeholder={'请输入模块标题'}/>
                </FormItem>
                <FormItem
                    name="business_type"
                    label="业务类型"
                >
                    <Input id="search-business_type" placeholder={'请输入业务类型（0其它 1新增 2修改 3删除）'}/>
                </FormItem>

                <FormItem
                    name="operator_type"
                    label="操作类别"
                >
                    <Input id="search-operator_type" placeholder={'请输入操作类别（0其它 1后台用户 2手机端用户）'}/>
                </FormItem>
                <FormItem
                    name="operate_name"
                    label="操作人员"
                >
                    <Input id="search-operate_name" placeholder={'请输入操作人员'}/>
                </FormItem>
                <FormItem
                    name="status"
                    label="操作状态"
                >
                    <Select style={{width: 200}} placeholder={'选择操作状态(0:异常,正常)'}>
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