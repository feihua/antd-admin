import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio, Col, Row} from 'antd';
import {queryRoleDetail} from "../service";

export interface DetailModalProps {
  onCancel: () => void;
  open: boolean;
  id: number;

}

const DetailModal: React.FC<DetailModalProps> = (props) => {
   const {open, id, onCancel} = props;
   const [form] = Form.useForm();
   const FormItem = Form.Item;

  useEffect(() => {
    if (open) {
      queryRoleDetail(id).then((res) => {
        form.setFieldsValue(res.data);
      });
    }
  }, [open]);

    const renderContent = () => {
        return (
          <>
          <Row>
                <Col span={12}>
                <FormItem
                  name="id"
                  label="主键"
                  rules={[{required: true, message: '请输入主键!'}]}
                >
                    <Input id="create-id" placeholder={'请输入主键!'}/>
                </FormItem>
                </Col>
                <Col span={12}>
                <FormItem
                  name="role_name"
                  label="名称"
                  rules={[{required: true, message: '请输入名称!'}]}
                >
                    <Input id="create-role_name" placeholder={'请输入名称!'}/>
                </FormItem>
                </Col>
                <Col span={12}>
                <FormItem
                  name="status_id"
                  label="状态(1:正常，0:禁用)"
                  rules={[{required: true, message: '请输入状态(1:正常，0:禁用)!'}]}
                >
                    <Radio.Group>
                      <Radio value={0}>禁用</Radio>
                      <Radio value={1}>正常</Radio>
                    </Radio.Group>
                </FormItem>
                </Col>
                <Col span={12}>
                <FormItem
                  name="sort"
                  label="排序"
                  rules={[{required: true, message: '请输入排序!'}]}
                >
                    <InputNumber style={ {width: 255} }/>
                </FormItem>
                </Col>
                <Col span={12}>
                <FormItem
                  name="remark"
                  label="备注"
                  rules={[{required: true, message: '请输入备注!'}]}
                >
                    <Input id="create-remark" placeholder={'请输入备注!'}/>
                </FormItem>
                </Col>
                <Col span={12}>
                <FormItem
                  name="create_time"
                  label="创建时间"
                  rules={[{required: true, message: '请输入创建时间!'}]}
                >
                    <Input id="create-create_time" placeholder={'请输入创建时间!'}/>
                </FormItem>
                </Col>
                <Col span={12}>
                <FormItem
                  name="update_time"
                  label="修改时间"
                  rules={[{required: true, message: '请输入修改时间!'}]}
                >
                    <Input id="create-update_time" placeholder={'请输入修改时间!'}/>
                </FormItem>
                </Col>
             </Row>
          </>
        );
    };

  return (
    <Modal forceRender destroyOnClose title="订单详情" open={open} footer={false} width={1200} onCancel={onCancel}>
      <Form labelCol={ { span: 7 } } wrapperCol={ { span: 13 } } form={form} style={ { marginTop: 30 } }>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default DetailModal;
