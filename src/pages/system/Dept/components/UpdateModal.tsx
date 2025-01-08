import React, {useEffect, useState} from 'react';
import {Form, Input, InputNumber, Modal, Radio, TreeSelect} from 'antd';
import {DeptVo} from "../data";
import {queryDeptDetail, queryDeptList} from "../service";

interface UpdateModalProps {
    open: boolean;
    onCreate: (values: DeptVo) => void;
    onCancel: () => void;
    id: number;
}

const UpdateModal: React.FC<UpdateModalProps> = ({open, onCreate, onCancel, id}) => {
    const [form] = Form.useForm();
    const FormItem = Form.Item;
    const [value, setValue] = useState<string>("0");
    const [deptListData, setDeptListData] = useState<DeptVo[]>([]);

    const onChange = (newValue: string) => {
        setValue(newValue);
    };
    useEffect(() => {
        if (open) {
            queryDeptList({status: 1}).then(res => {
                setDeptListData(res);
            });
            queryDeptDetail({id}).then((res) => {
                form.setFieldsValue(res.data);
                setValue(res.data.parentId);
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
                {value != '0' && <FormItem
                    name="parentId"
                    label="上级部门"
                    rules={[{required: true, message: '请选择上级部门!'}]}
                >
                    <TreeSelect
                        style={{width: '100%'}}
                        value={value}
                        dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                        treeData={deptListData}
                        placeholder="请选择上级部门"
                        fieldNames={{label: 'deptName', value: 'id', children: 'children'}}
                        onChange={onChange}
                    />
                </FormItem>}
                <FormItem
                    name="deptName"
                    label="部门名称"
                    rules={[{required: true, message: '请输入部门名称!'}]}
                >
                    <Input id="update-deptName" placeholder={'请输入部门名称!'}/>
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