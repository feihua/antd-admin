import React, {useEffect} from 'react';
import {Form, Input, Modal, Radio} from 'antd';
import {DictTypeVo} from "../data";
import {queryDictTypeDetail} from "../service";

interface UpdateModalProps {
    open: boolean;
    onCreate: (values: DictTypeVo) => void;
    onCancel: () => void;
    id: number;
}

const UpdateModal: React.FC<UpdateModalProps> = ({open, onCreate, onCancel, id}) => {
    const [form] = Form.useForm();
    const FormItem = Form.Item;

    useEffect(() => {
        if (open) {
            queryDictTypeDetail({id}).then((res) => {
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
                    name="dictId"
                    label="主键"
                    hidden
                >
                    <Input id="update-dictId"/>
                </FormItem>
                <FormItem
                    name="dictName"
                    label="字典名称"
                    rules={[{required: true, message: '请输入字典名称!'}]}
                >
                    <Input id="update-dictName" placeholder={'请输入字典名称!'}/>
                </FormItem>
                <FormItem
                    name="dictType"
                    label="字典类型"
                    rules={[{required: true, message: '请输入字典类型!'}]}
                >
                    <Input id="update-dictType" placeholder={'请输入字典类型!'}/>
                </FormItem>
                <FormItem
                    name="status"
                    label="状态"
                    rules={[{required: true, message: '请输入状态!'}]}
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
        <Modal title="更新" okText="保存" onOk={handleOk} onCancel={onCancel} cancelText="取消" open={open} width={480}
               style={{top: 150}}>
            <Form labelCol={{span: 7}} wrapperCol={{span: 13}} form={form} style={{marginTop: 30}}>
                {renderContent()}
            </Form>
        </Modal>
    );
};

export default UpdateModal;