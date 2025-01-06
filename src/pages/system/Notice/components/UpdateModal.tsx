import React, {useEffect, useState} from 'react';
import {Form, Input, Modal, Radio} from 'antd';
import {NoticeVo} from "../data";
import {queryNoticeDetail} from "../service";
import TextArea from "antd/es/input/TextArea";

interface UpdateModalProps {
    open: boolean;
    onCreate: (values: NoticeVo) => void;
    onCancel: () => void;
    id: number;
}

const UpdateModal: React.FC<UpdateModalProps> = ({open, onCreate, onCancel, id}) => {
    const [form] = Form.useForm();
    const FormItem = Form.Item;

    const [title, setTitle] = useState<string>("更新通知");

    useEffect(() => {
        if (open) {
            queryNoticeDetail({id}).then((res) => {
                form.setFieldsValue(res.data);
                setTitle(res.data.notice_type == 1 ? "更新通知" : "更新公告")
            });
        }
    }, [open]);

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
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
                    name="id"
                    label="主键"
                    hidden
                >
                    <Input id="update-id"/>
                </FormItem>
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

    const modalFooter = {title: title, okText: '保存', onOk: handleOk, onCancel, cancelText: '取消', open, width: 520};
    const formLayout = {labelCol: {span: 7}, wrapperCol: {span: 13}, form};

    return (
        <Modal {...modalFooter} style={{top: 150}}>
            <Form {...formLayout} style={{marginTop: 30}}>
                {updateContent()}
            </Form>
        </Modal>
    );

};

export default UpdateModal;