import React, {useEffect, useState} from 'react';
import {SearchOutlined} from '@ant-design/icons';
import {Button, Form, FormProps, Input, message, Select, Space, TreeSelect} from 'antd';
import {MenuListParam} from "../data";
import {queryMenuListSimple} from "@/pages/system/Menu/service.ts";
import {TmpMenuVo} from "@/pages/system/Menu/data";
import {tree} from "@/utils/treeUtils.ts";

interface CreateFormProps {
    open: boolean;
    search: (param: MenuListParam) => void;
    reSet: () => void;
}

const AdvancedSearchForm: React.FC<CreateFormProps> = ({open, search, reSet}) => {
    const FormItem = Form.Item;
    const [form] = Form.useForm();

    const [tmpMenuVo, setTmpMenuVo] = useState<TmpMenuVo[]>([]);

    useEffect(() => {
        if (open) {
            form.resetFields()
            queryMenuListSimple().then(res => {
                if (res.code === 0) {

                    let menuList: TmpMenuVo = {
                        id: 0,
                        menuName: '主类目',
                        children: tree(res.data, 0, "parentId")
                    };
                    setTmpMenuVo([menuList])
                } else {
                    message.error(res.msg)
                }
            });
        }
    }, [open]);

    const onFinish: FormProps<MenuListParam>['onFinish'] = (param) => {
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
                    name="parentId"
                    label="菜单"
                >
                    <TreeSelect
                        style={{width: 183}}
                        dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                        treeData={tmpMenuVo}
                        placeholder="请选择菜单"
                        fieldNames={{label: 'menuName', value: 'id', children: 'children'}}
                        allowClear
                    />
                </FormItem>

                <FormItem
                    name="menuName"
                    label="资源名称"
                >
                    <Input id="search-menuName" placeholder={'请输入资源名称'}/>
                </FormItem>
                <FormItem
                    name="status"
                    label="资源状态"
                >
                    <Select style={{width: 200}} placeholder={'选择资源状态'}>
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