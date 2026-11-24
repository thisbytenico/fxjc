import ajax from '@/utils/ajax';
import { REGULATORY_API, USE_REGULATORY_MOCK } from '@/config/regulatory';
import { createRegionalMock, mockRegionMapValues } from './regionalMock';

const REGION_NAMES = [
    '北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江',
    '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南',
    '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州',
    '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '台湾',
    '香港', '澳门'
];

const mockDashboard = {
    overview: {
        metrics: { institutions: 1235, newInstitutions: 88, tasks: 888, basePatrols: 666 },
        taskBreakdown: [
            { name: '例行监测', value: 466201 },
            { name: '专项监测', value: 150874 },
            { name: '监督抽查', value: 36468 },
            { name: '复检任务', value: 5600 }
        ],
        regionTaskRank: [
            { name: '甘肃', value: 180000 },
            { name: '河北', value: 145000 },
            { name: '四川', value: 120000 },
            { name: '新疆', value: 72822 },
            { name: '云南', value: 67829 }
        ],
        basePatrolRank: [
            { name: '甘肃', value: 180000 },
            { name: '河北', value: 147000 },
            { name: '四川', value: 120000 },
            { name: '新疆', value: 70000 },
            { name: '云南', value: 65000 }
        ],
        taskComparisons: [
            {
                name: '例行监测',
                current: [100000, 62000],
                previous: [96000, 93000],
                regionTaskRank: [
                    { name: '甘肃', value: 112000 },
                    { name: '河北', value: 80000 },
                    { name: '四川', value: 78000 },
                    { name: '云南', value: 48000 },
                    { name: '新疆', value: 43000 }
                ]
            },
            {
                name: '专项监测',
                current: [51000, 37000],
                previous: [44000, 54000],
                regionTaskRank: [
                    { name: '甘肃', value: 54000 },
                    { name: '河北', value: 52000 },
                    { name: '四川', value: 28000 },
                    { name: '新疆', value: 22000 },
                    { name: '云南', value: 15000 }
                ]
            },
            {
                name: '监督抽查',
                current: [14000, 11000],
                previous: [15000, 14000],
                regionTaskRank: [
                    { name: '甘肃', value: 12000 },
                    { name: '河北', value: 11000 },
                    { name: '四川', value: 11000 },
                    { name: '新疆', value: 6822 },
                    { name: '云南', value: 3829 }
                ]
            },
            {
                name: '复检任务',
                current: [3000, 2000],
                previous: [3000, 3000],
                regionTaskRank: [
                    { name: '四川', value: 3000 },
                    { name: '甘肃', value: 2000 },
                    { name: '河北', value: 2000 },
                    { name: '新疆', value: 1000 },
                    { name: '云南', value: 1000 }
                ]
            }
        ]
    },
    subjectSummary: [
        { name: '例行监测', value: 6278, unit: '次', color: '#25baf3' },
        { name: '专项监测', value: 9384, unit: '次', color: '#30dec9' },
        { name: '监督抽查', value: 37, unit: '次', color: '#19d066' },
        { name: '复检任务', value: 8, unit: '次', color: '#ff9646' }
    ],
    taskComposition: [
        { name: '例行监测', values: [38000, 12000, 21000, 19000] },
        { name: '专项监测', values: [59000, 52000, 28000, 27000] },
        { name: '监督抽查', values: [42000, 15000, 27000, 21000] },
        { name: '复检任务', values: [76000, 65000, 48000, 36000] }
    ],
    regionTaskRank: [
        { name: '江苏省', value: 51820 },
        { name: '江西省', value: 85182 },
        { name: '四川省', value: 82662 },
        { name: '广东省', value: 72822 },
        { name: '河南省', value: 67829 }
    ],
    quarterlyComparison: {
        growth: 5,
        categories: ['第一季度', '第二季度'],
        current: [165000, 102000],
        previous: [142000, 151000]
    },
    annualComparison: {
        growth: 5,
        categories: ['第一季度', '第二季度'],
        current: [168000, 112000],
        previous: [158000, 164000]
    },
    basePassRate: [
        { name: '合格率', value: 35 },
        { name: '整改率', value: 25 },
        { name: '不合格率', value: 60 }
    ],
    newInstitutions: {
        total: 627828,
        levels: [
            { name: '部级', value: 188348 },
            { name: '省级', value: 157206 },
            { name: '区/县', value: 62534 },
            { name: '市级', value: 125566 },
            { name: '乡镇', value: 94174 }
        ]
    },
    institutionRank: [
        { name: '江苏省', value: 51820 },
        { name: '江西省', value: 85182 },
        { name: '四川省', value: 82662 },
        { name: '广东省', value: 72822 },
        { name: '河南省', value: 67829 }
    ],
    basePatrolRank: [
        { name: '江苏省', value: 51820 },
        { name: '江西省', value: 85182 },
        { name: '四川省', value: 82662 },
        { name: '广东省', value: 72822 },
        { name: '河南省', value: 67829 }
    ],
    map: {
        values: REGION_NAMES.map((name, index) => ({
            name,
            value: 80 + ((index * 47) % 260)
        }))
    }
};

const mockResponse = data => new Promise(resolve => {
    window.setTimeout(() => resolve(data), 120);
});

export const getRegulatoryRegionalMock = region => {
    if (!USE_REGULATORY_MOCK) return null;
    if (region.current.level === 'country') return mockDashboard;

    const { count, rate, values, rank } = createRegionalMock(region);
    const { overview, annualComparison, quarterlyComparison } = mockDashboard;
    const rankByRegion = items => rank(items, (item, index) => ({
        ...item, value: count(item.value, index)
    }));
    const comparison = item => ({
        ...item,
        current: item.current.map(count),
        previous: item.previous.map((value, index) => count(value, index + item.current.length))
    });
    return {
        ...mockDashboard,
        overview: {
            metrics: Object.fromEntries(Object.entries(overview.metrics).map(([key, value], index) => [key, count(value, index)])),
            taskBreakdown: values(overview.taskBreakdown),
            regionTaskRank: rankByRegion(overview.regionTaskRank),
            basePatrolRank: rankByRegion(overview.basePatrolRank),
            taskComparisons: overview.taskComparisons.map(task => ({
                ...comparison(task),
                regionTaskRank: rankByRegion(task.regionTaskRank)
            }))
        },
        annualComparison: { ...comparison(annualComparison), growth: rate(annualComparison.growth, 0, -100) },
        quarterlyComparison: { ...comparison(quarterlyComparison), growth: rate(quarterlyComparison.growth, 1, -100) }
    };
};

export const getRegulatoryDashboard = () => {
    if (USE_REGULATORY_MOCK) return mockResponse(mockDashboard);
    return ajax.get({
        url: REGULATORY_API.dashboard,
        data: {},
        loading: false,
        showMsg: false
    });
};

export const getRegulatoryRegion = ({ adcode, level, name, regionNames }) => {
    if (USE_REGULATORY_MOCK) {
        return mockResponse({ adcode, level, name, values: mockRegionMapValues({ adcode, name, regionNames }) });
    }
    return ajax.get({
        url: REGULATORY_API.region,
        data: { adcode, level, name },
        loading: false,
        showMsg: false
    });
};
