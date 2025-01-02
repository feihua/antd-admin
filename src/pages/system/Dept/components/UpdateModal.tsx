import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import {DeptVo} from "../data";
import {queryDeptDetail} from "../service";

interface UpdateModalProps {
    open: boolean;
    onCreate: (values: DeptVo) => void;
    onCancel: () => void;
    id: number;
}

const UpdateModal: React.FC<UpdateModalProps> = ({open, onCreate, onCancel, id}) => {
    const [form] = Form.useForm();
    const FormItem = Form.Item;

    useEffect(() => {
        if (open) {
            queryDeptDetail({id}).then((res) => {
                form.setFieldsValue(res.data);
            });
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

    const renderContent = () => {
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
                    name="ancestors"
                    label="祖级列表"
                    hidden
                    initialValue={'1'}
                >
                    <Input id="create-ancestors" placeholder={'请输入祖级列表!'}/>
                </FormItem>
                <FormItem
                    name="parent_id"
                    label="上级部门"
                    rules={[{required: true, message: '请输入父部门id!'}]}
                >
                    <InputNumber style={{width: 255}}/>
                    {/*<Input id="create-parent_id" placeholder={'请输入上级部门!'}/>*/}
                </FormItem>
                <FormItem
                    name="dept_name"
                    label="部门名称"
                    rules={[{required: true, message: '请输入部门名称!'}]}
                >
                    <Input id="update-dept_name" placeholder={'请输入部门名称!'}/>
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
                    <Input id="update-leader" placeholder={'请输入负责人!'}/>
                </FormItem>
                <FormItem
                    name="phone"
                    label="联系电话"
                    rules={[{required: true, message: '请输入联系电话!'}]}
                >
                    <Input id="update-phone" placeholder={'请输入联系电话!'}/>
                </FormItem>
                <FormItem
                    name="email"
                    label="邮箱"
                    rules={[{required: true, message: '请输入邮箱!'}]}
                >
                    <Input id="update-email" placeholder={'请输入邮箱!'}/>
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
        <Modal title="更新" okText="保存" onOk={handleOk} onCancel={onCancel} cancelText="取消" open={open} width={520}
               style={{top: 150}}>
            <Form labelCol={{span: 7}} wrapperCol={{span: 13}} form={form} style={{marginTop: 30}}>
                {renderContent()}
            </Form>
        </Modal>
    );
};

export default UpdateModal;