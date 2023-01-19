import React, {useEffect, useState} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import {MenuVo} from "../data";
import TextArea from "antd/es/input/TextArea";

interface UpdateMenuFormProps {
    open: boolean;
    onCreate: (values: MenuVo) => void;
    onCancel: () => void;
    menuVo?: MenuVo;
}

const UpdateMenuForm: React.FC<UpdateMenuFormProps> = ({open, onCreate, onCancel, menuVo}) => {
    const [menuType, setMenuType] = useState<number>(2);
    const [menuName, setMenuName] = useState<string>('菜单名称');

    const [form] = Form.useForm();
    const FormItem = Form.Item;

    useEffect(() => {
        if (menuVo) {
            form.setFieldsValue(menuVo);

            let t = menuVo.menu_type
            setMenuType(t)
            if (t === 1) {
                setMenuName('目录名称');
            } else {
                setMenuName(t === 2 ? '菜单名称' : '按钮名称');
            }
        }
    }, [menuVo]);

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                // form.resetFields();
                onCreate({"api_url": '', "menu_url": '', "icon": '', ...values});
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    }

    const userFormContent = () => {
        return (
            <>
                <FormItem
                    label="id"
                    name="id"
                    hidden={true}
                >
                    <Input/>
                </FormItem>
                <FormItem
                    label="parent_id"
                    name="parent_id"
                    hidden={true}
                >
                    <Input/>
                </FormItem>
                <FormItem
                    label="类型"
                    name="menu_type"
                >
                    <Radio.Group disabled>
                        <Radio value={1}>目录</Radio>
                        <Radio value={2}>菜单</Radio>
                        <Radio value={3}>按钮</Radio>
                    </Radio.Group>
                </FormItem>
                <FormItem
                    label={menuName}
                    name="menu_name"
                    rules={[{required: true, message: '请输入菜单名称!'}]}
                >
                    <Input/>
                </FormItem>
                {menuType !== 3 &&
                    <FormItem
                        label="路径"
                        name="menu_url"
                        rules={[{required: true, message: '请输入路径!'}]}
                    >
                        <Input/>
                    </FormItem>
                }
                {menuType === 3 &&
                    <FormItem
                        label="接口地址"
                        name="api_url"
                        rules={[{required: true, message: '请输入接口地址!'}]}
                    >
                        <Input/>
                    </FormItem>
                }
                <FormItem
                    label="排序"
                    name="sort"
                    rules={[{required: true, message: '请输入排序!'}]}>
                    <InputNumber/>
                </FormItem>
                {menuType !== 3 &&
                    <FormItem
                        label="图标"
                        name="icon"
                        rules={[{required: true, message: '请输入图标!'}]}
                    >
                        <Input/>
                    </FormItem>
                }
                <FormItem
                    label="状态"
                    name="status_id"
                    rules={[{required: true, message: '请输入状态!'}]}>
                    <Radio.Group>
                        <Radio value={1}>启用</Radio>
                        <Radio value={0}>禁用</Radio>
                    </Radio.Group>
                </FormItem>
                <FormItem
                    label="备注"
                    name="remark"
                >
                    <TextArea rows={2}/>
                </FormItem>
            </>
        )
    }

    const modalFooter = {title: "更新", okText: '保存', onOk: handleOk, onCancel, cancelText: '取消', open, width: 480};
    const formLayout = {labelCol: {span: 7}, wrapperCol: {span: 13}, form};

    return (
        <Modal {...modalFooter} style={{top: 150}}>
            <Form {...formLayout} style={{marginTop: 30}}>
                {userFormContent()}
            </Form>
        </Modal>
    );
};

export default UpdateMenuForm;