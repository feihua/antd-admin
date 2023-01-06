import React, {useEffect} from 'react';
import {Form, Input, Modal} from 'antd';
import {UserVo} from "../data";

interface UpdateUserFormProps {
    open: boolean;
    confirmLoading: boolean;
    onCreate: (values: UserVo) => void;
    onCancel: () => void;
    userVo?: UserVo;
}

const UpdateUserForm: React.FC<UpdateUserFormProps> = ({open, onCreate, onCancel, confirmLoading, userVo}) => {
    const [form] = Form.useForm();
    const FormItem = Form.Item;

    useEffect(() => {
        if (userVo) {
            form.setFieldsValue(userVo);
        }
    }, [userVo]);

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
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
                    label="id"
                    name="id"
                    hidden={true}
                >
                    <Input/>
                </FormItem>
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
                    label="排序"
                    name="sort"
                    rules={[{required: true, message: '请输入排序!'}]}
                >
                    <Input/>
                </FormItem>

                <FormItem
                    label="状态"
                    name="status_id"
                    rules={[{required: true, message: '请输入状态!'}]}
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

    const modalFooter = {title: "更新", okText: '保存', onOk: handleOk, onCancel, cancelText: '取消', confirmLoading, open};
    const formLayout = {labelCol: {span: 7}, wrapperCol: {span: 13}, form};

    return (
        <Modal {...modalFooter}>
            <Form {...formLayout}>
                {userFormContent()}
            </Form>
        </Modal>
    );
};

export default UpdateUserForm;