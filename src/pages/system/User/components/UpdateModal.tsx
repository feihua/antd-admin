import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import {UserVo} from "../data";
import TextArea from "antd/es/input/TextArea";

interface UpdateFormProps {
    open: boolean;
    onCreate: (values: UserVo) => void;
    onCancel: () => void;
    userVo: UserVo;
}

const UpdateUserModal: React.FC<UpdateFormProps> = ({open, onCreate, onCancel, userVo}) => {
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

    const updateContent = () => {
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
                    name="user_name"
                    rules={[{required: true, message: '请输入用户名!'}]}
                >
                    <Input/>
                </FormItem>

                <FormItem
                    label="排序"
                    name="sort"
                    rules={[{required: true, message: '请输入排序!'}]}>
                    <InputNumber style={{width:234}}/>
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
                    <TextArea rows={2} placeholder="备注"/>
                </FormItem>
            </>
        )
    }

    return (
        <Modal title="新建" okText="保存" onOk={handleOk} onCancel={onCancel} cancelText="取消" open={open} width={480} style={{ top: 150 }}>
            <Form labelCol={{ span: 7 }} wrapperCol={{ span: 13 }} form={form} style={{ marginTop: 30 }}>
                {updateContent()}
            </Form>
        </Modal>
    );
};

export default UpdateUserModal;