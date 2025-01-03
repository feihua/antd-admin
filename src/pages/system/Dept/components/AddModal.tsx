import React, {useEffect} from 'react';
import {Form, Input, InputNumber, message, Modal, Radio} from 'antd';
import {DeptVo} from "../data";

interface AddModalProps {
    open: boolean;
    onCreate: (values: DeptVo) => void;
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
                    name="parent_id"
                    label="上级部门"
                    rules={[{required: true, message: '请输入上级部门!'}]}
                >
                    <InputNumber style={{width: 255}}/>
                    {/*<Input id="create-parent_id" placeholder={'请输入上级部门!'}/>*/}
                </FormItem>
                <FormItem
                    name="dept_name"
                    label="部门名称"
                    rules={[{required: true, message: '请输入部门名称!'}]}
                >
                    <Input id="create-dept_name" placeholder={'请输入部门名称!'}/>
                </FormItem>
                <FormItem
                    name="sort"
                    label="显示顺序"
                    rules={[{required: true, message: '请输入显示顺序!'}]}
                >
                    <InputNumber style={{width: 255}}/>
                </FormItem>
                <FormItem
                    name="leader"
                    label="负责人"
                    rules={[{required: true, message: '请输入负责人!'}]}
                >
                    <Input id="create-leader" placeholder={'请输入负责人!'}/>
                </FormItem>
                <FormItem
                    name="phone"
                    label="联系电话"
                    rules={[{required: true, message: '请输入联系电话!'}]}
                >
                    <Input id="create-phone" placeholder={'请输入联系电话!'}/>
                </FormItem>
                <FormItem
                    name="email"
                    label="邮箱"
                    rules={[{required: true, message: '请输入邮箱!'}]}
                >
                    <Input id="create-email" placeholder={'请输入邮箱!'}/>
                </FormItem>
                <FormItem
                    name="status"
                    label="部门状态"
                    rules={[{required: true, message: '请输入部门状态!'}]}
                >
                    <Radio.Group>
                        <Radio value={1}>正常</Radio>
                        <Radio value={0}>停用</Radio>
                    </Radio.Group>
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