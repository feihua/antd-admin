import React from 'react';
import {Form, Input, InputNumber, message, Modal, Radio} from 'antd';
import {RoleVo} from "../data";
import TextArea from "antd/es/input/TextArea";

interface CreateUserFormProps {
    open: boolean;
    onCreate: (values: RoleVo) => void;
    onCancel: () => void;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({open, onCreate, onCancel}) => {
    const [form] = Form.useForm();
    const FormItem = Form.Item;

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                console.log(values)
                onCreate(values);
                form.resetFields();
            })
            .catch((info) => {
                message.error(info);
            });
    }

    const roleFormContent = () => {
        return (
            <>
                <FormItem
                    label="角色名称"
                    name="role_name"
                    rules={[{required: true, message: '请输入手机号!'}]}
                >
                    <Input/>
                </FormItem>

                <FormItem
                    label="排序"
                    name="sort"
                    rules={[{required: true, message: '请输入排序!'}]}>
                    <InputNumber/>
                </FormItem>
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
                    rules={[{required: true, message: '请输入备注!'}]}
                >
                    <TextArea rows={2}/>
                </FormItem>
            </>
        )
    }

    const modalFooter = {title: "新建", okText: '保存', onOk: handleOk, onCancel, cancelText: '取消', open, width: 480};
    const formLayout = {labelCol: {span: 7}, wrapperCol: {span: 13}, form, initialValues: {"sort": 1, "status_id": 1}};

    return (
        <Modal {...modalFooter} style={{top: 150}}>
            <Form {...formLayout} style={{marginTop: 30}}>
                {roleFormContent()}
            </Form>
        </Modal>
    );
};

export default CreateUserForm;