import React, {useEffect} from 'react';
import {Form, Input, Modal, Radio, Select} from 'antd';
import {RoleVo} from "../data";

interface UpdateFormProps {
    open: boolean;
    onCreate: (values: RoleVo) => void;
    onCancel: () => void;
    roleVo: RoleVo;
}

const UpdateRoleModal: React.FC<UpdateFormProps> = ({open, onCreate, onCancel, roleVo}) => {
    const [form] = Form.useForm();
    const FormItem = Form.Item;

    useEffect(() => {
        if (open) {
            form.setFieldsValue(roleVo);
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
                    label="id"
                    name="id"
                    hidden={true}
                >
                    <Input/>
                </FormItem>
                <FormItem
                    name="roleName"
                    label="角色名称"
                    rules={[{required: true, message: '请输入名称!'}]}
                >
                    <Input id="create-roleName" placeholder={'请输入名称!'}/>
                </FormItem>
                <FormItem
                    name="roleKey"
                    label="权限字符"
                    rules={[{required: true, message: '请输入权限字符串!'}]}
                >
                    <Input id="create-roleKey" placeholder={'请输入权限字符串!'}/>
                </FormItem>
                <FormItem
                    name="dataScope"
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
        )
    }

    const modalFooter = {title: "更新", okText: '保存', onOk: handleOk, onCancel, cancelText: '取消', open, width: 480};
    const formLayout = {labelCol: {span: 7}, wrapperCol: {span: 13}};

    return (
        <Modal {...modalFooter} style={{top: 150}}>
            <Form {...formLayout} style={{marginTop: 30}} form={form}>
                {updateContent()}
            </Form>
        </Modal>
    );
};

export default UpdateRoleModal;