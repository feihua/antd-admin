import React from 'react';
import {Form, Input, message, Modal, Radio} from 'antd';
import {NoticeVo} from "../data";

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
                console.log(values)
                onCreate(values);
                form.resetFields();
            })
            .catch((info) => {
                message.error(info);
            });
    }

    const renderContent = () => {
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
                    label="公告类型（1:通知,2:公告）"
                    rules={[{required: true, message: '请输入公告类型（1:通知,2:公告）!'}]}
                >
                    <Input id="create-notice_type" placeholder={'请输入公告类型（1:通知,2:公告）!'}/>
                </FormItem>
                <FormItem
                    name="notice_content"
                    label="公告内容"
                    rules={[{required: true, message: '请输入公告内容!'}]}
                >
                    <Input id="create-notice_content" placeholder={'请输入公告内容!'}/>
                </FormItem>
                <FormItem
                    name="status"
                    label="公告状态（0:关闭,1:正常 ）"
                    rules={[{required: true, message: '请输入公告状态（0:关闭,1:正常 ）!'}]}
                >
                    <Radio.Group>
                        <Radio value={0}>禁用</Radio>
                        <Radio value={1}>正常</Radio>
                    </Radio.Group>
                </FormItem>
                <FormItem
                    name="remark"
                    label="备注"
                    rules={[{required: true, message: '请输入备注!'}]}
                >
                    <Input id="create-remark" placeholder={'请输入备注!'}/>
                </FormItem>

            </>
        );
    };

    return (
        <Modal title="新建" okText="保存" onOk={handleOk} onCancel={onCancel} cancelText="取消" open={open} width={480}
               style={{top: 150}}>
            <Form labelCol={{span: 7}} wrapperCol={{span: 13}} form={form} initialValues={{sort: 1, status_id: 1}}
                  style={{marginTop: 30}}>
                {renderContent()}
            </Form>
        </Modal>
    );
};

export default AddModal;