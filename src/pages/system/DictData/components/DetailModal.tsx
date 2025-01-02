import React, {useEffect, useState} from 'react';
import {Descriptions, DescriptionsProps, Modal} from 'antd';
import {queryDictDataDetail} from "../service";

export interface DetailModalProps {
    onCancel: () => void;
    open: boolean;
    id: number;

}

const DetailModal: React.FC<DetailModalProps> = (props) => {
    const {open, id, onCancel} = props;

    const [columns, setColumns] = useState<DescriptionsProps['items']>([]);
    useEffect(() => {
        if (open) {
            queryDictDataDetail({id}).then((res) => {
                setColumns([
                    {
                        key: '1',
                        label: '字典编码',
                        children: <p>{res.data.dict_code}</p>,
                    },
                    {
                        key: '2',
                        label: '字典排序',
                        children: <p>{res.data.dict_sort}</p>,
                    },
                    {
                        key: '3',
                        label: '字典标签',
                        children: <p>{res.data.dict_label}</p>,
                    },
                    {
                        key: '4',
                        label: '字典键值',
                        children: <p>{res.data.dict_value}</p>,
                    },
                    {
                        key: '5',
                        label: '字典类型',
                        children: <p>{res.data.dict_type}</p>,
                    },
                    {
                        key: '6',
                        label: '样式属性',
                        children: <p>{res.data.css_class}</p>,
                    },
                    {
                        key: '7',
                        label: '表格回显样式',
                        children: <p>{res.data.list_class}</p>,
                    },
                    {
                        key: '8',
                        label: '是否默认',
                        children: <p>{res.data.is_default == 'Y' ? '是' : '否'}</p>,
                    },
                    {
                        key: '9',
                        label: '状态',
                        children: <p>{res.data.status == 1 ? '正常' : '停用'}</p>,
                    },
                    {
                        key: '10',
                        label: '备注',
                        children: <p>{res.data.remark}</p>,
                    },
                    {
                        key: '11',
                        label: '创建时间',
                        children: <p>{res.data.create_time}</p>,
                    },
                    {
                        key: '12',
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
