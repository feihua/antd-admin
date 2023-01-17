import React, {useState} from 'react';
import {ArrowDownOutlined, ArrowUpOutlined} from '@ant-design/icons';
import {Button, Card, Col, Row, Statistic} from 'antd';
import ReactEcharts from "echarts-for-react";

const Home: React.FC = () => {

    const [sales, setSales] = useState<number[]>([5, 20, 36, 10, 10, 20]);
    const [inventorys, setInventorys] = useState<number[]>([15, 30, 46, 20, 20, 40]);

    const getOption = () => {
        return {
            title: {
                text: '销量与库存'
            },
            tooltip: {},
            legend: {
                data: ['销量', '库存']
            },
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: sales
            }, {
                name: '库存',
                type: 'bar',
                data: inventorys
            }]
        }
    };

    return (
        <div style={{height: '100vh', backgroundColor: '#f5f5f5'}}>
            <Row gutter={16}>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic
                            title="总销售额"
                            value={11.28}
                            precision={2}
                            valueStyle={{color: '#3f8600'}}
                            prefix={<ArrowUpOutlined/>}
                            suffix="%"
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic
                            title="访问量"
                            value={11.28}
                            precision={2}
                            valueStyle={{color: '#3f8600'}}
                            prefix={<ArrowUpOutlined/>}
                            suffix="%"
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic
                            title="支付笔数"
                            value={11.28}
                            precision={2}
                            valueStyle={{color: '#3f8600'}}
                            prefix={<ArrowUpOutlined/>}
                            suffix="%"
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic
                            title="运营活动效果"
                            value={9.3}
                            precision={2}
                            valueStyle={{color: '#cf1322'}}
                            prefix={<ArrowDownOutlined/>}
                            suffix="%"
                        />
                    </Card>
                </Col>
            </Row>
            <Row style={{marginTop: 10}}>
                <Col span={24}>
                    {/*<Card>*/}
                    {/*    <Button type='primary'>更新</Button>*/}
                    {/*</Card>*/}
                    <Card title='图一'>
                        <ReactEcharts option={getOption()} style={{height: 300}}/>
                    </Card>
                </Col>
            </Row>
        </div>
    )
};

export default Home;