// Mock the entire dashboard, including subject and certification panels.
export const USE_DATA_ANALYSIS_MOCK = true;

// Mock only the subject and certification panels when dashboard mock mode is off.
export const USE_DATA_ANALYSIS_SUBJECT_MOCK = true;

// China map inset/nine-dash-line feature.
export const SHOW_CHINA_MAP_NINE_DASH_LINE = false;

export const DATA_ANALYSIS_API = {
    dashboard: '/api/data-analysis/dashboard',
    region: '/api/data-analysis/region',
    mainInfo: '/sys/analyze/mainInfo',
    mainIndustry: '/sys/analyze/mainIndustry',
    mainBusiness: '/sys/analyze/mainBusiness',
    certifications: '/sys/analyze/certMainInfo'
};
