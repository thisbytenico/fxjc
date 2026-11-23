import ajax, { http } from '@/utils/ajax';
import { DATA_ANALYSIS_API, USE_DATA_ANALYSIS_MOCK } from '@/config/dataAnalysis';

const MOCK_MAP_REGION_NAMES = [
    '北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江',
    '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南',
    '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州',
    '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '台湾',
    '香港', '澳门'
];

const ANALYSIS_REGION_PARAMS = {
    province: 'provinceCode',
    city: 'cityCode',
    district: 'countyCode'
};

const mockDashboard = {
    traceability: {
        production: { label: '生产批次', value: 547249, lastYear: 2278, growth: 3 },
        transaction: { label: '交易批次', value: 547249, lastYear: 1250, growth: 3 },
        productionRank: [
            { name: '四川省', primary:26620, secondary: 82662 },
            { name: '山东省', primary: 36480, secondary: 72822 },
            { name: '河北省', primary: 27829 , secondary: 67829 }
        ],
        printed: { label: '打印追溯标识', value: 451571, lastYear: 2278, growth: 3 },
        printRank: [
            { name: '四川省', value: 82662 },
            { name: '山东省', value: 72822 },
            { name: '河北省', value: 67829 }
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

const getRegionalAnalysis = async (url, routes, errorMessage) => {
    const params = {};
    for (const { level, adcode } of routes) {
        const param = ANALYSIS_REGION_PARAMS[level];
        if (param && adcode) params[param] = String(adcode);
    }

    const response = await http.get(url, { params });
    const data = response?.data;
    if (Number(response?.code) !== 200 || !data || typeof data !== 'object') {
        throw new Error(response?.msg || errorMessage);
    }
    return data;
};

const toPercent = ratio => ratio == null ? null : Number(ratio) * 100;

export const getDataAnalysisSubjectInfo = async (routes) => {
    const data = await getRegionalAnalysis(DATA_ANALYSIS_API.mainInfo, routes, '主体概况加载失败');
    return {
        total: Number(data.all ?? 0),
        recentActive: Number(data.week ?? 0),
        activeRate: toPercent(data.active)
    };
};

export const getDataAnalysisSubjectIndustry = async (routes) => {
    const data = await getRegionalAnalysis(DATA_ANALYSIS_API.mainIndustry, routes, '主体行业数据加载失败');
    return [
        { name: '种植业', value: Number(data.planting ?? 0) },
        { name: '畜牧业', value: Number(data.husbandry ?? 0) },
        { name: '渔业', value: Number(data.fishery ?? 0) }
    ];
};

export const getDataAnalysisSubjectBusiness = async (routes) => {
    const data = await getRegionalAnalysis(DATA_ANALYSIS_API.mainBusiness, routes, '主体业务数据加载失败');
    return [
        { name: '屠宰主体', value: Number(data.activeSlaughter ?? 0), activeRate: toPercent(data.activeSlaughterRatio), color: '#28b8ff' },
        { name: '加工主体', value: Number(data.activeProcess ?? 0), activeRate: toPercent(data.activeProcessRatio), color: '#f7ef3b' },
        { name: '储存主体', value: Number(data.activeStorage ?? 0), activeRate: toPercent(data.activeStorageRatio), color: '#4adce6' },
        { name: '运输主体', value: Number(data.activeTransport ?? 0), activeRate: toPercent(data.activeTransportRatio), color: '#21dbb0' }
    ];
};

export const getDataAnalysisCertifications = async (routes) => {
    const data = await getRegionalAnalysis(DATA_ANALYSIS_API.certifications, routes, '认证主体数据加载失败');
    return {
        total: Number(data.allCertMain ?? 0),
        activeRate: Number((Number(data.activeCert ?? 0) * 100).toFixed(2)),
        industry: [
            { name: '绿色食品', value: Number(data.nssp ?? 0) },
            { name: '有机食品', value: Number(data.yjsp ?? 0) },
            { name: '农产品地理', value: Number(data.ncpdlbs ?? 0) },
            { name: '良好农业', value: Number(data.lhnygf ?? 0) },
            { name: '名特优新', value: Number(data.mytxncp ?? 0) }
        ]
    };
};
