import React, {useEffect} from 'react';
import {Form, Input, message, Modal, Radio, Select} from 'antd';
import {RoleVo} from "../data";

interface AddModalProps {
    open: boolean;
    onCreate: (values: RoleVo) => void;
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
                    name="role_name"
                    label="角色名称"
                    rules={[{required: true, message: '请输入名称!'}]}
                >
                    <Input id="create-role_name" placeholder={'请输入名称!'}/>
                </FormItem>
                <FormItem
                    name="role_key"
                    label="权限字符"
                    rules={[{required: true, message: '请输入权限字符串!'}]}
                >
                    <Input id="create-role_key" placeholder={'请输入权限字符串!'}/>
                </FormItem>
                <FormItem
                    name="data_scope"
                    label="数据范围"
                    rules={[{
                        required: true,
                        message: '请输入数据范围!'
                    }]}
                >
                    <Select
                        // style={{width: 120}}
                        options={[
                            {value: 1, label: '全部数据权限'},
                            {value: 2, label: '自定数据权限'},
                            {value: 3, label: '本部门数据权限'},
                            {value: 4, label: '本部门及以下数据权限'},
                        ]}
                    />
                </FormItem>
                <FormItem
                    name="status"
                    label="状态"
                    rules={[{required: true, message: '请输入状态(1:正常，0:禁用)!'}]}
                >
                    <Radio.Group>
                        <Radio value={1}>正常</Radio>
                        <Radio value={0}>禁用</Radio>
                    </Radio.Group>
                </FormItem>
                <FormItem
                    name="remark"
                    label="备注"
                >
                    <Input.TextArea rows={2} placeholder={'请输入备注'}/>
                </FormItem>

            </>
        );
    };

    return (
        <Modal title="新建" okText="保存" onOk={handleOk} onCancel={onCancel} cancelText="取消" open={open} width={480}
               style={{top: 150}}>
            <Form labelCol={{span: 7}} wrapperCol={{span: 13}} form={form}
                  initialValues={{sort: 1, status: 1, data_scope: 1}}
                  style={{marginTop: 30}}>
                {renderContent()}
            </Form>
        </Modal>
    );
};

export default AddModal;