import React, {useEffect, useState} from 'react';
import {Form, Input, InputNumber, message, Modal, Radio, RadioChangeEvent, TreeSelect} from 'antd';
import {MenuVo} from "../data";

interface AddModalProps {
    open: boolean;
    onCreate: (values: MenuVo) => void;
    onCancel: () => void;
    menuListData: MenuVo[];
}

const AddModal: React.FC<AddModalProps> = ({open, onCreate, onCancel, menuListData}) => {
    const [form] = Form.useForm();
    const FormItem = Form.Item;
    const [menuType, setMenuType] = useState<number>(2);

    useEffect(() => {
        if (open) {
            form.resetFields()
        }
    }, [open]);

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                onCreate(values);
            })
            .catch((info) => {
                message.error(info);
            });
    }

    const onChange = (e: RadioChangeEvent) => {
        setMenuType(e.target.value)
    };

    const renderContent = () => {
        return (
            <>
                <FormItem
                    label="上级菜单"
                    name="parent_id"
                    rules={[{required: true, message: '请选择上级菜单!'}]}
                >
                    <TreeSelect
                        // style={{width: '100%'}}
                        // dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                        treeData={menuListData}
                        placeholder="请选择上级菜单"
                        fieldNames={{label: 'menu_name', value: 'id', children: 'children'}}
                        allowClear
                    />
                </FormItem>
                <FormItem
                    label="菜单类型"
                    name="menu_type"
                    rules={[{required: true, message: '请选择菜单类型!'}]}
                >
                    <Radio.Group onChange={onChange} value={menuType}>
                        <Radio value={1}>目录</Radio>
                        <Radio value={2}>菜单</Radio>
                        <Radio value={3}>按钮</Radio>
                    </Radio.Group>
                </FormItem>
                <FormItem
                    name="menu_name"
                    label="菜单名称"
                    rules={[{required: true, message: '请输入菜单名称!'}]}
                >
                    <Input id="create-menu_name" placeholder={'请输入菜单名称'}/>
                </FormItem>
                {menuType !== 3 &&
                    <FormItem
                        name="menu_icon"
                        label="菜单图标"
                        rules={[{required: true, message: '请输入菜单图标!'}]}
                    >
                        <Input id="create-menu_icon" placeholder={'请输入菜单图标'}/>
                    </FormItem>
                }

                <FormItem
                    name="sort"
                    label="显示排序"
                    rules={[{required: true, message: '请输入排序!'}]}
                >
                    <InputNumber style={{width: 255}}/>
                </FormItem>
                <FormItem
                    name="visible"
                    label="显示状态"
                    rules={[{required: true, message: '请选择显示状态!'}]}
                >
                    <Radio.Group>
                        <Radio value={1}>显示</Radio>
                        <Radio value={0}>隐藏</Radio>

                    </Radio.Group>
                </FormItem>
                <FormItem
                    name="status"
                    label="菜单状态"
                    rules={[{required: true, message: '请选择菜单状态!'}]}
                >
                    <Radio.Group>
                        <Radio value={1}>正常</Radio>
                        <Radio value={0}>禁用</Radio>

                    </Radio.Group>
                </FormItem>

                {menuType !== 3 &&
                    <FormItem
                        name="menu_url"
                        label="路由路径"
                        rules={[{required: true, message: '请输入路由路径!'}]}
                    >
                        <Input id="create-menu_url" placeholder={'请输入路由路径'}/>
                    </FormItem>
                }
                {menuType === 3 &&
                    <FormItem
                        name="api_url"
                        label="接口地址"
                        rules={[{required: true, message: '请输入接口地址!'}]}
                    >
                        <Input id="create-api_url" placeholder={'请输入接口地址'}/>
                    </FormItem>
                }


                <FormItem
                    name="remark"
                    label="备注"
                >
                    <Input.TextArea rows={2} placeholder={'请输入备注'}/>
                </FormItem>

            </>
        );
    };

    return (
        <Modal title="新建" okText="保存" onOk={handleOk} onCancel={onCancel} cancelText="取消" open={open} width={520}
               style={{top: 150}}>
            <Form labelCol={{span: 7}} wrapperCol={{span: 13}} form={form}
                  initialValues={{sort: 1, status: 1, visible: 1, menu_type: 1}}
                  style={{marginTop: 30}}>
                {renderContent()}
            </Form>
        </Modal>
    );
};

export default AddModal;