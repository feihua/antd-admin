import React, {useState} from 'react';
import {ArrowDownOutlined, ArrowUpOutlined} from '@ant-design/icons';
import {Card, Col, Row, Statistic} from 'antd';
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

    const getOption2 = () => {
        return {
            title: {
                text: '用户访问来源',
                subtext: '纯属虚构',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        {value: 335, name: '直接访问'},
                        {value: 310, name: '邮件营销'},
                        {value: 234, name: '联盟广告'},
                        {value: 135, name: '视频广告'},
                        {value: 1548, name: '搜索引擎'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
    };

    const getOption3 = () => {
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
                type: 'line',
                data: [5, 20, 36, 10, 10, 20]
            }, {
                name: '库存',
                type: 'line',
                data: [15, 30, 46, 20, 20, 40]
            }]
        }
    };
    return (
        <div style={{backgroundColor: '#f5f5f5'}}>
            <Row gutter={16}>
                <Col span={6}>
                    <Card bordered={false} hoverable>
                        <Statistic
                            title="总销售额"
                            value={126560}
                            precision={2}
                            valueStyle={{color: '#cf1322'}}
                            suffix={<ArrowUpOutlined/>}
                            prefix="￥"
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false} hoverable>
                        <Statistic
                            title="访问量"
                            value={8846}
                            precision={2}
                            valueStyle={{color: '#3f8600'}}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false} hoverable>
                        <Statistic
                            title="支付笔数"
                            value={6560}
                            precision={2}
                            valueStyle={{color: '#3f8600'}}
                            suffix={<ArrowDownOutlined/>}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false} hoverable>
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

            <Row gutter={16} style={{marginTop: 10, padding: 5}}>
                <Col span={12}>
                    <Card bordered={false} hoverable>
                        <ReactEcharts option={getOption()} style={{height: 280}}/>
                    </Card>

                </Col>
                <Col span={12}>
                    <Card bordered={false} hoverable>
                        <ReactEcharts option={getOption2()} style={{height: 280}}/>
                    </Card>
                </Col>
            </Row>
            <Row style={{marginTop: 10, backgroundColor: 'white', padding: 5}}>
                <Col span={24}>
                    <Card bordered={false} hoverable>
                        <ReactEcharts option={getOption3()} style={{height: 280}}/>
                    </Card>
                </Col>
            </Row>
        </div>
    )
};

export default Home;