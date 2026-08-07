import ajax from '@/utils/ajax';
import { REGULATORY_API, USE_REGULATORY_MOCK } from '@/config/regulatory';

const REGION_NAMES = [
    '北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江',
    '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南',
    '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州',
    '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '台湾',
    '香港', '澳门'
];

const mockDashboard = {
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

export const getRegulatoryDashboard = () => {
    if (USE_REGULATORY_MOCK) return mockResponse(mockDashboard);
    return ajax.get({
        url: REGULATORY_API.dashboard,
        data: {},
        loading: false,
        showMsg: false
    });
};

export const getRegulatoryRegion = ({ adcode, level, name }) => {
    if (USE_REGULATORY_MOCK) {
        return mockResponse({ adcode, level, name, values: [] });
    }
    return ajax.get({
        url: REGULATORY_API.region,
        data: { adcode, level, name },
        loading: false,
        showMsg: false
    });
};
