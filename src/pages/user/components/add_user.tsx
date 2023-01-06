import React from 'react';
import {Form, Input, Modal} from 'antd';
import {UserVo} from "../data";

interface CreateUserFormProps {
    open: boolean;
    onCreate: (values: UserVo) => void;
    onCancel: () => void;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({open, onCreate, onCancel}) => {
    const [form] = Form.useForm();
    const FormItem = Form.Item;

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                console.log(values)
                form.resetFields();
                onCreate(values);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    }

    const userFormContent = () => {
        return (
            <>
                <FormItem
                    label="手机号"
                    name="mobile"
                    rules={[{required: true, message: '请输入手机号!'}]}
                >
                    <Input/>
                </FormItem>

                <FormItem
                    label="用户名"
                    name="real_name"
                    rules={[{required: true, message: '请输入用户名!'}]}
                >
                    <Input/>
                </FormItem>

                <FormItem
                    label="备注"
                    name="remark"
                    rules={[{required: true, message: '请输入备注!'}]}
                >
                    <Input/>
                </FormItem>
            </>
        )
    }

    const modalFooter = {title: "新建", okText: '保存', onOk: handleOk, onCancel, cancelText: '取消', open};
    const formLayout = {labelCol: {span: 7}, wrapperCol: {span: 13}, form};

    return (
        <Modal {...modalFooter}>
            <Form {...formLayout}>
                {userFormContent()}
            </Form>
        </Modal>
    );
};

export default CreateUserForm;