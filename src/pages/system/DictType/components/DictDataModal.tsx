import React from 'react';
import {Modal} from 'antd';
import DictData from "../../DictData";

interface DictDataModalProps {
    open: boolean;
    onCancel: () => void;
    dictType: string;
}

const DictDataModal: React.FC<DictDataModalProps> = ({open, onCancel, dictType}) => {

    return (
        <Modal title="字典数据信息"
               destroyOnClose={true}
               onCancel={onCancel}
               open={open}
               width={1400}
               style={{top: 150}}
               footer={null}>
            <DictData open={open} dictType={dictType}></DictData>
        </Modal>
    );
};

export default DictDataModal;