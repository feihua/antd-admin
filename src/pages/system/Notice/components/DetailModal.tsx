import React, {useEffect} from 'react';
import {Col, Form, Input, Modal, Radio, Row} from 'antd';
import {queryNoticeDetail} from "../service";

export interface DetailModalProps {
    onCancel: () => void;
    open: boolean;
    id: number;

}

const DetailModal: React.FC<DetailModalProps> = (props) => {
    const {open, id, onCancel} = props;
    const [form] = Form.useForm();
    const FormItem = Form.Item;

    useEffect(() => {
        if (open) {
            queryNoticeDetail(id).then((res) => {
                form.setFieldsValue(res.data);
            });
        }
    }, [open]);

    const renderContent = () => {
        return (
            <>
                <Row>
                    <Col span={12}>
                        <FormItem
                            name="id"
                            label="公告ID"
                            rules={[{required: true, message: '请输入公告ID!'}]}
                        >
                            <Input id="create-id" placeholder={'请输入公告ID!'}/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            name="notice_title"
                            label="公告标题"
                            rules={[{required: true, message: '请输入公告标题!'}]}
                        >
                            <Input id="create-notice_title" placeholder={'请输入公告标题!'}/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            name="notice_type"
                            label="公告类型（1:通知,2:公告）"
                            rules={[{required: true, message: '请输入公告类型（1:通知,2:公告）!'}]}
                        >
                            <Input id="create-notice_type" placeholder={'请输入公告类型（1:通知,2:公告）!'}/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            name="notice_content"
                            label="公告内容"
                            rules={[{required: true, message: '请输入公告内容!'}]}
                        >
                            <Input id="create-notice_content" placeholder={'请输入公告内容!'}/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
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
                    </Col>
                    <Col span={12}>
                        <FormItem
                            name="remark"
                            label="备注"
                            rules={[{required: true, message: '请输入备注!'}]}
                        >
                            <Input id="create-remark" placeholder={'请输入备注!'}/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            name="create_time"
                            label="创建时间"
                            rules={[{required: true, message: '请输入创建时间!'}]}
                        >
                            <Input id="create-create_time" placeholder={'请输入创建时间!'}/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            name="update_time"
                            label="修改时间"
                            rules={[{required: true, message: '请输入修改时间!'}]}
                        >
                            <Input id="create-update_time" placeholder={'请输入修改时间!'}/>
                        </FormItem>
                    </Col>
                </Row>
            </>
        );
    };

    return (
        <Modal forceRender destroyOnClose title="订单详情" open={open} footer={false} width={1200} onCancel={onCancel}>
            <Form labelCol={{span: 7}} wrapperCol={{span: 13}} form={form} style={{marginTop: 30}}>
                {renderContent()}
            </Form>
        </Modal>
    );
};

export default DetailModal;
