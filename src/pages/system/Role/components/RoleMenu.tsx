import React, {useEffect, useState} from 'react';
import {Form, Input, Modal, Tree} from 'antd';
import {RoleVo} from "../data";
import {query_role_menu} from "../service";
import {tree} from "../../../../utils/treeUtils";

interface UpdateFormProps {
    open: boolean;
    onCreate: (role_id: Number, menu_ids: Number[]) => void;
    onCancel: () => void;
    roleVo: RoleVo;
}

const SetRoleMenuForm: React.FC<UpdateFormProps> = ({open, onCreate, onCancel, roleVo}) => {
    const [form] = Form.useForm();
    const FormItem = Form.Item;

    const [treeData, setTreeData] = useState([]);
    const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);

    useEffect(() => {
        if (roleVo) {
            form.setFieldsValue(roleVo);
        }
        setCheckedKeys([]);
        query_role_menu(roleVo.id || 0).then((res) => {
            // @ts-ignore
            setTreeData(tree(res.data.menu_list, 0, "parent_id"))
            if (res.data.menu_ids) {
                setCheckedKeys(res.data.menu_ids.map((r: number) => r + ''));
            }
        })

    }, [open]);

    const handleOk = () => {
        onCreate(roleVo.id || 0, checkedKeys.map((i) => Number(i)))
    }

    const onCheck = (checkedKeysValue: React.Key[]) => {
        console.log('onCheck', checkedKeysValue);
        setCheckedKeys(checkedKeysValue);
    };

    const roleFormContent = () => {
        return (
            <>
                <FormItem
                    label="id"
                    name="id"
                    hidden={true}
                >
                    <Input/>
                </FormItem>
                <Tree
                    checkable
                    // @ts-ignore
                    onCheck={onCheck}
                    checkedKeys={checkedKeys}
                    treeData={treeData}
                />
            </>
        )
    }

    const modalFooter = {title: "更新", okText: '保存', onOk: handleOk, onCancel, cancelText: '取消', open, width: 480};
    const formLayout = {labelCol: {span: 7}, wrapperCol: {span: 13}, form};

    return (
        <Modal {...modalFooter} style={{top: 150}}>
            <Form {...formLayout} style={{marginTop: 30}}>
                {roleFormContent()}
            </Form>
        </Modal>
    );
};

export default SetRoleMenuForm;