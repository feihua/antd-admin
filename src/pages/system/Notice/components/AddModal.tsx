import React from 'react';
import {Form, Input, message, Modal, Radio} from 'antd';
import {NoticeVo} from "../data";
import TextArea from "antd/es/input/TextArea";

interface AddModalProps {
    open: boolean;
    onCreate: (values: NoticeVo) => void;
    onCancel: () => void;
}

const AddModal: React.FC<AddModalProps> = ({open, onCreate, onCancel}) => {
    const [form] = Form.useForm();
    const FormItem = Form.Item;

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                onCreate(values);
                form.resetFields();
            })
            .catch((info) => {
                message.error(info);
            });
    }

    const addContent = () => {
        return (
            <>
                <FormItem
                    name="notice_title"
                    label="公告标题"
                    rules={[{required: true, message: '请输入公告标题!'}]}
                >
                    <Input id="create-notice_title" placeholder={'请输入公告标题!'}/>
                </FormItem>
                <FormItem
                    name="notice_type"
                    label="公告类型"
                    rules={[{required: true, message: '请输入公告类型!'}]}
                >
                    <Radio.Group>
                        <Radio value={1}>通知</Radio>
                        <Radio value={2}>公告</Radio>
                    </Radio.Group>
                </FormItem>
                <FormItem
                    name="status"
                    label="公告状态"
                    rules={[{required: true, message: '请输入公告状态!'}]}
                >
                    <Radio.Group>
                        <Radio value={1}>正常</Radio>
                        <Radio value={0}>关闭</Radio>
                    </Radio.Group>
                </FormItem>
                <FormItem
                    name="notice_content"
                    label="公告内容"
                    rules={[{required: true, message: '请输入公告内容!'}]}
                >
                    <TextArea rows={4} placeholder="请输入公告内容"/>
                </FormItem>

                <FormItem
                    name="remark"
                    label="备注"
                >
                    <TextArea rows={2} placeholder="请输入备注"/>
                </FormItem>

            </>
        );
    };

    return (
        <Modal title="添加公告" okText="保存" onOk={handleOk} onCancel={onCancel} cancelText="取消" open={open} width={580}
               style={{top: 150}}>
            <Form labelCol={{span: 6}} wrapperCol={{span: 14}} form={form} initialValues={{notice_type: 1, status: 1}}
                  style={{marginTop: 30}}>
                {addContent()}
            </Form>
        </Modal>
    );
};

export default AddModal;