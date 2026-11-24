import ajax from '@/utils/ajax';
import {
    MONITORING_DASHBOARD_API,
    USE_MONITORING_DASHBOARD_MOCK
} from '@/config/monitoringDashboard';
import { createRegionalMock, mockRegionMapValues } from './regionalMock';

const REGION_NAMES = [
    '北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江',
    '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南',
    '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州',
    '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '台湾',
    '香港', '澳门'
];

const mockDashboard = {
    taskGroups: [
        {
            name: '例行监测数量',
            value: 21384,
            unit: '次',
            color: '#32b9f5',
            levels: [
                { name: '省级数量', value: 16067 },
                { name: '市级数量', value: 1145 },
                { name: '县级数量', value: 4172 }
            ]
        },
        {
            name: '专项监测数量',
            value: 18398,
            unit: '次',
            color: '#25d5aa',
            levels: [
                { name: '省级数量', value: 10875 },
                { name: '市级数量', value: 5175 },
                { name: '县级数量', value: 2348 }
            ]
        },
        {
            name: '监督抽查数量',
            value: 30771,
            unit: '次',
            color: '#fff45e',
            levels: [
                { name: '省级数量', value: 18419 },
                { name: '市级数量', value: 10124 },
                { name: '县级数量', value: 2228 }
            ]
        }
    ],
    inspectionComparison: {
        metrics: [
            { name: '任务数量', value: 176, unit: '次', color: '#31bafa' },
            { name: '一般任务数量', value: 161, unit: '次', color: '#50e7de' },
            { name: '紧急任务数量', value: 9, unit: '次', color: '#16d064' },
            { name: '特紧任务数量', value: 3, unit: '次', color: '#ff9744' }
        ],
        categories: ['例行监测', '专项监测', '监督抽查', '复检任务'],
        series: [
            { name: '例行监测', color: '#35a8e8', values: [125, 195, 140, 335] },
            { name: '专项监测', color: '#28cdb3', values: [45, 70, 50, 82] },
            { name: '监督抽查', color: '#16bf52', values: [80, 125, 98, 75] },
            { name: '复检任务', color: '#ff9340', values: [70, 110, 82, 135] }
        ]
    },
    samplingStatistics: {
        traceable: 31092,
        untraceable: 9384,
        categories: [
            { name: '绿色', value: 9608, color: '#21d1ad' },
            { name: '有机', value: 7787, color: '#ff9747' },
            { name: '地标', value: 9608, color: '#35a8e8' },
            { name: '其他', value: 1152, color: '#fff45f' }
        ]
    },
    regionRanking: [
        { name: '云南省', tasks: 2000, passRate: 99 },
        { name: '新疆维吾尔自治区', tasks: 1800, passRate: 98 },
        { name: '四川省', tasks: 1743, passRate: 97 },
        { name: '河北省', tasks: 1649, passRate: 96 },
        { name: '甘肃省', tasks: 1500, passRate: 95 },
        { name: '海南省', tasks: 1278, passRate: 94 }
    ],
    map: {
        values: REGION_NAMES.map((name, index) => ({
            name,
            value: 80 + ((index * 53) % 360)
        }))
    }
};

const mockResponse = data => new Promise(resolve => {
    window.setTimeout(() => resolve(data), 120);
});

export const getMonitoringRegionalMock = region => {
    if (!USE_MONITORING_DASHBOARD_MOCK) return null;
    if (region.current.level === 'country') return mockDashboard;

    const { count, rate, values, rank } = createRegionalMock(region);
    const { taskGroups, inspectionComparison, samplingStatistics, regionRanking } = mockDashboard;
    return {
        ...mockDashboard,
        taskGroups: values(taskGroups).map(group => ({ ...group, levels: values(group.levels) })),
        inspectionComparison: {
            ...inspectionComparison,
            metrics: values(inspectionComparison.metrics),
            series: inspectionComparison.series.map((item, index) => ({
                ...item, values: item.values.map((value, position) => count(value, index + position))
            }))
        },
        samplingStatistics: {
            traceable: count(samplingStatistics.traceable),
            untraceable: count(samplingStatistics.untraceable, 1),
            categories: values(samplingStatistics.categories)
        },
        regionRanking: rank(regionRanking, (item, index) => ({
            ...item, tasks: count(item.tasks, index), passRate: rate(item.passRate, index)
        }), 'tasks')
    };
};

export const getMonitoringDashboard = () => {
    if (USE_MONITORING_DASHBOARD_MOCK) return mockResponse(mockDashboard);
    return ajax.get({
        url: MONITORING_DASHBOARD_API.dashboard,
        data: {},
        loading: false,
        showMsg: false
    });
};

export const getMonitoringRegion = ({ adcode, level, name, regionNames }) => {
    if (USE_MONITORING_DASHBOARD_MOCK) {
        return mockResponse({ adcode, level, name, values: mockRegionMapValues({ adcode, name, regionNames }) });
    }
    return ajax.get({
        url: MONITORING_DASHBOARD_API.region,
        data: { adcode, level, name },
        loading: false,
        showMsg: false
    });
};
