import {Tree} from 'antd';
import type {DataNode, TreeProps} from 'antd/es/tree';
import React from "react";
// import style from './style.module.scss';
const treeData: DataNode[] = [
    {
        title: 'parent 1',
        key: '0-0',
        children: [
            {
                title: 'parent 1-0',
                key: '0-0-0',
                disabled: true,
                children: [
                    {
                        title: 'leaf',
                        key: '0-0-0-0',
                        className: 'leafNode',
                    },
                    {
                        title: 'leaf',
                        key: '0-0-0-1',
                        className: 'leafNode',
                    },
                ],
            },
            {
                title: 'parent 1-1',
                key: '0-0-1',
                children: [
                    {
                        title: <span style={{color: '#1890ff'}}>sss</span>,
                        key: '0-0-1-0',
                        className: 'leafNode',
                    },
                    {
                        title: <span style={{color: '#1890ff'}}>aaa</span>,
                        key: '0-0-1-1',
                        className: 'leafNode',
                    },
                    {
                        title: <span style={{color: '#1890ff'}}>bbb</span>,
                        key: '0-0-1-2',
                        className: 'leafNode',
                    },
                    {
                        title: <span style={{color: '#1890ff'}}>ccc</span>,
                        key: '0-0-1-3',
                        className: 'leafNode',
                    },
                    {
                        title: <span style={{color: '#1890ff'}}>ddd</span>,
                        key: '0-0-1-4',
                        className: 'leafNode',
                    },
                ],
            },
        ],
    },
];

const Center: React.FC = () => {
    const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };

    const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
    };

    return (
        <Tree
            // className={'tree1'}
            checkable
            defaultExpandedKeys={['0-0-0', '0-0-1']}
            defaultSelectedKeys={['0-0-0', '0-0-1']}
            defaultCheckedKeys={['0-0-0', '0-0-1']}
            onSelect={onSelect}
            onCheck={onCheck}
            treeData={treeData}
        />
    );
};

export default Center;
