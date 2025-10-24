import React, {useEffect, useState} from 'react';
import {Form, Input, InputNumber, message, Modal, Radio, TreeSelect} from 'antd';
import {MenuVo} from "../data";
import {queryMenuDetail} from "../service";
import {queryMenuListSimple} from "@/pages/system/Menu/service.ts";
import {TmpMenuVo} from "@/pages/system/Menu/data";
import {tree} from "@/utils/treeUtils.ts";

interface UpdateModalProps {
    open: boolean;
    onCreate: (values: MenuVo) => void;
    onCancel: () => void;
    id: number;
}

const UpdateModal: React.FC<UpdateModalProps> = ({open, onCreate, onCancel, id}) => {
    const [form] = Form.useForm();
    const FormItem = Form.Item;
    const [tmpMenuVo, setTmpMenuVo] = useState<TmpMenuVo[]>([]);

    useEffect(() => {
        if (open) {
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
            queryMenuDetail(id).then((res) => {
                form.setFieldsValue(res.data);
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
                    <Input id="update-menuName" placeholder={'请输入资源名称!'}/>
                </FormItem>

                <FormItem
                    name="status"
                    label="资源状态"
                    rules={[{required: true, message: '请输入资源状态!'}]}
                >
                    <Radio.Group>
                        <Radio value={0}>禁用</Radio>
                        <Radio value={1}>正常</Radio>
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
                    <Input id="update-apiUrl" placeholder={'请输入接口URL!'}/>
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
        <Modal title="更新" okText="保存" onOk={handleOk} onCancel={onCancel} cancelText="取消" open={open} width={480} style={{top: 150}}>
            <Form labelCol={{span: 7}} wrapperCol={{span: 13}} form={form} style={{marginTop: 30}}>
                {renderContent()}
            </Form>
        </Modal>
    );
};

export default UpdateModal;