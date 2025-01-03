import React from 'react';
import {Modal} from 'antd';
import DictData from "../../DictData";

interface DictDataModalProps {
    open: boolean;
    onCancel: () => void;
    dict_type: string;
}

const DictDataModal: React.FC<DictDataModalProps> = ({open, onCancel, dict_type}) => {

    return (
        <Modal title="字典数据信息"
               destroyOnClose={true}
               onCancel={onCancel}
               open={open}
               width={1400}
               style={{top: 150}}
               footer={null}>
            <DictData open={open} dict_type={dict_type}></DictData>
        </Modal>
    );
};

export default DictDataModal;