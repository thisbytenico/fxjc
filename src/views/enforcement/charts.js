import { graphic } from 'echarts';

const axisLine = { color: 'rgba(135, 155, 177, .44)' };
const categoryLabel = { color: '#f5f8fc', fontSize: 16, interval: 0, margin: 12 };
const tooltip = {
    trigger: 'axis',
    confine: true,
    backgroundColor: 'rgba(9, 24, 41, .96)',
    borderColor: '#247ba4',
    textStyle: { color: '#f5f8fc', fontSize: 12 }
};

const categoryAxis = data => ({
    type: 'category',
    data,
    axisLabel: categoryLabel,
    axisLine: { lineStyle: axisLine },
    axisTick: { show: false }
});

const valueAxis = showGrid => ({
    type: 'value',
    min: 0,
    interval: 100,
    axisLabel: { color: '#788696', fontSize: 11, margin: 12 },
    axisLine: { show: true, lineStyle: axisLine },
    axisTick: { show: false },
    splitLine: { show: showGrid, lineStyle: { color: 'rgba(135, 155, 177, .24)' } }
});

const compactAxisLabels = {
    xAxis: [{ axisLabel: { fontSize: 12, margin: 8 } }],
    yAxis: { axisLabel: { fontSize: 10, margin: 7 } }
};

export const patrolTrendOption = ({ months, points }, regional = false) => ({
    baseOption: {
        tooltip,
        grid: { left: '12.5%', right: '10.2%', top: '10%', bottom: '17.5%' },
        xAxis: [
            categoryAxis(months),
            { type: 'category', show: false, boundaryGap: false, data: points.map(point => point.date) }
        ],
        yAxis: {
            ...valueAxis(true),
            interval: regional ? null : 100,
            max: regional ? null : ({ max }) => Math.max(600, Math.ceil(max / 100) * 100)
        },
        series: [{
            name: '执法次数',
            type: 'line',
            xAxisIndex: 1,
            smooth: true,
            showSymbol: false,
            lineStyle: { color: '#00b6f0', width: 2 },
            itemStyle: { color: '#00b6f0' },
            areaStyle: {
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(0, 165, 224, .34)' },
                    { offset: .84, color: 'rgba(0, 127, 182, 0)' }
                ])
            },
            data: points.map(point => point.value)
        }]
    },
    media: [
        { query: { maxWidth: 375 }, option: compactAxisLabels },
        { option: { xAxis: [{ axisLabel: categoryLabel }], yAxis: { axisLabel: { fontSize: 11, margin: 12 } } } }
    ]
});

export const supervisionOption = statuses => ({
    tooltip: { ...tooltip, trigger: 'item', formatter: '{b}：{c}' },
    series: [{
        type: 'pie',
        // Match the center of the dial artwork (97.5, 94) in the 189 × 184 image.
        center: ['51.6%', '51.1%'],
        radius: ['63%', '78%'],
        startAngle: 90,
        padAngle: 2,
        label: { show: false },
        labelLine: { show: false },
        stillShowZeroSum: false,
        emptyCircleStyle: { color: '#25465e' },
        data: statuses.filter(item => item.value != null).map(item => ({
            id: item.key,
            name: item.name,
            value: item.value,
            itemStyle: { color: item.color }
        }))
    }]
});
