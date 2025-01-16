import React, {useEffect} from 'react';
import {Form, Input, Modal, Radio} from 'antd';
import {OperateLogVo} from "../data";
import {queryOperateLogDetail} from "../service";

interface UpdateModalProps {
    open: boolean;
    onCreate: (values: OperateLogVo) => void;
    onCancel: () => void;
    id: number;
}

const UpdateModal: React.FC<UpdateModalProps> = ({open, onCreate, onCancel, id}) => {
    const [form] = Form.useForm();
    const FormItem = Form.Item;

    useEffect(() => {
        if (open) {
            queryOperateLogDetail({id}).then((res) => {
                form.setFieldsValue(res.data);
            });
        }
    }, [open]);

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                form.resetFields();
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
                    name="title"
                    label="模块标题"
                    rules={[{required: true, message: '请输入模块标题!'}]}
                >
                    <Input id="update-title" placeholder={'请输入模块标题!'}/>
                </FormItem>
                <FormItem
                    name="businessType"
                    label="业务类型（0其它 1新增 2修改 3删除）"
                    rules={[{required: true, message: '请输入业务类型（0其它 1新增 2修改 3删除）!'}]}
                >
                    <Input id="update-businessType" placeholder={'请输入业务类型（0其它 1新增 2修改 3删除）!'}/>
                </FormItem>
                <FormItem
                    name="method"
                    label="方法名称"
                    rules={[{required: true, message: '请输入方法名称!'}]}
                >
                    <Input id="update-method" placeholder={'请输入方法名称!'}/>
                </FormItem>
                <FormItem
                    name="requestMethod"
                    label="请求方式"
                    rules={[{required: true, message: '请输入请求方式!'}]}
                >
                    <Input id="update-requestMethod" placeholder={'请输入请求方式!'}/>
                </FormItem>
                <FormItem
                    name="operatorType"
                    label="操作类别（0其它 1后台用户 2手机端用户）"
                    rules={[{required: true, message: '请输入操作类别（0其它 1后台用户 2手机端用户）!'}]}
                >
                    <Input id="update-operatorType" placeholder={'请输入操作类别（0其它 1后台用户 2手机端用户）!'}/>
                </FormItem>
                <FormItem
                    name="operateName"
                    label="操作人员"
                    rules={[{required: true, message: '请输入操作人员!'}]}
                >
                    <Input id="update-operateName" placeholder={'请输入操作人员!'}/>
                </FormItem>
                <FormItem
                    name="deptName"
                    label="部门名称"
                    rules={[{required: true, message: '请输入部门名称!'}]}
                >
                    <Input id="update-deptName" placeholder={'请输入部门名称!'}/>
                </FormItem>
                <FormItem
                    name="operateUrl"
                    label="请求URL"
                    rules={[{required: true, message: '请输入请求URL!'}]}
                >
                    <Input id="update-operateUrl" placeholder={'请输入请求URL!'}/>
                </FormItem>
                <FormItem
                    name="operateIp"
                    label="主机地址"
                    rules={[{required: true, message: '请输入主机地址!'}]}
                >
                    <Input id="update-operateIp" placeholder={'请输入主机地址!'}/>
                </FormItem>
                <FormItem
                    name="operateLocation"
                    label="操作地点"
                    rules={[{required: true, message: '请输入操作地点!'}]}
                >
                    <Input id="update-operateLocation" placeholder={'请输入操作地点!'}/>
                </FormItem>
                <FormItem
                    name="operateParam"
                    label="请求参数"
                    rules={[{required: true, message: '请输入请求参数!'}]}
                >
                    <Input id="update-operateParam" placeholder={'请输入请求参数!'}/>
                </FormItem>
                <FormItem
                    name="jsonResult"
                    label="返回参数"
                    rules={[{required: true, message: '请输入返回参数!'}]}
                >
                    <Input id="update-jsonResult" placeholder={'请输入返回参数!'}/>
                </FormItem>
                <FormItem
                    name="status"
                    label="操作状态(0:异常,正常)"
                    rules={[{required: true, message: '请输入操作状态(0:异常,正常)!'}]}
                >
                    <Radio.Group>
                        <Radio value={0}>禁用</Radio>
                        <Radio value={1}>正常</Radio>
                    </Radio.Group>
                </FormItem>
                <FormItem
                    name="errorMsg"
                    label="错误消息"
                    rules={[{required: true, message: '请输入错误消息!'}]}
                >
                    <Input id="update-errorMsg" placeholder={'请输入错误消息!'}/>
                </FormItem>
                <FormItem
                    name="operateTime"
                    label="操作时间"
                    rules={[{required: true, message: '请输入操作时间!'}]}
                >
                    <Input id="update-operateTime" placeholder={'请输入操作时间!'}/>
                </FormItem>
                <FormItem
                    name="costTime"
                    label="消耗时间"
                    rules={[{required: true, message: '请输入消耗时间!'}]}
                >
                    <Input id="update-costTime" placeholder={'请输入消耗时间!'}/>
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