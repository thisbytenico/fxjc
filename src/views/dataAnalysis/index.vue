<template>
    <div class="data-analysis-container">
        <!-- 顶部导航栏 -->
        <!-- <div class="top-nav">
            <div class="logo">
                <div class="logo-icon"></div>
                <div class="logo-text">国家追溯平台大数据智慧监管平台 (热更新测试)</div>
                <div class="logo-subtitle">数据分析</div>
            </div>
            <div class="nav-tabs">
                <div class="nav-item" :class="{ active: activeTab === 'data-monitor' }" @click="handleTabClick('data-monitor')">
                    <span class="nav-icon"></span>
                    数据监控
                </div>
                <div class="nav-item" :class="{ active: activeTab === 'regulatory' }" @click="handleTabClick('regulatory')">
                    <span class="nav-icon"></span>
                    监管业务
                </div>
                <div class="nav-item" :class="{ active: activeTab === 'traceability' }" @click="handleTabClick('traceability')">
                    <span class="nav-icon"></span>
                    追溯业务
                </div>
                <div class="nav-item" :class="{ active: activeTab === 'subject' }" @click="handleTabClick('subject')">
                    <span class="nav-icon"></span>
                    追溯主体
                </div>
            </div>
            <div class="nav-right">
                <div class="nav-item">信息查询</div>
                <div class="nav-item">监管系统</div>
                <div class="user-info">朱生</div>
            </div>
        </div> -->
        
        <!-- 主要内容区域 -->
        <div class="main-content">
            <!-- 左侧区域 -->
            <div class="left-section">
                <!-- 覆盖业务情况 -->
                <div class="card">
                    <div class="card-header">
                        <div class="header-decoration left"></div>
                        <h3>覆盖业务情况</h3>
                        <div class="header-decoration right"></div>
                    </div>
                    <div class="card-body">
                        <div class="data-item">
                            <div class="data-icon blue">
                                <div class="icon-marketing"></div>
                            </div>
                            <div class="data-info">
                                <div class="data-value">984,320</div>
                                <div class="data-label">追溯业务次数</div>
                                <div class="data-change">去年同期: 2,280,300次 同比: -56.8%</div>
                            </div>
                        </div>
                        <div class="data-item">
                            <div class="data-icon green">
                                <div class="icon-finance"></div>
                            </div>
                            <div class="data-info">
                                <div class="data-value">258,410</div>
                                <div class="data-label">打印追溯码</div>
                                <div class="data-change">去年同期: 1,167,940次 同比: -77.9%</div>
                            </div>
                        </div>
                        <div class="data-item">
                            <div class="data-icon purple">
                                <div class="icon-order"></div>
                            </div>
                            <div class="data-info">
                                <div class="data-value">984,320</div>
                                <div class="data-label">打印合格证</div>
                                <div class="data-change">去年同期: 1,251,320次 同比: -21.3%</div>
                            </div>
                        </div>
                        <div class="data-item">
                            <div class="data-icon yellow">
                                <div class="icon-ticket"></div>
                            </div>
                            <div class="data-info">
                                <div class="data-value">38,172</div>
                                <div class="data-label">打印合格证</div>
                                <div class="data-change">去年同期: 1,991次 同比: 11.6%</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 追溯产品情况 -->
                <div class="card">
                    <div class="card-header">
                        <div class="header-decoration left"></div>
                        <h3>追溯产品情况</h3>
                        <div class="header-decoration right"></div>
                    </div>
                    <div class="card-body">
                        <div class="product-summary">
                            <div class="product-item">
                                <div class="product-value">38,172</div>
                                <div class="product-label">追溯产品个数</div>
                            </div>
                            <div class="product-item">
                                <div class="product-value">2,957</div>
                                <div class="product-label">种植业</div>
                            </div>
                            <div class="product-item">
                                <div class="product-value">3,905</div>
                                <div class="product-label">畜牧业</div>
                            </div>
                            <div class="product-item">
                                <div class="product-value">1,700</div>
                                <div class="product-label">渔业</div>
                            </div>
                        </div>
                        <div class="chart-title">追溯产品生产批次排名</div>
                        <div id="productChart" class="chart-container"></div>
                    </div>
                </div>
                
                <!-- 追溯种养面积 -->
                <div class="card">
                    <div class="card-header">
                        <div class="header-decoration left"></div>
                        <h3>追溯种养面积</h3>
                        <div class="header-decoration right"></div>
                    </div>
                    <div class="card-body">
                        <div class="area-item">
                            <div class="area-icon blue">
                                <div class="icon-plant"></div>
                            </div>
                            <div class="area-info">
                                <div class="area-value">92,043</div>
                                <div class="area-label">种植业种植面积(亩)</div>
                            </div>
                        </div>
                        <div class="area-item">
                            <div class="area-icon orange">
                                <div class="icon-livestock"></div>
                            </div>
                            <div class="area-info">
                                <div class="area-value">41,701</div>
                                <div class="area-label">畜牧业养殖面积(亩)</div>
                            </div>
                        </div>
                        <div class="area-item">
                            <div class="area-icon green">
                                <div class="icon-fishery"></div>
                            </div>
                            <div class="area-info">
                                <div class="area-value">10,584</div>
                                <div class="area-label">渔业养殖面积(亩)</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 中央区域 -->
            <div class="center-section">
                <!-- 主体数量卡片 -->
                <div class="entity-cards">
                    <div class="entity-card gold">
                        <div class="entity-icon">
                            <div class="icon-enterprise"></div>
                        </div>
                        <div class="entity-value">350,094</div>
                        <div class="entity-label">生产经营主体</div>
                    </div>
                    <div class="entity-card orange">
                        <div class="entity-icon">
                            <div class="icon-regulatory"></div>
                        </div>
                        <div class="entity-value">16,888</div>
                        <div class="entity-label">监管机构总数</div>
                    </div>
                    <div class="entity-card green">
                        <div class="entity-icon">
                            <div class="icon-detection"></div>
                        </div>
                        <div class="entity-value">26,091</div>
                        <div class="entity-label">检测机构总数</div>
                    </div>
                    <div class="entity-card blue">
                        <div class="entity-icon">
                            <div class="icon-law"></div>
                        </div>
                        <div class="entity-value">2,242</div>
                        <div class="entity-label">执法机构总数</div>
                    </div>
                </div>
                
                <!-- 行业分布 -->
                <div class="industry-cards">
                    <div class="industry-card">
                        <div class="industry-label">种植业</div>
                        <div class="industry-value">253,450</div>
                    </div>
                    <div class="industry-card">
                        <div class="industry-label">畜牧业</div>
                        <div class="industry-value">114,780</div>
                    </div>
                    <div class="industry-card">
                        <div class="industry-label">渔业</div>
                        <div class="industry-value">49,650</div>
                    </div>
                    <div class="industry-card">
                        <div class="industry-label">其他</div>
                        <div class="industry-value">281,190</div>
                    </div>
                </div>
                
                <!-- 中国地图 -->
                <div class="map-container">
                    <div class="map-location">当前位置：全国</div>
                    <div id="chinaMap" class="map"></div>
                    <div class="map-decoration"></div>
                    <div class="map-info">
                        <div class="map-title">注册生产经营主体地域排行</div>
                        <div id="rankingChart" class="ranking-chart"></div>
                        <div class="map-stats">
                            <div class="stat-title">上季度新增注册生产经营主体4,756家 与同期相比增长3%</div>
                        </div>
                        <div id="trendChart" class="trend-chart"></div>
                    </div>
                </div>
            </div>
            
            <!-- 右侧区域 -->
            <div class="right-section">
                <!-- 消费者查询情况 -->
                <div class="card">
                    <div class="card-header">
                        <div class="header-decoration left"></div>
                        <h3>消费者查询情况</h3>
                        <div class="more">明细></div>
                    </div>
                    <div class="card-body">
                        <div class="data-item">
                            <div class="data-icon cyan">
                                <div class="icon-search"></div>
                            </div>
                            <div class="data-info">
                                <div class="data-value">38,172</div>
                                <div class="data-label">消费者查询次数</div>
                                <div class="data-change">环比增长 12.6%</div>
                            </div>
                        </div>
                        <div class="chart-title">追溯产品消费者查询次数排名</div>
                        <div id="queryChart" class="chart-container"></div>
                    </div>
                </div>
                
                <!-- 监管任务情况 -->
                <div class="card">
                    <div class="card-header">
                        <div class="header-decoration left"></div>
                        <h3>监管任务情况</h3>
                        <div class="header-decoration right"></div>
                    </div>
                    <div class="card-body">
                        <div class="data-item">
                            <div class="data-icon blue">
                                <div class="icon-shield"></div>
                            </div>
                            <div class="data-info">
                                <div class="data-value">56,932</div>
                                <div class="data-label">监管任务总数</div>
                                <div class="data-change">已完成6,932家</div>
                            </div>
                        </div>
                        <div class="task-stats">
                            <div class="task-item blue">
                                <div class="task-label">飞行检查</div>
                                <div class="task-value">98,054</div>
                            </div>
                            <div class="task-item orange">
                                <div class="task-label">专项检查</div>
                                <div class="task-value">120,150</div>
                            </div>
                            <div class="task-item yellow">
                                <div class="task-label">日常检查</div>
                                <div class="task-value">85,710</div>
                            </div>
                            <div class="task-item cyan">
                                <div class="task-label">体系检查</div>
                                <div class="task-value">102,548</div>
                            </div>
                        </div>
                        <div id="taskChart" class="gauge-container"></div>
                    </div>
                </div>
                
                <!-- 基地巡查情况 -->
                <div class="card">
                    <div class="card-header">
                        <div class="header-decoration left"></div>
                        <h3>基地巡查情况</h3>
                        <div class="header-decoration right"></div>
                    </div>
                    <div class="card-body">
                        <div class="data-item">
                            <div class="data-icon cyan">
                                <div class="icon-location"></div>
                            </div>
                            <div class="data-info">
                                <div class="data-value">20,192</div>
                                <div class="data-label">基地巡查次数</div>
                            </div>
                        </div>
                        <div class="area-item">
                            <div class="area-icon green">
                                <div class="icon-check"></div>
                            </div>
                    <div class="area-info">
                        <div class="area-value">9,028</div>
                        <div class="area-label">基地检查次数</div>
                    </div>
                </div>
                        <div id="inspectionChart" class="gauge-container"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue';
import * as echarts from 'echarts';

export default {
    name: 'DataAnalysis',
    setup() {
        const activeTab = ref('data-monitor');
        
        const handleTabClick = (tab) => {
            activeTab.value = tab;
        };
        
        onMounted(() => {
            nextTick(() => {
                initChinaMap();
                initProductChart();
                initQueryChart();
                initTaskChart();
                initInspectionChart();
                initTrendChart();
                initRankingChart();
            });
        });
        
        const initChinaMap = () => {
            const chartDom = document.getElementById('chinaMap');
            const myChart = echarts.init(chartDom);
            
            fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000.json')
                .then(response => response.json())
                .then(geoJson => {
                    echarts.registerMap('china', geoJson);
                    
                    const option = {
                        tooltip: {
                            trigger: 'item',
                            formatter: '{b}: {c}',
                            backgroundColor: 'rgba(0, 20, 40, 0.9)',
                            borderColor: '#00d4ff',
                            textStyle: {
                                color: '#ffffff'
                            }
                        },
                        visualMap: {
                            type: 'continuous',
                            min: 0,
                            max: 500,
                            left: 'left',
                            top: 'bottom',
                            text: ['高', '低'],
                            textStyle: {
                                color: '#00d4ff'
                            },
                            calculable: true,
                            inRange: {
                                color: ['#001a33', '#003366', '#006699', '#0099cc', '#00ccff', '#33ffff']
                            }
                        },
                        series: [
                            {
                                name: '生产经营主体',
                                type: 'map',
                                map: 'china',
                                roam: true,
                                emphasis: {
                                    label: {
                                        show: true,
                                        color: '#ffffff'
                                    },
                                    itemStyle: {
                                        areaColor: '#00d4ff'
                                    }
                                },
                                data: [
                                    { name: '北京', value: 150 },
                                    { name: '天津', value: 120 },
                                    { name: '河北', value: 200 },
                                    { name: '山西', value: 100 },
                                    { name: '内蒙古', value: 80 },
                                    { name: '辽宁', value: 180 },
                                    { name: '吉林', value: 150 },
                                    { name: '黑龙江', value: 120 },
                                    { name: '上海', value: 250 },
                                    { name: '江苏', value: 300 },
                                    { name: '浙江', value: 350 },
                                    { name: '安徽', value: 220 },
                                    { name: '福建', value: 200 },
                                    { name: '江西', value: 180 },
                                    { name: '山东', value: 187 },
                                    { name: '河南', value: 200 },
                                    { name: '湖北', value: 220 },
                                    { name: '湖南', value: 200 },
                                    { name: '广东', value: 284 },
                                    { name: '广西', value: 150 },
                                    { name: '海南', value: 80 },
                                    { name: '重庆', value: 150 },
                                    { name: '四川', value: 241 },
                                    { name: '贵州', value: 100 },
                                    { name: '云南', value: 120 },
                                    { name: '西藏', value: 30 },
                                    { name: '陕西', value: 150 },
                                    { name: '甘肃', value: 80 },
                                    { name: '青海', value: 50 },
                                    { name: '宁夏', value: 60 },
                                    { name: '新疆', value: 80 }
                                ]
                            }
                        ]
                    };
                    
                    myChart.setOption(option);
                    
                    window.addEventListener('resize', () => {
                        myChart.resize();
                    });
                })
                .catch(error => {
                    console.error('Failed to load China map data:', error);
                });
        };
        
        const initProductChart = () => {
            const chartDom = document.getElementById('productChart');
            const myChart = echarts.init(chartDom);
            
            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    backgroundColor: 'rgba(0, 20, 40, 0.9)',
                    borderColor: '#00d4ff',
                    textStyle: {
                        color: '#ffffff'
                    }
                },
                grid: {
                    left: '10%',
                    right: '5%',
                    bottom: '15%',
                    top: '10%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: ['猪肉', '大米', '蔬菜', '粮油', '辣椒'],
                    axisLine: {
                        lineStyle: {
                            color: '#00d4ff'
                        }
                    },
                    axisLabel: {
                        color: '#00d4ff',
                        fontSize: 10
                    },
                    axisTick: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        color: '#00d4ff',
                        fontSize: 10
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(0, 212, 255, 0.1)'
                        }
                    }
                },
                series: [
                    {
                        name: '批次数量',
                        type: 'bar',
                        data: [2000, 1800, 1500, 1200, 800],
                        barWidth: '30%',
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: '#00ffff' },
                                { offset: 1, color: '#006699' }
                            ]),
                            borderRadius: [4, 4, 0, 0]
                        }
                    }
                ]
            };
            
            myChart.setOption(option);
            
            window.addEventListener('resize', () => {
                myChart.resize();
            });
        };
        
        const initQueryChart = () => {
            const chartDom = document.getElementById('queryChart');
            const myChart = echarts.init(chartDom);
            
            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    backgroundColor: 'rgba(0, 20, 40, 0.9)',
                    borderColor: '#00d4ff',
                    textStyle: {
                        color: '#ffffff'
                    }
                },
                grid: {
                    left: '10%',
                    right: '5%',
                    bottom: '15%',
                    top: '10%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: ['葡萄', '大米', '黄瓜', '辣椒', '蘑菇'],
                    axisLine: {
                        lineStyle: {
                            color: '#00d4ff'
                        }
                    },
                    axisLabel: {
                        color: '#00d4ff',
                        fontSize: 10
                    },
                    axisTick: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        color: '#00d4ff',
                        fontSize: 10
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(0, 212, 255, 0.1)'
                        }
                    }
                },
                series: [
                    {
                        name: '查询次数',
                        type: 'bar',
                        data: [2000, 1800, 1500, 1200, 800],
                        barWidth: '30%',
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: '#00ffff' },
                                { offset: 1, color: '#006699' }
                            ]),
                            borderRadius: [4, 4, 0, 0]
                        }
                    }
                ]
            };
            
            myChart.setOption(option);
            
            window.addEventListener('resize', () => {
                myChart.resize();
            });
        };
        
        const initTaskChart = () => {
            const chartDom = document.getElementById('taskChart');
            const myChart = echarts.init(chartDom);
            
            const option = {
                tooltip: {
                    formatter: '{a} <br/>{b} : {c}%',
                    backgroundColor: 'rgba(0, 20, 40, 0.9)',
                    borderColor: '#00d4ff',
                    textStyle: {
                        color: '#ffffff'
                    }
                },
                series: [
                    {
                        name: '任务完成率',
                        type: 'gauge',
                        startAngle: 180,
                        endAngle: 0,
                        min: 0,
                        max: 100,
                        splitNumber: 10,
                        axisLine: {
                            lineStyle: {
                                width: 10,
                                color: [
                                    [0.3, '#ff6600'],
                                    [0.7, '#ffcc00'],
                                    [1, '#00ff66']
                                ]
                            }
                        },
                        pointer: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        title: {
                            show: false
                        },
                        detail: {
                            fontSize: 24,
                            offsetCenter: [0, '0%'],
                            valueAnimation: true,
                            formatter: function (value) {
                                return Math.round(value) + '%';
                            },
                            color: '#ff6600',
                            fontWeight: 'bold'
                        },
                        data: [
                            {
                                value: 68,
                                name: '任务完成率'
                            }
                        ]
                    }
                ]
            };
            
            myChart.setOption(option);
            
            window.addEventListener('resize', () => {
                myChart.resize();
            });
        };
        
        const initInspectionChart = () => {
            const chartDom = document.getElementById('inspectionChart');
            const myChart = echarts.init(chartDom);
            
            const option = {
                tooltip: {
                    formatter: '{a} <br/>{b} : {c}%',
                    backgroundColor: 'rgba(0, 20, 40, 0.9)',
                    borderColor: '#00d4ff',
                    textStyle: {
                        color: '#ffffff'
                    }
                },
                series: [
                    {
                        name: '基地检查率',
                        type: 'gauge',
                        startAngle: 180,
                        endAngle: 0,
                        min: 0,
                        max: 100,
                        splitNumber: 10,
                        axisLine: {
                            lineStyle: {
                                width: 10,
                                color: [
                                    [0.3, '#ff6600'],
                                    [0.7, '#ffcc00'],
                                    [1, '#00ff66']
                                ]
                            }
                        },
                        pointer: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        title: {
                            show: false
                        },
                        detail: {
                            fontSize: 24,
                            offsetCenter: [0, '0%'],
                            valueAnimation: true,
                            formatter: function (value) {
                                return Math.round(value) + '%';
                            },
                            color: '#00ff66',
                            fontWeight: 'bold'
                        },
                        data: [
                            {
                                value: 68,
                                name: '基地检查率'
                            }
                        ]
                    }
                ]
            };
            
            myChart.setOption(option);
            
            window.addEventListener('resize', () => {
                myChart.resize();
            });
        };
        
        const initTrendChart = () => {
            const chartDom = document.getElementById('trendChart');
            const myChart = echarts.init(chartDom);
            
            const option = {
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(0, 20, 40, 0.9)',
                    borderColor: '#00d4ff',
                    textStyle: {
                        color: '#ffffff'
                    }
                },
                grid: {
                    left: '10%',
                    right: '5%',
                    bottom: '15%',
                    top: '10%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['7月', '8月', '9月'],
                    axisLine: {
                        lineStyle: {
                            color: '#00d4ff'
                        }
                    },
                    axisLabel: {
                        color: '#00d4ff',
                        fontSize: 10
                    },
                    axisTick: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        color: '#00d4ff',
                        fontSize: 10
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(0, 212, 255, 0.1)'
                        }
                    }
                },
                series: [
                    {
                        name: '设施数量',
                        type: 'line',
                        stack: 'Total',
                        data: [150, 200, 250],
                        smooth: true,
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: 'rgba(0, 212, 255, 0.4)' },
                                { offset: 1, color: 'rgba(0, 102, 153, 0.05)' }
                            ])
                        },
                        lineStyle: {
                            color: '#00d4ff',
                            width: 2
                        },
                        itemStyle: {
                            color: '#00d4ff'
                        }
                    }
                ]
            };
            
            myChart.setOption(option);
            
            window.addEventListener('resize', () => {
                myChart.resize();
            });
        };
        
        const initRankingChart = () => {
            const chartDom = document.getElementById('rankingChart');
            const myChart = echarts.init(chartDom);
            
            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    backgroundColor: 'rgba(0, 20, 40, 0.9)',
                    borderColor: '#00d4ff',
                    textStyle: {
                        color: '#ffffff'
                    }
                },
                grid: {
                    left: '20%',
                    right: '15%',
                    bottom: '5%',
                    top: '5%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'category',
                    data: ['黑龙江省', '浙江省', '云南省', '河南省', '河北省'],
                    inverse: true,
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        color: '#00d4ff',
                        fontSize: 10
                    },
                    axisTick: {
                        show: false
                    }
                },
                series: [
                    {
                        name: '主体数量',
                        type: 'bar',
                        data: [2241, 3500, 1648, 1553, 1500],
                        barWidth: '40%',
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                                { offset: 0, color: '#ffcc00' },
                                { offset: 1, color: '#ff9900' }
                            ]),
                            borderRadius: [0, 4, 4, 0]
                        }
                    }
                ]
            };
            
            myChart.setOption(option);
            
            window.addEventListener('resize', () => {
                myChart.resize();
            });
        };
        
        return {
            activeTab,
            handleTabClick
        };
    }
};
</script>

<style lang="less">
.data-analysis-container {
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, #0a1428 0%, #051020 100%);
    color: #00d4ff;
    font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
    position: relative;
    overflow: hidden;
    overflow: auto  ;
    .top-nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 30px;
        background: linear-gradient(180deg, rgba(0, 50, 100, 0.3) 0%, rgba(0, 30, 60, 0.5) 100%);
        border-bottom: 2px solid #00d4ff;
        position: relative;
        
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="%2300d4ff" stop-opacity="0.1"/><stop offset="1" stop-color="%2300d4ff" stop-opacity="0"/></linearGradient></defs><path d="M0 0 L30 0 L30 2 L2 2 L2 100 L0 100 Z" fill="url(%23g)"/><path d="M70 0 L100 0 L100 100 L98 100 L98 2 L70 2 Z" fill="url(%23g)"/></svg>') left top no-repeat,
                        url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="%2300d4ff" stop-opacity="0.1"/><stop offset="1" stop-color="%2300d4ff" stop-opacity="0"/></linearGradient></defs><path d="M0 0 L30 0 L30 2 L2 2 L2 100 L0 100 Z" fill="url(%23g)"/><path d="M70 0 L100 0 L100 100 L98 100 L98 2 L70 2 Z" fill="url(%23g)"/></svg>') right top no-repeat;
            background-size: 200px 100%, 200px 100%;
            pointer-events: none;
        }
        
        .logo {
            display: flex;
            align-items: center;
            position: relative;
            z-index: 1;
            
            .logo-icon {
                width: 60px;
                height: 40px;
                background: linear-gradient(135deg, #00d4ff 0%, #0066cc 100%);
                clip-path: polygon(0 0, 70% 0, 100% 50%, 70% 100%, 0 100%, 30% 50%);
                margin-right: 15px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .logo-text {
                font-size: 20px;
                font-weight: bold;
                color: #ffffff;
                text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
                margin-right: 10px;
            }
            
            .logo-subtitle {
                font-size: 16px;
                color: #00d4ff;
                background: rgba(0, 212, 255, 0.1);
                padding: 3px 12px;
                border: 1px solid #00d4ff;
                border-radius: 2px;
            }
        }
        
        .nav-tabs {
            display: flex;
            gap: 5px;
            position: relative;
            z-index: 1;
            
            .nav-item {
                padding: 8px 25px;
                cursor: pointer;
                transition: all 0.3s ease;
                color: #00d4ff;
                font-size: 14px;
                border: 1px solid transparent;
                position: relative;
                
                &:hover {
                    color: #ffffff;
                    background: rgba(0, 212, 255, 0.1);
                }
                
                &.active {
                    color: #ffffff;
                    background: linear-gradient(180deg, rgba(0, 212, 255, 0.2) 0%, rgba(0, 100, 150, 0.1) 100%);
                    border: 1px solid #00d4ff;
                    border-bottom: 3px solid #00d4ff;
                }
            }
        }
        
        .nav-right {
            display: flex;
            gap: 20px;
            position: relative;
            z-index: 1;
            
            .nav-item {
                padding: 8px 16px;
                cursor: pointer;
                transition: all 0.3s ease;
                color: #00d4ff;
                font-size: 14px;
                
                &:hover {
                    color: #ffffff;
                }
            }
            
            .user-info {
                padding: 8px 16px;
                cursor: pointer;
                color: #ffffff;
                font-size: 14px;
                background: rgba(0, 212, 255, 0.1);
                border: 1px solid #00d4ff;
                border-radius: 2px;
            }
        }
    }
    
    .main-content {
        display: flex;
        padding: 15px 20px;
        // height: calc(100% - 60px);
        gap: 20px;
        position: relative;
        z-index: 1;
        
        .left-section,
        .right-section {
            width: 23%;
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .center-section {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .card {
            background: linear-gradient(180deg, rgba(0, 30, 60, 0.8) 0%, rgba(0, 15, 30, 0.9) 100%);
            border: 1px solid rgba(0, 212, 255, 0.3);
            border-radius: 4px;
            padding: 12px 15px;
            position: relative;
            overflow: hidden;
            
            &::before,
            &::after {
                content: '';
                position: absolute;
                width: 10px;
                height: 10px;
                border: 2px solid #00d4ff;
            }
            
            &::before {
                top: -1px;
                left: -1px;
                border-right: none;
                border-bottom: none;
            }
            
            &::after {
                bottom: -1px;
                right: -1px;
                border-left: none;
                border-top: none;
            }
            
            .card-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
                position: relative;
                
                .header-decoration {
                    width: 30px;
                    height: 2px;
                    background: linear-gradient(90deg, transparent 0%, #00d4ff 100%);
                    
                    &.right {
                        background: linear-gradient(90deg, #00d4ff 0%, transparent 100%);
                    }
                }
                
                h3 {
                    font-size: 16px;
                    font-weight: 600;
                    margin: 0;
                    color: #00d4ff;
                    text-shadow: 0 0 5px rgba(0, 212, 255, 0.3);
                }
                
                .more {
                    font-size: 12px;
                    color: #00d4ff;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    
                    &:hover {
                        color: #ffffff;
                    }
                }
            }
            
            .card-body {
                .data-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 15px;
                    
                    .data-icon {
                        width: 45px;
                        height: 45px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-right: 15px;
                        position: relative;
                        
                        &.blue {
                            background: radial-gradient(circle, rgba(0, 100, 200, 0.3) 0%, rgba(0, 50, 100, 0.1) 100%);
                            border: 2px solid rgba(0, 150, 255, 0.5);
                        }
                        
                        &.green {
                            background: radial-gradient(circle, rgba(0, 200, 100, 0.3) 0%, rgba(0, 100, 50, 0.1) 100%);
                            border: 2px solid rgba(0, 255, 150, 0.5);
                        }
                        
                        &.purple {
                            background: radial-gradient(circle, rgba(150, 100, 200, 0.3) 0%, rgba(75, 50, 100, 0.1) 100%);
                            border: 2px solid rgba(200, 150, 255, 0.5);
                        }
                        
                        &.yellow {
                            background: radial-gradient(circle, rgba(200, 150, 0, 0.3) 0%, rgba(100, 75, 0, 0.1) 100%);
                            border: 2px solid rgba(255, 200, 0, 0.5);
                        }
                        
                        &.cyan {
                            background: radial-gradient(circle, rgba(0, 200, 200, 0.3) 0%, rgba(0, 100, 100, 0.1) 100%);
                            border: 2px solid rgba(0, 255, 255, 0.5);
                        }
                        
                        &.orange {
                            background: radial-gradient(circle, rgba(255, 100, 0, 0.3) 0%, rgba(125, 50, 0, 0.1) 100%);
                            border: 2px solid rgba(255, 150, 0, 0.5);
                        }
                    }
                    
                    .data-info {
                        flex: 1;
                        
                        .data-value {
                            font-size: 20px;
                            font-weight: 700;
                            color: #ffffff;
                            text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
                        }
                        
                        .data-label {
                            font-size: 12px;
                            color: #00d4ff;
                            margin-top: 2px;
                        }
                        
                        .data-change {
                            font-size: 11px;
                            color: #00d4ff;
                            margin-top: 4px;
                            opacity: 0.8;
                        }
                    }
                }
                
                .product-summary {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 15px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid rgba(0, 212, 255, 0.2);
                    
                    .product-item {
                        text-align: center;
                        
                        .product-value {
                            font-size: 15px;
                            font-weight: 700;
                            color: #ffffff;
                        }
                        
                        .product-label {
                            font-size: 11px;
                            color: #00d4ff;
                            margin-top: 3px;
                        }
                    }
                }
                
                .chart-title {
                    font-size: 12px;
                    color: #00d4ff;
                    margin-bottom: 10px;
                    text-align: center;
                }
                
                .area-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 15px;
                    
                    .area-icon {
                        width: 35px;
                        height: 35px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-right: 12px;
                        position: relative;
                        
                        &.blue {
                            background: radial-gradient(circle, rgba(0, 100, 200, 0.3) 0%, rgba(0, 50, 100, 0.1) 100%);
                            border: 2px solid rgba(0, 150, 255, 0.5);
                        }
                        
                        &.orange {
                            background: radial-gradient(circle, rgba(255, 100, 0, 0.3) 0%, rgba(125, 50, 0, 0.1) 100%);
                            border: 2px solid rgba(255, 150, 0, 0.5);
                        }
                        
                        &.green {
                            background: radial-gradient(circle, rgba(0, 200, 100, 0.3) 0%, rgba(0, 100, 50, 0.1) 100%);
                            border: 2px solid rgba(0, 255, 150, 0.5);
                        }
                        
                        &.cyan {
                            background: radial-gradient(circle, rgba(0, 200, 200, 0.3) 0%, rgba(0, 100, 100, 0.1) 100%);
                            border: 2px solid rgba(0, 255, 255, 0.5);
                        }
                    }
                    
                    .area-info {
                        .area-value {
                            font-size: 16px;
                            font-weight: 700;
                            color: #ffffff;
                        }
                        
                        .area-label {
                            font-size: 11px;
                            color: #00d4ff;
                            margin-top: 2px;
                        }
                    }
                }
                
                .task-stats {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 10px;
                    margin-bottom: 15px;
                    
                    .task-item {
                        background: rgba(0, 212, 255, 0.05);
                        padding: 8px 10px;
                        border-radius: 2px;
                        text-align: center;
                        border: 1px solid transparent;
                        
                        &.blue {
                            border-color: rgba(0, 150, 255, 0.3);
                        }
                        
                        &.orange {
                            border-color: rgba(255, 150, 0, 0.3);
                        }
                        
                        &.yellow {
                            border-color: rgba(255, 200, 0, 0.3);
                        }
                        
                        &.cyan {
                            border-color: rgba(0, 255, 255, 0.3);
                        }
                        
                        .task-label {
                            font-size: 11px;
                            color: #00d4ff;
                        }
                        
                        .task-value {
                            font-size: 14px;
                            font-weight: 600;
                            color: #ffffff;
                            margin-top: 3px;
                        }
                    }
                }
            }
            
            .chart-container {
                width: 100%;
                height: 180px;
                margin-top: 10px;
            }
            
            .gauge-container {
                width: 100%;
                height: 120px;
                margin-top: 10px;
            }
        }
        
        .entity-cards {
            display: flex;
            gap: 15px;
            background: transparent;
            
            .entity-card {
                flex: 1;
                text-align: center;
                background: linear-gradient(180deg, rgba(0, 30, 60, 0.8) 0%, rgba(0, 15, 30, 0.9) 100%);
                border: 2px solid;
                border-radius: 4px;
                padding: 15px 10px;
                position: relative;
                overflow: hidden;
                
                &::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    pointer-events: none;
                }
                
                &.gold {
                    border-color: #ffcc00;
                    box-shadow: 0 0 15px rgba(255, 200, 0, 0.3), inset 0 0 20px rgba(255, 200, 0, 0.1);
                    background: linear-gradient(180deg, rgba(100, 75, 0, 0.5) 0%, rgba(50, 37, 0, 0.7) 100%);
                }
                
                &.orange {
                    border-color: #ff9900;
                    box-shadow: 0 0 15px rgba(255, 150, 0, 0.3), inset 0 0 20px rgba(255, 150, 0, 0.1);
                    background: linear-gradient(180deg, rgba(100, 50, 0, 0.5) 0%, rgba(50, 25, 0, 0.7) 100%);
                }
                
                &.green {
                    border-color: #00ff66;
                    box-shadow: 0 0 15px rgba(0, 255, 100, 0.3), inset 0 0 20px rgba(0, 255, 100, 0.1);
                    background: linear-gradient(180deg, rgba(0, 100, 50, 0.5) 0%, rgba(0, 50, 25, 0.7) 100%);
                }
                
                &.blue {
                    border-color: #00ccff;
                    box-shadow: 0 0 15px rgba(0, 200, 255, 0.3), inset 0 0 20px rgba(0, 200, 255, 0.1);
                    background: linear-gradient(180deg, rgba(0, 75, 100, 0.5) 0%, rgba(0, 37, 50, 0.7) 100%);
                }
                
                .entity-icon {
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 10px;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                }
                
                .entity-value {
                    font-size: 20px;
                    font-weight: 700;
                    color: #ffffff;
                    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
                }
                
                .entity-label {
                    font-size: 12px;
                    color: #ffffff;
                    margin-top: 5px;
                    opacity: 0.9;
                }
            }
        }
        
        .industry-cards {
            display: flex;
            gap: 15px;
            background: transparent;
            
            .industry-card {
                flex: 1;
                text-align: center;
                background: linear-gradient(180deg, rgba(0, 30, 60, 0.8) 0%, rgba(0, 15, 30, 0.9) 100%);
                border: 1px solid rgba(0, 212, 255, 0.3);
                border-radius: 2px;
                padding: 10px;
                position: relative;
                
                &::before,
                &::after {
                    content: '';
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    border: 1px solid #00d4ff;
                }
                
                &::before {
                    top: -1px;
                    left: -1px;
                    border-right: none;
                    border-bottom: none;
                }
                
                &::after {
                    bottom: -1px;
                    right: -1px;
                    border-left: none;
                    border-top: none;
                }
                
                .industry-label {
                    font-size: 12px;
                    color: #00d4ff;
                }
                
                .industry-value {
                    font-size: 16px;
                    font-weight: 600;
                    color: #ffffff;
                    margin-top: 5px;
                }
            }
        }
        
        .map-container {
            flex: 1;
            background: linear-gradient(180deg, rgba(0, 30, 60, 0.8) 0%, rgba(0, 15, 30, 0.9) 100%);
            border: 1px solid rgba(0, 212, 255, 0.3);
            border-radius: 4px;
            padding: 15px;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            
            &::before,
            &::after {
                content: '';
                position: absolute;
                width: 15px;
                height: 15px;
                border: 2px solid #00d4ff;
            }
            
            &::before {
                top: -1px;
                left: -1px;
                border-right: none;
                border-bottom: none;
            }
            
            &::after {
                bottom: -1px;
                right: -1px;
                border-left: none;
                border-top: none;
            }
            
            .map-location {
                position: absolute;
                top: 15px;
                left: 20px;
                font-size: 12px;
                color: #00d4ff;
                z-index: 10;
            }
            
            .map {
                flex: 1;
                height: calc(100% - 20px);
                margin-top: 20px;
                position: relative;
                z-index: 1;
            }
            
            .map-decoration {
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                width: 60%;
                height: 80px;
                background: radial-gradient(ellipse at center, rgba(0, 212, 255, 0.15) 0%, transparent 70%);
                pointer-events: none;
                z-index: 0;
            }
            
            .map-info {
                position: absolute;
                top: 15px;
                right: 15px;
                width: 280px;
                background: rgba(0, 20, 40, 0.9);
                border: 1px solid rgba(0, 212, 255, 0.3);
                border-radius: 4px;
                padding: 12px;
                z-index: 10;
                
                .map-title {
                    font-size: 13px;
                    font-weight: 600;
                    color: #00d4ff;
                    margin-bottom: 12px;
                }
                
                .ranking-chart {
                    width: 100%;
                    height: 150px;
                    margin-bottom: 12px;
                }
                
                .map-stats {
                    .stat-title {
                        font-size: 11px;
                        color: #00d4ff;
                        margin-bottom: 10px;
                        padding: 8px;
                        background: rgba(0, 212, 255, 0.1);
                        border-left: 3px solid #00d4ff;
                    }
                }
                
                .trend-chart {
                    width: 100%;
                    height: 130px;
                }
            }
        }
    }
    
    @media screen and (min-width: 1366px) {
        .main-content {
            .left-section,
            .right-section {
                width: 23%;
            }
            
            .center-section {
                flex: 1;
            }
        }
    }
    
    @media screen and (min-width: 1440px) {
        .main-content {
            padding: 20px 25px;
            gap: 25px;
            
            .card {
                padding: 15px 20px;
            }
        }
    }
    
    @media screen and (min-width: 1920px) {
        .main-content {
            padding: 25px 30px;
            gap: 30px;
            
            .card {
                padding: 20px 25px;
            }
        }
    }
}
</style>
