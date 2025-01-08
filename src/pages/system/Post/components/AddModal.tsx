import React, {useEffect} from 'react';
import {Form, Input, InputNumber, message, Modal, Radio} from 'antd';
import {PostVo} from "../data";

interface AddModalProps {
    open: boolean;
    onCreate: (values: PostVo) => void;
    onCancel: () => void;
}

const AddModal: React.FC<AddModalProps> = ({open, onCreate, onCancel}) => {
    const [form] = Form.useForm();
    const FormItem = Form.Item;

    useEffect(() => {
        if (open) {
            form.resetFields()
        }
    }, [open]);

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                onCreate(values);
            })
            .catch((info) => {
                message.error(info);
            });
    }

    const renderContent = () => {
        return (
            <>
                <FormItem
                    name="postCode"
                    label="岗位编码"
                    rules={[{required: true, message: '请输入岗位编码!'}]}
                >
                    <Input id="create-postCode" placeholder={'请输入岗位编码!'}/>
                </FormItem>
                <FormItem
                    name="postName"
                    label="岗位名称"
                    rules={[{required: true, message: '请输入岗位名称!'}]}
                >
                    <Input id="create-postName" placeholder={'请输入岗位名称!'}/>
                </FormItem>
                <FormItem
                    name="sort"
                    label="显示顺序"
                    rules={[{required: true, message: '请输入显示顺序!'}]}
                >
                    <InputNumber style={{width: 255}}/>
                </FormItem>
                <FormItem
                    name="status"
                    label="岗位状态"
                    rules={[{required: true, message: '请输入岗位状态!'}]}
                >
                    <Radio.Group>
                        <Radio value={1}>正常</Radio>
                        <Radio value={0}>停用</Radio>
                    </Radio.Group>
                </FormItem>
                <FormItem
                    name="remark"
                    label="岗位备注"
                >
                    <Input.TextArea rows={2} placeholder={'请输入备注'}/>
                </FormItem>

            </>
        );
    };

    return (
        <Modal title="新建" okText="保存" onOk={handleOk} onCancel={onCancel} cancelText="取消" open={open} width={520}
               style={{top: 150}}>
            <Form labelCol={{span: 7}} wrapperCol={{span: 13}} form={form} initialValues={{sort: 1, status: 1}}
                  style={{marginTop: 30}}>
                {renderContent()}
            </Form>
        </Modal>
    );
};

export default AddModal;