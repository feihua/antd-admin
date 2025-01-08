import React, {useEffect, useState} from 'react';
import {Form, Input, message, Modal, Radio, Select, TreeSelect} from 'antd';
import {UserVo} from "../data";
import {DeptVo} from "../../Dept/data";
import {PostVo} from "../../Post/data";
import {queryDeptList} from "../../Dept/service.ts";
import {queryPostList} from "../../Post/service.ts";
import {queryUserDetail} from "../service.ts";

interface UpdateFormProps {
    open: boolean;
    onCreate: (values: UserVo) => void;
    onCancel: () => void;
    id: number;
}

const UpdateUserModal: React.FC<UpdateFormProps> = ({open, onCreate, onCancel, id}) => {
    const [form] = Form.useForm();
    const FormItem = Form.Item;

    const [value, setValue] = useState<string>();
    const [deptListData, setDeptListData] = useState<DeptVo[]>([]);
    const [postIds, setPost] = useState<number[]>([]);
    const [postListData, setPostListData] = useState<PostVo[]>([]);

    const onChange = (newValue: string) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (open) {
            queryDeptList({}).then(res => {
                setDeptListData(res);
            });
            queryPostList({
                pageNo: 1, pageSize: 100
            }).then(res => {
                res.code === 0 ? setPostListData(res.data) : message.error(res.msg);
            });

            queryUserDetail({id}).then((res) => {
                form.setFieldsValue(res.data);
                setValue(res.data.deptId);
                setPost(res.data.postIds);
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
                    label="id"
                    name="id"
                    hidden={true}
                >
                    <Input/>
                </FormItem>
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
                    <Input id="update-userName" placeholder={'请输入用户账号!'}/>
                </FormItem>
                <FormItem
                    name="nickName"
                    label="用户昵称"
                    rules={[{required: true, message: '请输入用户昵称!'}]}
                >
                    <Input id="update-nickName" placeholder={'请输入用户昵称!'}/>
                </FormItem>
                <FormItem
                    name="mobile"
                    label="手机号码"
                    rules={[{required: true, message: '请输入手机号码!'}]}
                >
                    <Input id="update-mobile" placeholder={'请输入手机号码!'}/>
                </FormItem>

                {/*<FormItem*/}
                {/*    name="userType"*/}
                {/*    label="用户类型（00系统用户）"*/}
                {/*    rules={[{required: true, message: '请输入用户类型（00系统用户）!'}]}*/}
                {/*>*/}
                {/*    <Input id="update-userType" placeholder={'请输入用户类型（00系统用户）!'}/>*/}
                {/*</FormItem>*/}
                {/*<FormItem*/}
                {/*    name="avatar"*/}
                {/*    label="头像路径"*/}
                {/*    rules={[{required: true, message: '请输入头像路径!'}]}*/}
                {/*>*/}
                {/*    <Input id="update-avatar" placeholder={'请输入头像路径!'}/>*/}
                {/*</FormItem>*/}
                <FormItem
                    name="email"
                    label="用户邮箱"
                    rules={[{required: true, message: '请输入用户邮箱!'}]}
                >
                    <Input id="update-email" placeholder={'请输入用户邮箱!'}/>
                </FormItem>
                {/*<FormItem*/}
                {/*    name="password"*/}
                {/*    label="用户密码"*/}
                {/*    rules={[{required: true, message: '请输入密码!'}]}*/}
                {/*>*/}
                {/*    <Input id="update-password" placeholder={'请输入密码!'}/>*/}
                {/*</FormItem>*/}
                <FormItem
                    name="postIds"
                    label="岗位"
                    rules={[{required: true, message: '请选择岗位!'}]}
                >

                    <Select
                        mode="multiple"
                        allowClear
                        options={postListData}
                        placeholder="请选择岗位"
                        fieldNames={{label: 'post_name', value: 'id'}}
                        onChange={onChange}
                        // @ts-ignore
                        defaultValue={postIds}
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

    return (
        <Modal title="更新" okText="保存" onOk={handleOk} onCancel={onCancel} cancelText="取消" open={open} width={480}
               style={{top: 150}}>
            <Form labelCol={{span: 7}} wrapperCol={{span: 13}} form={form} style={{marginTop: 30}}>
                {updateContent()}
            </Form>
        </Modal>
    );
};

export default UpdateUserModal;