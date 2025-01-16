import React from 'react';
import {SearchOutlined} from '@ant-design/icons';
import {Button, Form, FormProps, Input, Select, Space} from 'antd';
import {DictDataListParam} from "../data";

interface CreateFormProps {
    search: (values: DictDataListParam) => void;
    reSet: () => void;
}

const AdvancedSearchForm: React.FC<CreateFormProps> = ({search, reSet}) => {
    const FormItem = Form.Item;
    const [form] = Form.useForm();


    const onFinish: FormProps<DictDataListParam>['onFinish'] = (param) => {
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
                    name="dictName"
                    label="字典名称"
                >
                    <Input id="search-dictName" placeholder={'请输入字典名称'}/>
                </FormItem>
                <FormItem
                    name="dictLabel"
                    label="字典标签"
                >
                    <Input id="search-dictLabel" placeholder={'请输入字典标签'}/>
                </FormItem>

                <FormItem
                    name="status"
                    label="状态"
                >
                    <Select style={{width: 200}} placeholder={'选择门状态'}>
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
        <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish} key={'search_dict_data_form'}>
            {searchForm()}
        </Form>
    );
};

export default AdvancedSearchForm;