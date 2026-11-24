import ajax from '@/utils/ajax';
import { ENFORCEMENT_API, USE_ENFORCEMENT_MOCK } from '@/config/enforcement';

const taskDate = '2026-04-17';
const taskNames = [
    '临安辣椒种植农场', '宜宾有家农场养殖农场', '绵阳种植专业合作社', '成安诚心小农场',
    '澄海福地养殖有限公司', '三力村农民合作社', '丰收渔业有限公司', '渔荷源渔业公司',
    '曲靖县郭靖家庭农场', '嘉玺水产养殖科技有限公司'
];
const taskRows = indexes => indexes.map(index => ({ id: index + 1, name: taskNames[index], date: taskDate }));

const provinceValues = {
    北京: 210, 天津: 215, 河北: 195, 山西: 255, 内蒙古: 321, 辽宁: 305, 吉林: 338, 黑龙江: 248,
    上海: 220, 江苏: 270, 浙江: 225, 安徽: 335, 福建: 331, 江西: 204, 山东: 36, 河南: 119,
    湖北: 235, 湖南: 82, 广东: 256, 广西: 354, 海南: 324, 重庆: 182, 四川: 350, 贵州: 257,
    云南: 253, 西藏: 251, 陕西: 160, 甘肃: 244, 青海: 355, 宁夏: 303, 新疆: 360, 台湾: 348,
    香港: 250, 澳门: 226
};

const mockDashboard = {
    patrolTrend: {
        total: 9092,
        months: ['2026-01', '2026-02', '2026-03', '2026-04'],
        points: [
            { date: '2026-01-01', value: 160 },
            { date: '2026-01-14', value: 264 },
            { date: '2026-01-27', value: 255 },
            { date: '2026-02-09', value: 207 },
            { date: '2026-02-22', value: 196 },
            { date: '2026-03-07', value: 263 },
            { date: '2026-03-20', value: 409 },
            { date: '2026-04-02', value: 474 },
            { date: '2026-04-15', value: 427 },
            { date: '2026-04-28', value: 211 }
        ]
    },
    comparison: {
        totals: { tasks: 6278, normal: 161, urgent: 37, critical: 8 },
        categories: ['例行监测', '专项监测', '监督抽查', '复检任务'],
        series: [
            { name: '例行监测', values: [138, 210, 155, 253] },
            { name: '专项监测', values: [44, 65, 50, 91] },
            { name: '例行监测（第二组）', legendLabel: '例行监测', values: [81, 124, 93, 151] },
            { name: '专项监测（第二组）', legendLabel: '专项监测', values: [68, 105, 78, 127] }
        ]
    },
    monitoringSummary: [
        { id: 'routine', label: '例行监测数量', total: 6828, province: 16067, city: 1145, county: 23416 },
        { id: 'special', label: '专项监测数量', total: 7174, province: 16067, city: 1145, county: 1145 },
        { id: 'special-secondary', label: '专项监测数量', total: 7174, province: 16067, city: 1145, county: 1145 }
    ],
    inspectionTasks: taskRows([0, 1, 2, 3, 4, 5, 6, 7]),
    rankedTasks: taskRows([4, 5, 6, 7, 8, 9, 0, 1]),
    map: { values: Object.entries(provinceValues).map(([name, value]) => ({ name, value })) }
};

// 真实接口返回与模拟数据相同的结构，兼容项目的 { code, data } 包装。
const request = async (url, data) => {
    const response = await ajax.get({ url, data, loading: false, showMsg: false });
    return response?.data ?? response;
};

export const getEnforcementDashboard = () => USE_ENFORCEMENT_MOCK
    ? Promise.resolve(mockDashboard)
    : request(ENFORCEMENT_API.dashboard, {});

export const getEnforcementRegion = ({ adcode, level, name, regionNames = [] }) => {
    if (!USE_ENFORCEMENT_MOCK) return request(ENFORCEMENT_API.region, { adcode, level, name });

    const values = regionNames.map((regionName, index) => ({
        name: regionName,
        value: 18 + (Number(adcode.slice(0, 4)) + index * 47) % 240
    }));
    return Promise.resolve({ values });
};
