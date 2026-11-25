import ajax from '@/utils/ajax';
import { ENFORCEMENT_API, USE_ENFORCEMENT_MOCK } from '@/config/enforcement';
import { createRegionalMock, mockRegionMapValues } from './regionalMock';

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
        total: 9921,
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
    supervision: {
        total: 9888,
        statuses: { completed: 4485, incomplete: 8588, running: 364, revoked: 1508, published: 4662 }
    },
    monitoringSummary: [
        { id: 'routine', label: '执法机构', total: 4245, province: 1067, city: 2004, county: 1174 },
        { id: 'special', label: '执法人员', total: 7245, province: 4039, city: 1067, county: 2139 },
        { id: 'special-secondary', label: '执法任务', total: 34245, province: 18817, city: 8076, county: 7352 }
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

export const getEnforcementRegionalMock = region => {
    if (!USE_ENFORCEMENT_MOCK) return null;
    if (region.current.level === 'country') return mockDashboard;

    const { count, values, seed } = createRegionalMock(region);
    const { patrolTrend, supervision, monitoringSummary, inspectionTasks, rankedTasks } = mockDashboard;
    const taskTypes = ['种植基地', '养殖基地', '家庭农场', '农民合作社'];
    const regionalTasks = (tasks, action) => tasks.map((task, index) => ({
        ...task,
        name: `${region.current.name}${taskTypes[(seed + index) % taskTypes.length]}${index + 1}号${action}`,
        date: `2026-04-${String(17 - (seed + index) % 12).padStart(2, '0')}`
    }));
    return {
        ...mockDashboard,
        patrolTrend: { ...patrolTrend, total: count(patrolTrend.total), points: values(patrolTrend.points) },
        supervision: {
            total: count(supervision.total),
            statuses: Object.fromEntries(Object.entries(supervision.statuses).map(([key, value], index) => [key, count(value, index)]))
        },
        monitoringSummary: monitoringSummary.map((item, index) => ({
            ...item,
            total: count(item.total, index),
            province: count(item.province, index),
            city: count(item.city, index + 1),
            county: count(item.county, index + 2)
        })),
        inspectionTasks: regionalTasks(inspectionTasks, '巡查'),
        rankedTasks: regionalTasks(rankedTasks, '行政处罚')
    };
};

export const getEnforcementDashboard = () => USE_ENFORCEMENT_MOCK
    ? Promise.resolve(mockDashboard)
    : request(ENFORCEMENT_API.dashboard, {});

export const getEnforcementRegion = ({ adcode, level, name, regionNames }) => {
    if (!USE_ENFORCEMENT_MOCK) return request(ENFORCEMENT_API.region, { adcode, level, name });

    return Promise.resolve({ values: mockRegionMapValues({ adcode, name, regionNames }) });
};
