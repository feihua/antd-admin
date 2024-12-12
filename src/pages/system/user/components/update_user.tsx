import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import {UserVo} from "../data";
import TextArea from "antd/es/input/TextArea";

interface UpdateUserFormProps {
    open: boolean;
    onCreate: (values: UserVo) => void;
    onCancel: () => void;
    userVo: UserVo;
}

const UpdateUserForm: React.FC<UpdateUserFormProps> = ({open, onCreate, onCancel, userVo}) => {
    const [form] = Form.useForm();
    const FormItem = Form.Item;

    useEffect(() => {
        if (userVo) {
            form.setFieldsValue(userVo);
        }
    }, [open]);

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
                    rules={[{required: true, message: '请输入排序!'}]}>
                    <InputNumber defaultValue={1}/>
                </FormItem>
                <FormItem
                    label="状态"
                    name="status_id"
                    rules={[{required: true, message: '请输入状态!'}]}>
                    <Radio.Group defaultValue={1}>
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

export default UpdateUserForm;