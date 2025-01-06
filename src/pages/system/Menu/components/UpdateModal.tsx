import React, {useEffect, useState} from 'react';
import {Form, Input, InputNumber, message, Modal, Radio, RadioChangeEvent, TreeSelect} from 'antd';
import {MenuVo, TmpMenuVo} from "../data";
import {queryMenuDetail, queryMenuListSimple} from "../service";
import {tree} from "../../../../utils/treeUtils.ts";

interface UpdateModalProps {
    open: boolean;
    onCreate: (values: MenuVo) => void;
    onCancel: () => void;
    id: number;
}

const UpdateModal: React.FC<UpdateModalProps> = ({open, onCreate, onCancel, id}) => {
    const [form] = Form.useForm();
    const FormItem = Form.Item;

    const [menuType, setMenuType] = useState<number>(2);
    const [tmpMenuVo, setTmpMenuVo] = useState<TmpMenuVo[]>([]);

    useEffect(() => {
        if (open) {
            queryMenuListSimple().then(res => {
                if (res.code === 0) {

                    let menuList: TmpMenuVo = {
                        id: 0,
                        menu_name: '主类目',
                        children: tree(res.data, 0, "parent_id")
                    };
                    setTmpMenuVo([menuList])
                } else {
                    message.error(res.msg)
                }
            });
            queryMenuDetail({id}).then((res) => {
                setMenuType(res.data.menu_type)
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

    const onChange = (e: RadioChangeEvent) => {
        setMenuType(e.target.value)
    };

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
                    label="上级菜单"
                    name="parent_id"
                    rules={[{required: true, message: '请选择上级菜单!'}]}
                >
                    <TreeSelect
                        // style={{width: '100%'}}
                        // dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                        treeData={tmpMenuVo}
                        placeholder="请选择上级菜单"
                        allowClear
                        fieldNames={{label: 'menu_name', value: 'id', children: 'children'}}
                    />
                </FormItem>
                <FormItem
                    label="菜单类型"
                    name="menu_type"
                    rules={[{required: true, message: '请选择菜单类型!'}]}
                >
                    <Radio.Group onChange={onChange} value={menuType}>
                        <Radio value={1}>目录</Radio>
                        <Radio value={2}>菜单</Radio>
                        <Radio value={3}>按钮</Radio>
                    </Radio.Group>
                </FormItem>
                <FormItem
                    name="menu_name"
                    label="菜单名称"
                    rules={[{required: true, message: '请输入菜单名称!'}]}
                >
                    <Input id="update-menu_name" placeholder={'请输入菜单名称'}/>
                </FormItem>
                {menuType !== 3 &&
                    <FormItem
                        name="menu_icon"
                        label="菜单图标"
                        rules={[{required: true, message: '请输入菜单图标!'}]}
                    >
                        <Input id="update-menu_icon" placeholder={'请输入菜单图标'}/>
                    </FormItem>
                }

                <FormItem
                    name="sort"
                    label="显示排序"
                    rules={[{required: true, message: '请输入排序!'}]}
                >
                    <InputNumber style={{width: 255}}/>
                </FormItem>
                <FormItem
                    name="visible"
                    label="显示状态"
                    rules={[{required: true, message: '请选择显示状态!'}]}
                >
                    <Radio.Group>
                        <Radio value={1}>显示</Radio>
                        <Radio value={0}>隐藏</Radio>

                    </Radio.Group>
                </FormItem>
                <FormItem
                    name="status"
                    label="菜单状态"
                    rules={[{required: true, message: '请选择菜单状态!'}]}
                >
                    <Radio.Group>
                        <Radio value={1}>正常</Radio>
                        <Radio value={0}>禁用</Radio>

                    </Radio.Group>
                </FormItem>

                {menuType !== 3 &&
                    <FormItem
                        name="menu_url"
                        label="路由路径"
                        rules={[{required: true, message: '请输入路由路径!'}]}
                    >
                        <Input id="update-menu_url" placeholder={'请输入路由路径'}/>
                    </FormItem>
                }
                {menuType === 3 &&
                    <FormItem
                        name="api_url"
                        label="接口地址"
                        rules={[{required: true, message: '请输入接口地址!'}]}
                    >
                        <Input id="update-api_url" placeholder={'请输入接口地址'}/>
                    </FormItem>
                }


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
        <Modal title="更新" okText="保存" onOk={handleOk} onCancel={onCancel} cancelText="取消" open={open} width={480}
               style={{top: 150}}>
            <Form labelCol={{span: 7}} wrapperCol={{span: 13}} form={form} style={{marginTop: 30}}>
                {renderContent()}
            </Form>
        </Modal>
    );
};

export default UpdateModal;