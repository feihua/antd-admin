import React, {useEffect} from 'react';
import {Form, Input, InputNumber, message, Modal, Radio} from 'antd';
import {DictDataVo} from "../data";

interface AddModalProps {
    open: boolean;
    onCreate: (values: DictDataVo) => void;
    onCancel: () => void;
    dict_type: string;
}

const AddModal: React.FC<AddModalProps> = ({open, onCreate, onCancel, dict_type}) => {
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
                    name="dict_type"
                    label="字典类型"
                    rules={[{required: true, message: '请输入字典类型!'}]}
                >
                    <Input id="create-dict_type" placeholder={'请输入字典类型!'} disabled/>
                </FormItem>
                <FormItem
                    name="dict_label"
                    label="数据标签"
                    rules={[{required: true, message: '请输入数据标签!'}]}
                >
                    <Input id="create-dict_label" placeholder={'请输入数据标签!'}/>
                </FormItem>
                <FormItem
                    name="dict_value"
                    label="数据键值"
                    rules={[{required: true, message: '请输入数据键值!'}]}
                >
                    <Input id="create-dict_value" placeholder={'请输入数据键值!'}/>
                </FormItem>
                <FormItem
                    name="css_class"
                    label="样式属性"
                    rules={[{required: true, message: '请输入样式属性（其他样式扩展）!'}]}
                >
                    <Input id="create-css_class" placeholder={'请输入样式属性（其他样式扩展）!'}/>
                </FormItem>
                <FormItem
                    name="list_class"
                    label="回显样式"
                    rules={[{required: true, message: '请输入表格回显样式!'}]}
                >
                    <Input id="create-list_class" placeholder={'请输入表格回显样式!'}/>
                </FormItem>
                <FormItem
                    name="dict_sort"
                    label="显示排序"
                    rules={[{required: true, message: '请输入显示排序!'}]}
                >
                    <InputNumber style={{width: 255}}/>
                </FormItem>
                <FormItem
                    name="is_default"
                    label="是否默认"
                    rules={[{required: true, message: '请输入是否默认!'}]}
                >
                    <Radio.Group>
                        <Radio value={'N'}>否</Radio>
                        <Radio value={'Y'}>是</Radio>
                    </Radio.Group>
                </FormItem>
                <FormItem
                    name="status"
                    label="状态"
                    rules={[{required: true, message: '请输入门状态!'}]}
                >
                    <Radio.Group>
                        <Radio value={1}>正常</Radio>
                        <Radio value={0}>停用</Radio>
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
        <Modal title="新建" okText="保存" onOk={handleOk} onCancel={onCancel} cancelText="取消" open={open} width={520}
               style={{top: 150}} destroyOnClose={true}>
            <Form labelCol={{span: 7}} wrapperCol={{span: 13}} form={form} key={'add_dict_data_form'}
                  initialValues={{dict_sort: 1, status: 1, is_default: 'N', dict_type: dict_type}}
                  style={{marginTop: 30}}>
                {renderContent()}
            </Form>
        </Modal>
    );
};

export default AddModal;