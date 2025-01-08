import React, {useEffect, useState} from 'react';
import {Form, Input, message, Modal, Radio, Select, TreeSelect} from 'antd';
import {UserVo} from "../data";
import {DeptVo} from "../../Dept/data";
import {queryDeptList} from "../../Dept/service.ts";
import {queryPostList} from "../../Post/service.ts";
import {PostVo} from "../../Post/data";

interface AddModalProps {
    open: boolean;
    onCreate: (values: UserVo) => void;
    onCancel: () => void;
}

const AddModal: React.FC<AddModalProps> = ({open, onCreate, onCancel}) => {
    const [form] = Form.useForm();
    const FormItem = Form.Item;

    const [value, setValue] = useState<string>();
    const [deptListData, setDeptListData] = useState<DeptVo[]>([]);
    const [postListData, setPostListData] = useState<PostVo[]>([]);

    const onChange = (newValue: string) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (open) {
            form.resetFields()
            queryDeptList({}).then(res => {
                setDeptListData(res);
            });
            queryPostList({
                pageNo: 1, pageSize: 100
            }).then(res => {
                res.code === 0 ? setPostListData(res.data) : message.error(res.msg);
            });
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

    const addContent = () => {
        return (
            <>
                <FormItem
                    name="deptId"
                    label="归属部门"
                    rules={[{required: true, message: '请选择部门!'}]}
                >
                    <TreeSelect
                        style={{width: '100%'}}
                        value={value}
                        dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                        treeData={deptListData}
                        placeholder="请选择部门"
                        fieldNames={{label: 'deptName', value: 'id', children: 'children'}}
                        onChange={onChange}
                    />
                </FormItem>

                <FormItem
                    name="userName"
                    label="用户账号"
                    rules={[{required: true, message: '请输入用户账号!'}]}
                >
                    <Input id="create-userName" placeholder={'请输入用户账号!'}/>
                </FormItem>
                <FormItem
                    name="nickName"
                    label="用户昵称"
                    rules={[{required: true, message: '请输入用户昵称!'}]}
                >
                    <Input id="create-nickName" placeholder={'请输入用户昵称!'}/>
                </FormItem>
                <FormItem
                    name="mobile"
                    label="手机号码"
                    rules={[{required: true, message: '请输入手机号码!'}]}
                >
                    <Input id="create-mobile" placeholder={'请输入手机号码!'}/>
                </FormItem>

                {/*<FormItem*/}
                {/*    name="userType"*/}
                {/*    label="用户类型（00系统用户）"*/}
                {/*    rules={[{required: true, message: '请输入用户类型（00系统用户）!'}]}*/}
                {/*>*/}
                {/*    <Input id="create-userType" placeholder={'请输入用户类型（00系统用户）!'}/>*/}
                {/*</FormItem>*/}
                {/*<FormItem*/}
                {/*    name="avatar"*/}
                {/*    label="头像路径"*/}
                {/*    rules={[{required: true, message: '请输入头像路径!'}]}*/}
                {/*>*/}
                {/*    <Input id="create-avatar" placeholder={'请输入头像路径!'}/>*/}
                {/*</FormItem>*/}
                <FormItem
                    name="email"
                    label="用户邮箱"
                    rules={[{required: true, message: '请输入用户邮箱!'}]}
                >
                    <Input id="create-email" placeholder={'请输入用户邮箱!'}/>
                </FormItem>
                <FormItem
                    name="password"
                    label="用户密码"
                    rules={[{required: true, message: '请输入密码!'}]}
                >
                    <Input id="create-password" placeholder={'请输入密码!'}/>
                </FormItem>
                <FormItem
                    name="postIds"
                    label="岗位"
                    rules={[{required: true, message: '请选择岗位!'}]}
                >
                    <Select
                        value={value}
                        mode="multiple"
                        allowClear
                        options={postListData}
                        placeholder="请选择岗位"
                        fieldNames={{label: 'postName', value: 'id'}}
                        onChange={onChange}
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
            <Form labelCol={{span: 7}} wrapperCol={{span: 13}} form={form} initialValues={{sort: 1, status: 1}}
                  style={{marginTop: 30}}>
                {addContent()}
            </Form>
        </Modal>
    );
};

export default AddModal;