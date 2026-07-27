import ajax from '@/utils/ajax';
import { DATA_ANALYSIS_API, USE_DATA_ANALYSIS_MOCK } from '@/config/dataAnalysis';

const MOCK_MAP_REGION_NAMES = [
    '北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江',
    '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南',
    '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州',
    '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '台湾',
    '香港', '澳门'
];

const mockDashboard = {
    subjects: {
        total: 627828,
        activeRate: 93,
        recentActive: 9384,
        industry: [
            { name: '种植业', value: 313914 },
            { name: '畜牧业', value: 125566 },
            { name: '渔业', value: 94174 },
            { name: '其他行业', value: 94174 }
        ],
        categories: [
            { name: '屠宰主体', value: 2835, activeRate: 90.9, color: '#28b8ff' },
            { name: '加工主体', value: 333921, activeRate: 92.9, color: '#f7ef3b' },
            { name: '储存主体', value: 1366, activeRate: 88.9, color: '#4adce6' },
            { name: '运输主体', value: 1571, activeRate: 97.9, color: '#21dbb0' }
        ]
    },
    traceability: {
        production: { label: '生产批次', value: 547249, lastYear: 2278, growth: 3 },
        transaction: { label: '交易批次', value: 547249, lastYear: 1250, growth: 3 },
        productionRank: [
            { name: '四川省', primary: 82662, secondary: 26620 },
            { name: '山东省', primary: 72822, secondary: 36480 },
            { name: '河北省', primary: 67829, secondary: 7829 }
        ],
        printed: { label: '打印追溯标识', value: 451571, lastYear: 2278, growth: 3 },
        printRank: [
            { name: '四川省', value: 82662 },
            { name: '山东省', value: 72822 },
            { name: '河北省', value: 67829 }
        ]
    },
    certifications: {
        total: 333921,
        activeRate: 97.9,
        industry: [
            { name: '绿色食品', value: 9608 },
            { name: '有机食品', value: 7787 },
            { name: '农产品地理', value: 9608 },
            { name: '良好农产品', value: 1152 },
            { name: '名特优新农产品', value: 878 }
        ]
    },
    farming: {
        total: 703676,
        categories: [
            { name: '种植业', value: 126000 },
            { name: '畜牧业', value: 103000 },
            { name: '渔业', value: 59000 }
        ],
        news: [
            { time: '4月17日9:00分', text: '南昌市嘉禾农业有限公司添加了一条记施肥记录' },
            { time: '4月17日8:54分', text: '南昌市嘉禾农业有限公司添加了一条播种(定植)记录' },
            { time: '4月17日8:50分', text: '天津嘉立荷牧业集团有限公司添加了一条养殖记录' },
            { time: '4月17日8:50分', text: '瑞林家庭农场添加了一条产蛋记录' },
            { time: '4月17日8:36分', text: '亨利渔业有限公司添加了一条投苗记录' }
        ]
    },
    products: {
        varieties: 4086,
        distribution: [
            { name: '种植业', value: 3012 },
            { name: '畜牧业', value: 789 },
            { name: '渔业', value: 875 }
        ],
        queries: 152266789,
        queryRank: [
            { name: '番茄', value: 910 },
            { name: '辣椒', value: 790 },
            { name: '黄瓜', value: 610 },
            { name: '生猪', value: 500 },
            { name: '鸡蛋', value: 390 }
        ]
    },
    map: {
        values: MOCK_MAP_REGION_NAMES.map(name => ({
            name,
            value: Math.floor(Math.random() * 300) + 50
        }))
    }
};

const waitForMock = (data) => new Promise(resolve => {
    window.setTimeout(() => resolve(data), 120);
});

export const getDataAnalysisDashboard = () => {
    if (USE_DATA_ANALYSIS_MOCK) return waitForMock(mockDashboard);
    return ajax.get({
        url: DATA_ANALYSIS_API.dashboard,
        data: {},
        loading: false,
        showMsg: false
    });
};

export const getDataAnalysisRegion = ({ adcode, level }) => {
    if (USE_DATA_ANALYSIS_MOCK) {
        return waitForMock({ adcode, level, values: [] });
    }
    return ajax.get({
        url: DATA_ANALYSIS_API.region,
        data: { adcode, level },
        loading: false,
        showMsg: false
    });
};
