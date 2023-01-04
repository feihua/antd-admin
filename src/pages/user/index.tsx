import React, {useState} from 'react';
import {Divider, Radio, Table, Space, Button, Modal, Form, Checkbox, Input} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import {DataList, DataType} from './data.d';


const User: React.FC = () => {
    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');
    const [isShowAddModal, setShowAddModal] = useState<boolean>(false);
    const [isShowEditModal, setShowEditModal] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [form] = Form.useForm();

    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="small">
                    <Button type="primary" icon={<EditOutlined/>} onClick={showEditModal}>编辑</Button>
                    <Button type="primary" danger icon={<DeleteOutlined/>}
                            onClick={() => showDeleteConfirm(record)}>删除</Button>
                </Space>
            ),
        },
    ];


// rowSelection object indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record: DataType) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };

    const showModal = () => {
        setShowAddModal(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setShowAddModal(false);
            setConfirmLoading(false);
        }, 10000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setShowAddModal(false);
    };


    const showEditModal = () => {
        setShowEditModal(true);
    };

    const handleEditOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setShowEditModal(false);
            setConfirmLoading(false);
        }, 10000);
    };

    const handleEditCancel = () => {
        console.log('Clicked cancel button');
        setShowEditModal(false);
    };

    const showDeleteConfirm = (user: DataType) => {
        Modal.confirm({
            content: `确定删除${user.name}吗?`,
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            }
        })
    };

    return (
        <div>
            <div>
                <Space>
                    <Radio.Group
                        onChange={({target: {value}}) => {
                            setSelectionType(value);
                        }}
                        value={selectionType}>
                        <Radio value="checkbox">Checkbox</Radio>
                        <Radio value="radio">radio</Radio>
                    </Radio.Group>
                    <Button type="primary" icon={<PlusOutlined/>} onClick={showModal}>新建</Button>
                    <Input.Group>
                        <input/>
                        <input/>
                    </Input.Group>
                    <Button type="primary" icon={<PlusOutlined/>}>查询</Button>
                </Space>
            </div>


            <Divider/>

            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={DataList}
            />

            <Modal
                title="新建"
                open={isShowAddModal}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    name="basic"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    initialValues={{remember: true}}
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"

                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{required: true, message: 'Please input your username!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{required: true, message: 'Please input your username!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{required: true, message: 'Please input your username!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{required: true, message: 'Please input your username!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{required: true, message: 'Please input your username!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input.Password/>
                    </Form.Item>


                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Space style={{marginTop: 20}}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button type="primary">
                                取消
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="编辑"
                open={isShowEditModal}
                onOk={handleEditOk}
                confirmLoading={confirmLoading}
                onCancel={handleEditCancel}
                footer={null}
            >
                <Form
                    name="basic"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    initialValues={{remember: true}}
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{required: true, message: 'Please input your username!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input.Password/>
                    </Form.Item>


                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button type="primary">
                                取消
                            </Button>
                        </Space>

                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default User;