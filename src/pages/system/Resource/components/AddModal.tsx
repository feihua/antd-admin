import React, {useEffect, useState} from 'react';
import {Form, Input, InputNumber, message, Modal, Radio, TreeSelect} from 'antd';
import {MenuVo} from "../data";
import {queryMenuListSimple} from "@/pages/system/Menu/service.ts";
import {TmpMenuVo} from "@/pages/system/Menu/data";
import {tree} from "@/utils/treeUtils.ts";

interface AddModalProps {
    open: boolean;
    onCreate: (values: MenuVo) => void;
    onCancel: () => void;
}

const AddModal: React.FC<AddModalProps> = ({open, onCreate, onCancel}) => {
    const [form] = Form.useForm();
    const FormItem = Form.Item;
    const [tmpMenuVo, setTmpMenuVo] = useState<TmpMenuVo[]>([]);

    useEffect(() => {
        if (open) {
            form.resetFields()
            queryMenuListSimple().then(res => {
                if (res.code === 0) {

                    let menuList: TmpMenuVo = {
                        id: 0,
                        menuName: '主类目',
                        children: tree(res.data, 0, "parentId")
                    };
                    setTmpMenuVo([menuList])
                } else {
                    message.error(res.msg)
                }
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

    const renderContent = () => {
        return (
            <>
                <FormItem
                    name="parentId"
                    label="上级菜单"
                >
                    <TreeSelect
                        style={{width: 183}}
                        dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                        treeData={tmpMenuVo}
                        placeholder="请选择上级菜单"
                        fieldNames={{label: 'menuName', value: 'id', children: 'children'}}
                        allowClear
                    />
                </FormItem>
                <FormItem
                    name="menuName"
                    label="资源名称"
                    rules={[{required: true, message: '请输入资源名称!'}]}
                >
                    <Input id="create-menuName" placeholder={'请输入菜单名称!'}/>
                </FormItem>
                <FormItem
                    name="status"
                    label="资源状态"
                    rules={[{required: true, message: '请输入资源!'}]}
                >
                    <Radio.Group>
                        <Radio value={1}>正常</Radio>
                        <Radio value={0}>禁用</Radio>
                    </Radio.Group>
                </FormItem>
                <FormItem
                    name="sort"
                    label="排序"
                    rules={[{required: true, message: '请输入排序!'}]}
                >
                    <InputNumber style={{width: 255}}/>
                </FormItem>
                <FormItem
                    name="apiUrl"
                    label="接口URL"
                    rules={[{required: true, message: '请输入接口URL!'}]}
                >
                    <Input id="create-apiUrl" placeholder={'请输入接口URL!'}/>
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
        <Modal title="新建" okText="保存" onOk={handleOk} onCancel={onCancel} cancelText="取消" open={open} width={480} style={{top: 150}}>
            <Form labelCol={{span: 7}} wrapperCol={{span: 13}} form={form} initialValues={{sort: 1, status: 1}} style={{marginTop: 30}}>
                {renderContent()}
            </Form>
        </Modal>
    );
};

export default AddModal;