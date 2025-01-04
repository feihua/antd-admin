import React, {useEffect, useState} from 'react';
import {Descriptions, DescriptionsProps, Modal} from 'antd';
import {queryRoleDetail} from "../service";

export interface DetailModalProps {
    onCancel: () => void;
    open: boolean;
    id: number;

}

const DetailModal: React.FC<DetailModalProps> = (props) => {
    const {open, id, onCancel} = props;

    //（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限）
    const getDataScope = function (scope: number): string {
        let text = '';
        switch (scope) {
            case 1:
                text = '全部数据权限'
                break;
            case 2:
                text = '自定数据权限'
                break;
            case 3:
                text = '本部门数据权限'
                break;
            default:
                text = '本部门及以下数据权限'
        }

        return text;

    }

    const [columns, setColumns] = useState<DescriptionsProps['items']>([]);
    useEffect(() => {
        if (open) {
            queryRoleDetail({id}).then((res) => {
                setColumns([
                    {
                        key: '1',
                        label: '角色编号',
                        children: <p>{res.data.id}</p>,
                    },
                    {
                        key: '2',
                        label: '角色名称',
                        children: <p>{res.data.role_name}</p>,
                    },
                    {
                        key: '3',
                        label: '权限字符',
                        children: <p>{res.data.role_key}</p>,
                    },
                    {
                        key: '4',
                        label: '数据范围',
                        children: <p>{getDataScope(res.data.data_scope)}</p>,
                    },
                    {
                        key: '5',
                        label: '状态',
                        children: <p>{res.data.status == 1 ? '正常' : '禁用'}</p>,
                    },
                    {
                        key: '7',
                        label: '备注',
                        children: <p>{res.data.remark}</p>,
                    },
                    {
                        key: '9',
                        label: '创建时间',
                        children: <p>{res.data.create_time}</p>,
                    },
                    {
                        key: '10',
                        label: '修改时间',
                        children: <p>{res.data.update_time}</p>,
                    },

                ])
            });
        }
    }, [open]);


    return (
        <Modal forceRender destroyOnClose title={"详情"} open={open} footer={false} width={800} onCancel={onCancel}>
            <Descriptions items={columns} style={{margin: 30}} column={2}/>
        </Modal>
    );
};

export default DetailModal;
